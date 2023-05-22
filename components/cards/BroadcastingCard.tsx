'use client'

import styled from 'styled-components';
import Link from 'next/link';
import { Avatar, Badge, Grid } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getRestActions, RequestUrl } from '@/api/myActions';

interface BroadcastInfo {
  id: number;
  title: string;
  streamKey: string;
  thumbnailImageUrl: string;
  streamer: string;
  profileUrl: string;
}

export default function BroadcastingCard() {
  const [liveBroadcasts, setLiveBroadcasts] = useState<BroadcastInfo[]>([]);

  useEffect(() => {
    async function fetchLiveBroadcastData() {
      const fetch = await getRestActions(RequestUrl.BROADCASTS, 'live');
      setLiveBroadcasts(fetch?.data);
      return fetch.data;
    }

    if (liveBroadcasts.length < 1) {
      fetchLiveBroadcastData();
    }
  }, liveBroadcasts.length < 1);


  return <CardListWrap>
    {liveBroadcasts.map((item: BroadcastInfo) => {
      return <Link href={`/broadcast/${item.streamKey}`} key={item.id}>
        <CardWrap>
          <LiveBadge>
            <Grid>
              <Badge enableShadow disableOutline color="error">
                Live
              </Badge>
            </Grid>
          </LiveBadge>
          <Image src={item.thumbnailImageUrl} alt={item.title}/>
          <Title>{item.title}</Title>
          <Streamer>
            <Avatar
              src={item.profileUrl}
              size="xs"
            />
            <AvatarName>{item.streamer}</AvatarName>
          </Streamer>
        </CardWrap>
      </Link>;
    })}
  </CardListWrap>;
}

const CardListWrap = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding-left: 8px;
  display: block;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CardWrap = styled.div`
  display: inline-block;
  position: relative;
  white-space: normal;
  cursor: pointer;
`;

const Image = styled.img`
  width: 160px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  position: relative;
  display: block;
  vertical-align: top;
  margin: 0 8px 0 0;
`;

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  word-wrap: normal;
  line-height: 1.29;
  font-size: 15px;
  font-weight: bold;
  padding: 2% 0 1% 0;
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
  margin-top: 1%;
`;

const AvatarName = styled.span`
  padding-left: 5px;
`;

const LiveBadge = styled.div`
  position: absolute;
  z-index: 10;
  top: 3%;
  left: 5%;
  
  div > span > span {
    -webkit-animation: blink 1s ease-in-out infinite alternate;
    -moz-animation: blink 1s ease-in-out infinite alternate;
    animation: blink 1s ease-in-out infinite alternate;

    @-webkit-keyframes blink{
      0% { opacity: 0.3; }
      100% { opacity: 1; }
    }

    @-moz-keyframes blink{
      0% { opacity: 0.3; }
      100% { opacity: 1; }
    }

    @keyframes blink{
      0% { opacity: 0.3; }
      100% { opacity: 1; }
    }
  }
`;
