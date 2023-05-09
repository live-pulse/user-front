'use client'

import styled from 'styled-components';
import { Button, Checkbox, Input, Textarea } from '@nextui-org/react';
import { CameraIcon } from '@/components/svgs/Svgs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postAction, RequestUrl } from '@/api/myActions';
import { getCookie } from 'cookies-next';

export default function CreateBroadcast() {
  const tagData = ["게임", "먹방", "일상", "공부", "쇼핑"];

  const router = useRouter();

  const [title, setTitle] = useState();
  const onTitle = (e) => setTitle(e.currentTarget.value);
  const [description, setDescription] = useState();
  const onDescription = (e) => setDescription(e.currentTarget.value);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState();
  const onThumbnailImageUrl = (e) => setThumbnailImageUrl(e.currentTarget.value);
  const [startDate, setStartDate] = useState('');
  const onStartDate = (e) => setStartDate(e.currentTarget.value);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (router.isReady) {
      const auth = getCookie('auth');
      if (!auth) {
        alert('로그인이 필요합니다.');
        router.push('/users');
      }
    }
  }, [router.isReady])

  const create = async () => {
    const date = new Date;
    date.setHours(Number(startDate.split(':')[0]));
    date.setMinutes(Number(startDate.split(':')[1]));
    const request = {
      title,
      description,
      thumbnailImageUrl,
      startDate: date,
      tags,
    }
    const result = await postAction(RequestUrl.BROADCASTS, request);
    if (result) {
      console.log(result);
      alert('방송이 생성되었습니다');
      router.push(`/broadcast/stream/${result.data.streamKey}`);
    }
  }

  return <CreateWrap>
    <BackGroundImage />
    <InputWrap>
      <h2>방송 생성</h2>
      <Input value={title} onChange={onTitle} label="방송 제목" placeholder="방송 제목" width="100%" />
      <Textarea value={description} onChange={onDescription} label="방송 소개" placeholder="방송 소개" width="100%" />
      <Input value={thumbnailImageUrl} onChange={onThumbnailImageUrl} label="썸네일 이미지" placeholder="썸네일 이미지 업로드" width="100%" />
      <div>
        <span>태그 선택</span><br />
        <Checkbox.Group value={tags} onChange={setTags}>
          <TagBox>
            {tagData.map((tag, index) => {
              return <Checkbox value={tag} key={index} color="gradient" size="sm">{tag}</Checkbox>
            })}
          </TagBox>
        </Checkbox.Group>
      </div>
      <Input value={startDate} onChange={onStartDate} label="방송 시작 시간" placeholder="방송 시작 시간" type="time" width="100%" />
      <Button onPress={create} icon={<CameraIcon  width={24} height={24} />} color="gradient" style={{width: '100%'}}>
        방송 생성
      </Button>
    </InputWrap>
  </CreateWrap>;
}

const CreateWrap = styled.div`
  height: 100vh;
  width: 100%;
`;

const BackGroundImage = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('https://g-grafolio.pstatic.net/20210503_195/1620003838099Q39dq_JPEG/22021046_%C1%B6%B4%D9%C0%BA_%C1%DF%B0%A3%B0%FA%C1%A6.jpg');
  background-size: cover;
  filter: blur(10px);
`;

const InputWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: white;
  width: 80%;
  height: 80vh;
  
  label, span { 
    color: white;
    margin-right: 5px;
    padding-left: 5px !important;
  }
  
  div { 
    margin: 0 0 10px 0; 
  }
  button div, label div {
    margin: 0 !important;
  }
`;

const TagBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
`;
