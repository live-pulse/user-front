'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Hls from 'hls.js';
import Link from 'next/link';
import { outIcon, PlayIcon } from '@/components/svgs/Svgs';
import { Avatar, Badge, Loading, Button } from '@nextui-org/react';
import {
  BottomWrap,
  BroadcastWrap,
  ChatInputWrap,
  ChatWrap,
  Header,
  HeaderWrap,
  LiveBadge,
  LiveBadgeWrap,
  ViewerCount,
  ButtonWrap, VideoWrap, Chat, Input,
} from '@/components/broadcast/styleComponents';
import { getRestActions, RequestUrl } from '@/api/myActions';
import io, { Socket } from 'socket.io-client';
import { getCookie } from 'cookies-next';

enum BroadcastState {
  READY = 'READY',
  BROADCASTING = 'BROADCASTING',
  FINISHED = 'FINISHED',
}

interface Broadcast {
  id: number;
  src: string;
  avaterImg: string;
  title: string;
  description: string;
  tags: string[];
  streamer: string;
  streamUrl: string;
  streamKey: string;
  thumbnailImageUrl: string;
  state: BroadcastState;
}

interface User {
  userId: string;
  name: string;
}

interface ChatList {
  streamKey: string;
  userId: string;
  name: string;
  message: string;
}

export default function BroadcastInfo() {
  const router = useRouter();

  const [hls, setHls] = useState<Hls | null>(null);
  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [message, setMessage] = useState<string>('');
  const onMessage = (e) => setMessage(e.currentTarget.value);

  const videoRef = useRef<HTMLVideoElement>(null!!);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id;

    const auth = getCookie('auth');
    if (!auth) {
      alert('로그인이 필요합니다.');
      router.push('/users');
      return;
    }

    async function fetchBroadcastData() {
      const fetchData = await getRestActions(RequestUrl.BROADCASTS, id);
      if (!fetchData) router.push('/home');
      setBroadcast(fetchData?.data);
      return fetchData.data;
    }

    async function fetchUserData() {
      const fetchData = await getRestActions(RequestUrl.USERS, null);
      setUser(fetchData.data);
      return fetchData.data;
    }

    fetchBroadcastData();
    fetchUserData();
  }, [router.isReady]);

  useEffect(() => {
    if (broadcast && user && !socket) {
      const url: string = `${process.env.NEXT_PUBLIC_SOCKET_CHAT_URL}?streamKey=${broadcast.streamKey}&user=${user.name}`;
      const initSocketObject = io(url, { transports: ['websocket'] });
      setSocket(initSocketObject);
    }
  }, [!socket && broadcast && user]);

  useEffect(() => {
    if (socket) {
      getLastChat();
      getViewerCount();

      socket.on('sendMessage', (data: ChatList) => {
        setChatList(prevList => [...prevList, data]);
      });

      socket.on('disconnect', () => {
        setSocket(null);
      });

      socket.on('connectViewer', () => {
        setViewerCount(prevCount => prevCount + 1);
      });

      socket.on('disconnectViewer', () => {
        setViewerCount(prevCount => prevCount - 1);
      });
    }
  }, [socket]);

  const getLastChat = () => {
    if (socket) {
      socket.emit('getLastChat');
      socket.on('getLastChat', (data: ChatList[]) => {
        setChatList(data);
      });
    }
  };

  const getViewerCount = () => {
    if (socket) {
      socket.emit('getViewerCount');
      socket.on('getViewerCount', (data: number) => {
        setViewerCount(data);
      });
    }
  }

  const sendMessage = () => {
    if (socket && user && broadcast) {
      if (!message) {
        alert('메세지를 입력해주세요.');
        return;
      }

      const request: ChatList = {
        streamKey: broadcast.streamKey,
        userId: user.userId,
        name: user.name,
        message: message,
      }
      socket.emit('sendMessage', request);
      setMessage('');
    }
  }

  const play = () => {
    if (broadcast) {
      if (broadcast.state !== BroadcastState.BROADCASTING) {
        alert('방송이 시작되지 않았습니다.');
        return;
      }

      const video: HTMLMediaElement = videoRef.current;

      if (video && Hls.isSupported()) {
        const hlsInstance = new Hls();
        hlsInstance.loadSource(broadcast.streamUrl);
        hlsInstance.attachMedia(video);
        setHls(hlsInstance);
      } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = broadcast.streamUrl;
      }

      if (hls) {
        hls.destroy();
      }
    }
  }

  return (
    broadcast ?
      <BroadcastWrap>
        <HeaderWrap>
          <Header>
            <h3>{broadcast.title}</h3>
            <Link href={'/home'}>{outIcon({width: 35, height: 35})}</Link>
          </Header>
          <LiveBadgeWrap>
            <span>{broadcast.streamer}</span>
            { broadcast.state === BroadcastState.READY && <>
              <Badge enableShadow disableOutline>Ready</Badge>
            </> }
              { broadcast.state === BroadcastState.BROADCASTING && <LiveBadge>
                  <Badge enableShadow disableOutline color="error">LIVE</Badge>
                  <ViewerCount>{viewerCount}</ViewerCount>
                </LiveBadge> }
          </LiveBadgeWrap>
        </HeaderWrap>
        { broadcast.state === BroadcastState.BROADCASTING &&
          <ButtonWrap>
            <Avatar onClick={play} size="xl" color="gradient" icon={<PlayIcon />} />
          </ButtonWrap>
        }
        <VideoWrap>
          <video ref={videoRef} controls={false} autoPlay={true} muted={true} poster={broadcast.thumbnailImageUrl}>
            <source src={broadcast.streamUrl} type="application/x-mpegURL"/>
            <script src={broadcast.streamUrl} async/>
          </video>
        </VideoWrap>
        <BottomWrap>
          <ChatInputWrap>
            <Input placeholder="채팅을 입력해보세요!" value={message} onChange={onMessage} />
            <Button auto color="gradient" onPress={sendMessage}>전송</Button>
          </ChatInputWrap>
          <ChatWrap>
            {chatList.map((chat: ChatList, index: number) => {
              const { name, message } = chat;
              return (
                <Chat key={index}>
                  <h6>{name}</h6>{message}
                </Chat>
              )
            })}
          </ChatWrap>
        </BottomWrap>
      </BroadcastWrap>
      : <Loading type="points" color="currentColor" size="lg"/>
  )
}
