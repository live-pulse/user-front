'use client'

import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import styled from 'styled-components';
import Link from 'next/link';
import { outIcon } from '@/components/svgs/Svgs';
import { Badge, Input } from '@nextui-org/react';

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
    <iframe id="jungsu" src={item.streamUrl} />
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
        streamUrl: 'https://moonshot.hannah-log.site:5000/WebRTCAppEE/play.html?id=jungsu&playOrder=hls&mute=false',
        streamKey: 'jungsu',
        state: 'LIVE',
      }
    }
  }
}

const BroadcastWrap = styled.div`
  height: 100vh;
  width: 100%;

  iframe {
    width: 100%;
    height: 100vh;
    outline: none;
    border: none;
    background-color: white;
  }
`;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 17vh;
  color: white;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgb(0 0 0 / 0%) 100%);
  padding: 1.3rem;

  z-index: 5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    margin: 0 !important;
  }
`;

const LiveBadgeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  div > span > span {
    position: absolute;
    margin-top: -14px;
    animation: blink 1s ease-in-out infinite alternate;

    @-webkit-keyframes blink {
      0% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }

    @-moz-keyframes blink {
      0% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes blink {
      0% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

const LiveBadge = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const ViewerCount = styled.span`
  background-color: rgb(249 249 249 / 30%);
  padding-left: 50px;
  border-radius: 15px;
  width: 120px;
  height: 28px;
  text-align: center;
  font-weight: revert;
  display: inherit;
`;

const BottomWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 38vh;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-start;
  flex-direction: column-reverse;
  padding: 1rem;
  overflow: hidden;
  
  z-index: 5;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgb(0 0 0 / 0%) 100%);
  -webkit-mask-image: linear-gradient(transparent, #fff 30px);

  input {
    width: 40vh;
  }

  label {
    color: #f1f3f5cc !important;
  }
`;

const ChatWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const Chat = styled.span`
  color: white;
  background-color: rgba(0, 0, 0, 0.49);
  border-radius: 10px;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 5px 0 2.5px 0;
  
  h6 {
    margin: 0 !important;
    font-weight: bolder;
  }
`;
