'use clinet'

import styled from 'styled-components';
import { notificationIcon } from '@/components/svgs/Svgs';
import { Avatar, Badge, Grid } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getRestActions, RequestUrl } from '@/api/myActions';
import Link from 'next/link';
import { dateKoFormat, timeFormat } from '@/components/utils/dateUtils';

interface BroadcastInfo {
  id: number;
  title: string;
  description: string;
  streamKey: string;
  thumbnailImageUrl: string;
  startDate: Date;
  userId: number;
  streamer: string;
  profileUrl: string;
  state: 'READY' | 'BROADCASTING' | 'FINISHED';
  streamUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function ReadyBroadcastCard() {
  const [readyBroadcasts, setReadyBroadcasts] = useState<BroadcastInfo[]>([]);

  useEffect(() => {
    async function fetchLiveBroadcastData() {
      const fetch = await getRestActions(RequestUrl.BROADCASTS, 'ready');
      setReadyBroadcasts(fetch.data);
      return fetch.data;
    }

    if (readyBroadcasts.length < 1) {
      fetchLiveBroadcastData();
    }
  }, [readyBroadcasts]);

  return <>
    { readyBroadcasts.map((item: BroadcastInfo) => {
      return <CardWrap key={item.id}>
        <Link href={`/broadcast/${item.streamKey}`}>
          <ImageWrap>
            <ImageShadowBox>
              <ImageDate>
                <EmptyBox />
                <h6>{dateKoFormat(item.startDate)}</h6>
                <h2>{timeFormat(item.startDate)}</h2>
              </ImageDate>
              <Image src={item.thumbnailImageUrl} alt={item.title} key={item.id} />
            </ImageShadowBox>
          </ImageWrap>
        </Link>
        <TextWrap>
          <h5>{item.title}</h5>
          <h6>{item.description}</h6>
          <Grid.Container>
            {item.tags.map((tag: string) => {
              return <Grid key={tag}>
                <Badge variant="flat" size="sm">#{tag}</Badge>
              </Grid>;
            })}
          </Grid.Container>
          <Grid style={{ marginTop: '10px' }}>
            <Badge color="error" size="xs" variant="bordered">
              <Avatar icon={ notificationIcon({width: 15, height: 15}) } size="xs" />
              <Link href='' onClick={() => {
                alert('미지원 기능입니다.');
                return;
              }}>
                <span style={{ marginRight: '2px' }}>알람받기</span>
              </Link>
            </Badge>
          </Grid>
          <Streamer>
            <Avatar
              src={item.profileUrl}
              size="xs"
            />
            <AvatarName>{item.streamer}</AvatarName>
          </Streamer>
        </TextWrap>
      </CardWrap>;
    })}
  </>;
}

const CardWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  .nextui-avatar-bg {
    background-color: #fff !important;
  }
`;

const ImageWrap = styled.div`
  padding: 0 10px 10px 8px;
`;

const ImageShadowBox = styled.div`
  width: 150px;
  height: 210px;
  border-radius: 10px;
  background-color: #000;
`;

const ImageDate = styled.div`
  position: absolute;
  z-index: 5;
  padding: 8px;
  display: flex;
  flex-direction: column;
  color: #fff;
  line-height: 1.2;
  text-shadow: 0 1px 0 rgba(0,0,0,.3);
  text-align: center;
  width: inherit;
`;

const Image = styled.img`
  width: 150px;
  height: 210px;
  object-fit: cover;
  border-radius: 10px;
  opacity: 0.6;
`;

const EmptyBox = styled.div`
  height: 58px;
`;

const Streamer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 12px;
  color: #767678;
  letter-spacing: -0.15px;
  margin-top: 3%;
`;

const AvatarName = styled.span`
  padding-left: 5px;
`;

const TextWrap = styled.div`
  width: 100%;
  
  h5 {
    font-size: 18px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  h6 {
    font-size: 14px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 5px;
  }
`;
