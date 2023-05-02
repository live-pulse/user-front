'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Hls from 'hls.js';
import Link from 'next/link';
import { outIcon } from '@/components/svgs/Svgs';
import { Badge, Input, Loading } from '@nextui-org/react';
import {
  BroadcastWrap, BottomWrap, Chat, ChatWrap, Header,
  HeaderWrap, LiveBadge, LiveBadgeWrap, ViewerCount
} from '@/components/broadcast/styleComponents';
import { getOneBroadcast } from '@/api/broadcast/actions';

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

export default function BroadcastInfo() {
  const router = useRouter();
  const [item, setItem] = useState<Broadcast>();
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [hls, setHls] = useState<Hls | null>(null);

  useEffect(() => {
    const id = Number(router.query.id);
    async function fetchData() {
      const fetchData = await getOneBroadcast(id);
      setItem(fetchData.data);
      return fetchData.data;
    }
    fetchData()
      .then((data) => {
        const video: HTMLMediaElement = videoRef.current;
        const url = data.streamUrl;

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
      });
  }, []);

  return (
    item ?
      <BroadcastWrap>
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
      </BroadcastWrap>
      : <Loading type="points" color="currentColor" size="lg"/>
  )
}
