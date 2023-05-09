'use client'

import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor';
import { Badge, Button, Input, Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { getRestActions, RequestUrl } from '@/api/myActions';
import {
  BottomWrap,
  BroadcastWrap,
  Chat,
  ChatWrap,
  Header,
  HeaderWrap,
  LiveBadge,
  LiveBadgeWrap, VideoWrap,
  ViewerCount
} from '@/components/broadcast/styleComponents';

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
  state: 'LIVE' | 'END' | 'READY';
}

export default function BroadcastStream() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [item, setItem] = useState<Broadcast>();
  const [streamVideo, setStreamVideo] = useState<WebRTCAdaptor>(null!);
  const [broadcastStatus, setBroadcastStatus] = useState<string>('');

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id;

    async function fetchData() {
      const fetchData = await getRestActions(RequestUrl.BROADCASTS, id);
      setItem(fetchData.data);
      return fetchData.data;
    }

    fetchData()
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

  const start = () => {
    if (streamVideo) {
      streamVideo.publish(item!.streamKey);
      setBroadcastStatus('LIVE');
    }
  };

  const finish = () => {
    streamVideo.stop(item!.streamKey);
    setBroadcastStatus('END');
  }

  return (
    item ?
      <BroadcastWrap>
        <HeaderWrap>
          <Header>
            <h3>{item.title}</h3>
          </Header>
          <LiveBadgeWrap>
            <span>{item.streamer}</span>
            <LiveBadge>
              <Badge enableShadow disableOutline color="error">
                Live
              </Badge>
              <ViewerCount>
                13,622
              </ViewerCount>
            </LiveBadge>
          </LiveBadgeWrap>
        </HeaderWrap>
        <VideoWrap>
          <video ref={videoRef} id={item.streamKey} autoPlay poster={item.thumbnailImageUrl}></video>
        </VideoWrap>
        <BottomWrap>
          <div>
            <Input placeholder="채팅을 입력해보세요!"/>
            {broadcastStatus === 'READY' &&
              <Button onPress={start} color="gradient" style={{width: '100%'}}>방송 시작</Button>}
            {broadcastStatus === 'LIVE' &&
              <Button onPress={finish} color="gradient" style={{width: '100%'}}>방송 종료</Button>}
          </div>
          <ChatWrap>
            <Chat><h6>안녕나잼민4</h6>형형 칼바람 해줘</Chat>
            <Chat><h6>안녕나잼민3</h6>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</Chat>
            <Chat><h6>롤창</h6>개못하네 ㅋㅋㅋ</Chat>
            <Chat><h6>안녕나잼민1</h6>롤 BJ가 게임을 발로 한다?!</Chat>
            <Chat><h6>안녕나잼민2</h6>zzzzzzzzzzzzzzzzzzzz</Chat>
            <Chat><h6>ㄱㅇㄱ</h6>와 방금 개쩔었다 제우스인줄</Chat>
          </ChatWrap>
        </BottomWrap>
      </BroadcastWrap>
      : <Loading type="points" color="currentColor" size="lg"/>
  );
}
