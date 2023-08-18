'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Hls from 'hls.js';
import Link from 'next/link';
import { outIcon, PlayIcon } from '@/components/svgs/Svgs';
import { Avatar, Badge, Loading, Button, Text } from '@nextui-org/react';
import {
  BottomWrap,
  ReadyWrap,
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
import { dateFormat, timeFormat } from '@/components/utils/dateUtils';

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
  startDate: Date;
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

  const [plaing, setPlaying] = useState<boolean>(true);
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
      if (!fetchData) router.back();
      setBroadcast(fetchData.data);
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

      socket.on('broadcastStart', () => {
        router.reload();
      });

      socket.on('broadcastFinish', () => {
        router.push('/broadcast/finish');
      })

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
      if (!testUrl(broadcast.streamUrl)) return;

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

      setPlaying(false);
    }
  }

  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      sendMessage();
    }
  }

  const testUrl = async (streamUrl: string) => {
    try {
      const response = await fetch(streamUrl);
      if (response.status === 404) throw new Error('404');
      return true;
    } catch (e) {
      alert('해당 방송이 스트림중이 아닙니다.');
      return false;
    }
  }

  const exit = () => {
    if (socket) {
      socket.disconnect();
    }
    router.push('/home');
  }

  return (
    <BroadcastWrap>
      { broadcast ? <>
        <HeaderWrap>
          <Header>
            <h3>{broadcast.title}</h3>
            <div onClick={exit}>{outIcon({width: 35, height: 35})}</div>
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
        { plaing && broadcast.state === BroadcastState.BROADCASTING &&
          <ButtonWrap>
            <Avatar onClick={play} size="xl" color="gradient" icon={<PlayIcon />} />
          </ButtonWrap>
        }
        { broadcast.state === BroadcastState.READY &&
          <ReadyWrap>
            <Text h4>방송 시작 전입니다.</Text>
            <Text h5>{dateFormat(broadcast.startDate)}</Text>
            <Text h1>{timeFormat(broadcast.startDate)}</Text>
          </ReadyWrap>
        }
        <VideoWrap>
          <video ref={videoRef} controls={false} autoPlay={true} muted={true} poster={broadcast.thumbnailImageUrl}>
            <source src={broadcast.streamUrl} type="application/x-mpegURL"/>
            <script src={broadcast.streamUrl} async/>
          </video>
        </VideoWrap>
        <BottomWrap>
          <ChatInputWrap>
            <Input placeholder="채팅을 입력해보세요!" value={message} onChange={onMessage} onKeyDown={onCheckEnter} />
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
      </>
      : <Loading type="points" color="currentColor" size="lg"/> }
      </BroadcastWrap>
    );
}
