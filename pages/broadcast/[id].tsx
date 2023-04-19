'use client'

import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import styled from 'styled-components';

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

export default function BroadcastInfo({ item }: Props) {
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
    <BroadcastTitle>
      <h3>{item.title}</h3>
    </BroadcastTitle>
    <video ref={videoRef} controls={false} autoPlay={true} muted={true}>
      <source src={item.streamUrl} type="application/x-mpegURL" />
      <script src={item.streamUrl} async />
    </video>
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
        streamUrl: 'https://stream.hannah-log.site/socket/hls/jungsu/index.m3u8',
        streamKey: 'jungsu',
        state: 'LIVE',
      }
    }
  }
}

const BroadcastWrap = styled.div`
  video {
    width: 100%;
    height: 100vh;
    outline: none;
    border: none;
    background-color: black;
  }
`;

const BroadcastTitle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 15vh;
  color: white;
  background: linear-gradient(to bottom,rgb(0 0 0) 0%,rgb(0 0 0 / 0%) 100%);
  
  h3 {
    padding: 1rem;
  }
`;
