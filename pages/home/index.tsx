import styled from 'styled-components';
import BroadcastingCard from '@/components/cards/BroadcastingCard';
import ReadyBroadcastCard from '@/components/cards/ReadyBroadcastCard';
import Footer from '@/components/footer/Footer';
import MainNavbar from '@/components/navber/MainNavbar';

export default function Home() {
  return <>
    <MainNavbar />
    <TitleWrap style={{marginTop: '29%'}}>
      <Title>바로 지금! 라이브 방송</Title>
    </TitleWrap>
    <BroadcastingCard/>
    <TitleWrap style={{marginTop: '3%'}}>
      <Title>라이브 예고</Title>
    </TitleWrap>
    <ReadyBroadcastCard/>
    <Footer/>
  </>;
}

const TitleWrap = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 0 3% 0 3%;
`;

const Title = styled.h6`
  font-size: 20px;
  font-weight: bold;
`;
