'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Hls from 'hls.js';
import Link from 'next/link';
import { outIcon, PlayIcon } from '@/components/svgs/Svgs';
import { Avatar, Badge, Input, Loading } from '@nextui-org/react';
import {
  BottomWrap,
  BroadcastWrap,
  Chat,
  ChatWrap,
  Header,
  HeaderWrap,
  LiveBadge,
  LiveBadgeWrap,
  ViewerCount,
  ButtonWrap, VideoWrap,
} from '@/components/broadcast/styleComponents';
import { getRestActions, RequestUrl } from '@/api/myActions';

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
  state: 'LIVE' | 'END' | 'READY';
}

export default function BroadcastInfo() {
  const router = useRouter();
  const [item, setItem] = useState<Broadcast | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null!!);
  const [hls, setHls] = useState<Hls | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id;

    async function fetchData() {
      const fetchData = await getRestActions(RequestUrl.BROADCASTS, id);
      if (!fetchData) router.push('/home');
      setItem(fetchData.data);
      return fetchData.data;
    }

    fetchData();
  }, [router.isReady]);

  const play = () => {
    if (item!.state !== 'LIVE') alert('방송이 시작되지 않았습니다.');

    const video: HTMLMediaElement = videoRef.current;

    if (video && Hls.isSupported()) {
      const hlsInstance = new Hls();
      hlsInstance.loadSource(item!.streamUrl);
      hlsInstance.attachMedia(video);
      setHls(hlsInstance);
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = item!.streamUrl;
    }

    if (hls) {
      hls.destroy();
    }
  }

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
        { !hls && <ButtonWrap>
          <Avatar onClick={play} size="xl" color="gradient" icon={<PlayIcon />} />
        </ButtonWrap> }
        <VideoWrap>
          <video ref={videoRef} controls={false} autoPlay={true} muted={true} poster={item.thumbnailImageUrl}>
            <source src={item.streamUrl} type="application/x-mpegURL"/>
            <script src={item.streamUrl} async/>
          </video>
        </VideoWrap>
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
