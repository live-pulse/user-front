'use client'

import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Link from 'next/link';
import { outIcon } from '@/components/svgs/Svgs';
import { Badge, Input } from '@nextui-org/react';
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

interface Props {
  item: Broadcast
}

export default function BroadcastInfo({item}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [hls, setHls] = useState<Hls | null>(null);

  useEffect(() => {
    const video: HTMLMediaElement = videoRef.current;
    const url = item.streamUrl;

    const loadHls = () => {
      if (video && Hls.isSupported()) {
        const hlsInstance = new Hls();
        hlsInstance.loadSource(url);
        hlsInstance.attachMedia(video);
        setHls(hlsInstance);
      } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      }
    };

    loadHls();

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return <BroadcastWrap>
    <HeaderWrap>
      <Header>
        <h3>{item.title}</h3>
        <Link href={'/home'}>{outIcon({width: 35, height: 35})}</Link>
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
    <video ref={videoRef} controls={false} autoPlay={true} muted={true}>
      <source src={item.streamUrl} type="application/x-mpegURL"/>
      <script src={item.streamUrl} async/>
    </video>
    <BottomWrap>
      <div>
        <Input placeholder="채팅을 입력해보세요!"/>
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
  const id = Number(ctx.params?.id);
  console.log(id)

  return {
    props: {
      item: {
        id: 2,
        src: 'https://nextui.org/images/card-example-2.jpeg',
        avatarImg: 'https://avatars.githubusercontent.com/u/44762533?v=4',
        title: '마스터 찍을 때 까지 노방종',
        description: '마스터 찍기 프로젝트 3일차',
        tags: ['lol', 'master', 'league of legends', 'league'],
        streamer: 'Hwasowl',
        streamUrl: 'https://moonshot.hannah-log.site:5000/WebRTCAppEE/streams/jungsu.m3u8',
        streamKey: 'jungsu',
        state: 'LIVE',
      }
    }
  }
}
