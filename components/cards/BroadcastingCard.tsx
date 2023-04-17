import styled from 'styled-components';
import { Avatar, Badge, Grid } from "@nextui-org/react";

const data = [
  {
    id: 1,
    src: 'https://nextui.org/images/card-example-6.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/57277976?v=4',
    title: 'Get Coding With Me',
    subscribtion: '같이 코딩할 사람',
    tags: ['code', 'coding', 'programming', 'java'],
    streamer: 'Hannah',
  },
  {
    id: 2,
    src: 'https://nextui.org/images/card-example-2.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/44762533?v=4',
    title: '마스터 찍을 때 까지 노방종',
    subscribtion: '마스터 찍기 프로젝트 3일차',
    tags: ['lol', 'master', 'league of legends', 'league'],
    streamer: 'Hwasowl',
  },
  {
    id: 3,
    src: 'https://nextui.org/images/card-example-3.jpeg',
    avatarImg: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    title: 'The Best of 2022',
    subscribtion: '2022년 가장 인기있었던 언어 톺아보기',
    tags: ['python', 'java', 'javascript', 'c++'],
    streamer: 'Joe',
  },
  {
    id: 4,
    src: 'https://nextui.org/images/card-example-4.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/112460618?s=200&v=4',
    title: '타임 세일 중',
    subscribtion: '봄맞이 신상 의류 세일',
    tags: ['스웨터', '반팔', '반바지', '바지'],
    streamer: 'John',
  }
];

export default function BroadcastingCard() {
  return <CardListWrap>
    {data.map((item) => {
      return <CardWrap key={item.id}>
        <LiveBadge>
          <Grid>
            <Badge enableShadow disableOutline color="error">
              Live
            </Badge>
          </Grid>
        </LiveBadge>
        <Image src={item.src} alt={item.title} />
        <Title>{item.title}</Title>
        <Streamer>
          <Avatar
            src={item.avatarImg}
            size="xs"
          />
          <AvatarName>{item.streamer}</AvatarName>
        </Streamer>
      </CardWrap>;
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
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @-moz-keyframes blink{
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes blink{
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  }
`;
