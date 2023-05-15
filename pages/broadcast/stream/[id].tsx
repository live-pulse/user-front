'use client'

import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor';
import { Badge, Button, Input, Loading } from '@nextui-org/react';
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
  LiveBadgeWrap, VideoWrap,
  ViewerCount,
  ChatInputWrap
} from '@/components/broadcast/styleComponents';

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

export default function BroadcastStream() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [broadcast, setBroadcast] = useState<Broadcast>();
  const [streamVideo, setStreamVideo] = useState<WebRTCAdaptor>(null!);
  const [broadcastStatus, setBroadcastStatus] = useState<BroadcastState>(BroadcastState.READY);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id;

    async function fetchData() {
      const fetchData = await getRestActions(RequestUrl.BROADCASTS, id);
      setBroadcast(fetchData.data);
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
            <Input fullWidth placeholder="채팅을 입력해보세요!"/>
            <Button auto color="gradient">전송</Button>
          </ChatInputWrap>
          <ChatWrap>
            <Chat><h6>안녕나잼민4</h6>형형 칼바람 해줘</Chat>
            <Chat><h6>안녕나잼민3</h6>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</Chat>
            <Chat><h6>롤창</h6>개못하네 ㅋㅋㅋ</Chat>
            <Chat><h6>안녕나잼민1</h6>롤 BJ가 게임을 발로 한다?!</Chat>
            <Chat><h6>안녕나잼민2</h6>zzzzzzzzzzzzzzzzzzzz</Chat>
            <Chat><h6>ㄱㅇㄱ</h6>와 방금 개쩔었다 제우스인줄</Chat>
          </ChatWrap>
        </BottomStreamWrap>
      </BroadcastWrap>
      : <Loading type="points" color="currentColor" size="lg"/>
  );
}
