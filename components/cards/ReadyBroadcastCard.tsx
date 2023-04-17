import styled from "styled-components";
import { notificationIcon } from '@/components/svgs/Svgs';
import { Avatar, Badge, Grid } from "@nextui-org/react";

const data = [
  {
    id: 1,
    src: 'https://nextui.org/images/card-example-6.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/57277976?v=4',
    title: 'Get Coding With Me',
    subscribtion: '같이 코딩할 사람',
    tags: ['code', 'coding', 'programming', 'java'],
    startDate: new Date('2021-10-10 10:30:00'),
    streamer: 'Hannah',
  },
  {
    id: 2,
    src: 'https://nextui.org/images/card-example-2.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/44762533?v=4',
    title: '마스터 찍을 때 까지 노방종',
    subscribtion: '마스터 찍기 프로젝트 3일차',
    tags: ['lol', 'master', 'league of legends', 'league'],
    startDate: new Date('2021-10-10 10:30:00'),
    streamer: 'Hwasowl',
  },
  {
    id: 3,
    src: 'https://nextui.org/images/card-example-3.jpeg',
    avatarImg: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    title: 'The Best of 2022',
    subscribtion: '2022년 가장 인기있었던 언어 톺아보기',
    tags: ['python', 'java', 'javascript', 'c++'],
    startDate: new Date('2021-10-10 10:30:00'),
    streamer: 'Joe',
  },
  {
    id: 4,
    src: 'https://nextui.org/images/card-example-4.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/112460618?s=200&v=4',
    title: '타임 세일 중',
    subscribtion: '봄맞이 신상 의류 세일',
    tags: ['스웨터', '반팔', '반바지', '바지'],
    startDate: new Date('2021-10-10 10:30:00'),
    streamer: 'John',
  }
];

export default function ReadyBroadcastCard() {
  return <>
    {data.map((item) => {
      return <CardWrap key={item.id}>
        <ImageWrap>
          <ImageShadowBox>
            <ImageDate>
              <EmptyBox />
              <h6>{item.startDate.getMonth()}월 {item.startDate.getDate()}일</h6>
              <h2>{item.startDate.getHours()}:{item.startDate.getUTCMinutes()}</h2>
            </ImageDate>
            <Image src={item.src} alt={item.title} key={item.id} />
          </ImageShadowBox>
        </ImageWrap>
        <TextWrap>
          <h5>{item.title}</h5>
          <h6>{item.subscribtion}</h6>
          <Grid.Container>
            {item.tags.map((tag) => {
              return <Grid key={tag}>
                <Badge variant="flat" size="sm">#{tag}</Badge>
              </Grid>;
            })}
          </Grid.Container>
          <Grid style={{ marginTop: '10px' }}>
            <Badge color="error" size="xs" variant="bordered">
              <Avatar icon={notificationIcon({width: 15, height: 15})} size="xs" style={{ backgroud: 'white' }}/>
              <span style={{ marginRight: '2px' }}>알람받기</span>
            </Badge>
          </Grid>
          <Streamer>
            <Avatar
              src={item.avatarImg}
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
