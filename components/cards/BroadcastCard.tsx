import styled from 'styled-components';
import { Avatar } from "@nextui-org/react";

const data = [
  {
    id: 1,
    src: 'https://nextui.org/images/card-example-6.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/57277976?v=4',
    title: '[PS5] Demon\'s Souls',
    streamer: 'Hannah',
  },
  {
    id: 2,
    src: 'https://nextui.org/images/card-example-2.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/44762533?v=4',
    title: 'Get Coding With Me',
    streamer: 'Hwasowl',
  },
  {
    id: 3,
    src: 'https://nextui.org/images/card-example-3.jpeg',
    avatarImg: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    title: 'The Best of 2022',
    streamer: 'Joe',
  },
  {
    id: 4,
    src: 'https://nextui.org/images/card-example-4.jpeg',
    avatarImg: 'https://avatars.githubusercontent.com/u/112460618?s=200&v=4',
    title: 'time to get up',
    streamer: 'John',
  }
];

export default function BroadcastCard() {
  return <CardListWrap>
    {data.map((item) => {
      return <CardWrap key={item.id}>
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
  font-size: 14px;
  padding-top: 2%;
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
