'use client'

import styled from 'styled-components';
import BroadcastCard from '@/components/cards/BroadcastCard';

export default function Home() {
  return <>
    <TitleWrap>
      <Title>바로 지금! 라이브 방송</Title>
    </TitleWrap>
    <BroadcastCard />
  </>;
}

const TitleWrap = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 27%;
  width: 100%;
  padding: 0 3% 0 3%;
`;

const Title = styled.h6`
  font-size: 20px;
  font-weight: bold;
`;
