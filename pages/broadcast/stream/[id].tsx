'use client'

import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor';
import { Badge, Button, Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { broadcastFinishActions, broadcastStartActions, getRestActions, RequestUrl } from '@/api/myActions';
import {
  BottomStreamWrap,
  BroadcastWrap,
  Chat,
  ChatWrap,
  Header,
  HeaderWrap,
  LiveBadge,
  LiveBadgeWrap, VideoWrap, Input,
  ViewerCount,
  ChatInputWrap
} from '@/components/broadcast/styleComponents';
import io, { Socket } from "socket.io-client";

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

export default function BroadcastStream() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [broadcast, setBroadcast] = useState<Broadcast>();
  const [user, setUser] = useState<User>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [message, setMessage] = useState<string>('');
  const onMessage = (e) => setMessage(e.currentTarget.value);

  const [streamVideo, setStreamVideo] = useState<WebRTCAdaptor>(null!);
  const [broadcastStatus, setBroadcastStatus] = useState<BroadcastState>(BroadcastState.READY);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id;

    async function fetchBroadcastData() {
      const fetchData = await getRestActions(RequestUrl.BROADCASTS, id);
      setBroadcast(fetchData.data);
      return fetchData.data;
    }

    async function fetchUserData() {
      const fetchData = await getRestActions(RequestUrl.USERS, null);
      setUser(fetchData.data);
      return fetchData.data;
    }

    fetchUserData();
    fetchBroadcastData()
      .then((data) => {
        const webRTCAdaptor = new WebRTCAdaptor({
          websocket_url: process.env.NEXT_PUBLIC_SOCKET_URL,
          mediaConstraints: {
            video: true,
            audio: true,
          },
          peerconnection_config: {
            'iceServers': [{'urls': 'stun:stun1.l.google.com:19302'}]
          },
          sdp_constraints: {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: false,
          },
          localVideoId: data.streamKey,
          bandwidth: 600,
          dataChannelEnabled: true,
          callback: (info, obj) => {},
          callbackError: function (error, message) {},
        });
        setStreamVideo(webRTCAdaptor);
        setBroadcastStatus(data.state);
      });

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(error => console.log(error));
    }
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

      socket.on('sendMessage', (data: ChatList) => {
        setChatList(prevList => [...prevList, data]);
        setMessage('');
      });

      socket.on('disconnect', () => {
        setSocket(null);
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

  const sendMessage = () => {
    if (socket && user && broadcast) {
      if (!message) {
        alert('메세지를 입력해주세요.');
        return;
      }

      const request: ChatList = {
        streamKey: broadcast?.streamKey,
        userId: user?.userId,
        name: user?.name,
        message: message,
      }
      socket.emit('sendMessage', request);
    }
  }

  const start = async () => {
    if (streamVideo && broadcast) {
      streamVideo.publish(broadcast.streamKey);
      setBroadcastStatus(BroadcastState.BROADCASTING);
      await broadcastStartActions(broadcast.streamKey);
    }
  };

  const finish = async () => {
    if (broadcast) {
      streamVideo.stop(broadcast.streamKey);
      setBroadcastStatus(BroadcastState.FINISHED);
      await broadcastFinishActions(broadcast.streamKey);
    }
  }

  return (
    broadcast ?
      <BroadcastWrap>
        <HeaderWrap>
          <Header>
            <h3>{broadcast.title}</h3>
            { broadcastStatus === BroadcastState.READY &&
              <Button auto onPress={start} color="error" size="sm">방송 시작</Button> }
            { broadcastStatus === BroadcastState.BROADCASTING &&
              <Button auto onPress={finish} color="error" size="sm">방송 종료</Button> }
          </Header>
          <LiveBadgeWrap>
            <span>{broadcast.streamer}</span>
            { broadcastStatus === BroadcastState.READY && <>
              <Badge enableShadow disableOutline>Ready</Badge>
            </> }
            { broadcastStatus === BroadcastState.BROADCASTING && <LiveBadge>
              <Badge enableShadow disableOutline color="error">Live</Badge>
              <ViewerCount>13,622</ViewerCount>
            </LiveBadge> }
          </LiveBadgeWrap>
        </HeaderWrap>
        <VideoWrap>
          <video ref={videoRef} id={broadcast.streamKey} autoPlay poster={broadcast.thumbnailImageUrl}></video>
        </VideoWrap>
        <BottomStreamWrap>
          <ChatInputWrap>
            <Input placeholder="채팅을 입력해보세요!" value={message} onChange={onMessage} />
            <Button auto color="gradient" onPress={sendMessage}>전송</Button>
          </ChatInputWrap>
          <ChatWrap>
            {chatList.map((chat, index) => {
              const { name, message } = chat;
              return (
                <Chat key={index}>
                  <h6>{name}</h6>{message}
                </Chat>
              )
            })}
          </ChatWrap>
        </BottomStreamWrap>
      </BroadcastWrap>
      : <Loading type="points" color="currentColor" size="lg"/>
  );
}
