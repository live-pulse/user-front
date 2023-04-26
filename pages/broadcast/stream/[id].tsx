'use client'

import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor';
import { Badge, Button, Input } from '@nextui-org/react';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import {
  BroadcastWrap, BottomWrap, Chat, ChatWrap, Header,
  HeaderWrap, LiveBadge, LiveBadgeWrap, ViewerCount
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

export default function BroadcastStream(broadcast: Broadcast) {
  const [streamVideo, setStreamVideo] = useState<WebRTCAdaptor>(null!);
  const [broadcastStatus, setBroadcastStatus] = useState<string>(broadcast.state);

  useEffect(() => {
    const webRTCAdaptor = new WebRTCAdaptor({
      websocket_url: 'wss://moonshot.hannah-log.site:5000/WebRTCAppEE/websocket',
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
      localVideoId: broadcast.streamKey,
      bandwidth: 600,
      dataChannelEnabled: true,
      callback: (info, obj) => {},
      callbackError: function (error, message) {},
    });
    setStreamVideo(webRTCAdaptor);
  }, []);

  const start = () => {
    streamVideo.publish(broadcast.streamKey);
    setBroadcastStatus('LIVE');
  }

  const finish = () => {
    streamVideo.stop(broadcast.streamKey);
    setBroadcastStatus('END');
  }

  return <BroadcastWrap>
    <HeaderWrap>
      <Header>
        <h3>{broadcast.title}</h3>
      </Header>
      <LiveBadgeWrap>
        <span>{broadcast.streamer}</span>
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
    <video id={broadcast.streamKey} autoPlay muted></video>
    <BottomWrap>
      <div>
        <Input placeholder="채팅을 입력해보세요!"/>
        {broadcastStatus === 'READY' && <Button onPress={start} color="gradient" style={{width: '100%'}}>방송 시작</Button> }
        {broadcastStatus === 'LIVE' && <Button onPress={finish} color="gradient" style={{width: '100%'}}>방송 종료</Button> }
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
  </BroadcastWrap>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const streamKey = ctx.params?.id;
  console.log(streamKey);
  return {
    props:
      {
        id: 2,
        src: 'https://nextui.org/images/card-example-2.jpeg',
        avatarImg: 'https://avatars.githubusercontent.com/u/44762533?v=4',
        title: '마스터 찍을 때 까지 노방종',
        description: '마스터 찍기 프로젝트 3일차',
        tags: ['lol', 'master', 'league of legends', 'league'],
        streamer: 'Hwasowl',
        streamUrl: 'https://moonshot.hannah-log.site:5000/WebRTCAppEE/streams/jungsu.m3u8',
        streamKey: streamKey,
        state: 'READY',
      }
  };
}
