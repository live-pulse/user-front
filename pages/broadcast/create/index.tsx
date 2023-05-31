'use client'

import styled from 'styled-components';
import { Button, Input, Row, Textarea } from '@nextui-org/react';
import { CameraIcon } from '@/components/svgs/Svgs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postAction, postImage, RequestUrl } from '@/api/myActions';
import { getCookie } from 'cookies-next';

export default function CreateBroadcast() {
  const router = useRouter();

  const [title, setTitle] = useState();
  const onTitle = (e) => setTitle(e.currentTarget.value);
  const [description, setDescription] = useState();
  const onDescription = (e) => setDescription(e.currentTarget.value);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState();
  const [startDate, setStartDate] = useState('');
  const onStartDate = (e) => setStartDate(e.currentTarget.value);
  const [tag, setTag] = useState<string>();
  const onTag = (e) => setTag(e.currentTarget.value);
  const [tags, setTags] = useState<string[]>([]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const result = await postImage(file);
    if (result) {
      setThumbnailImageUrl(result.data);
    }
  }

  const addTags = () => {
    if (!tag) {
      alert('태그를 입력해주세요.');
      return;
    }
    setTags([...tags, tag]);
    setTag('');
  }

  const removeTags = (value) => {
    setTags(tags.filter(tag => tag !== value));
  }

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
    console.log(tags)

    if (!title || !description || !thumbnailImageUrl || !startDate || tags.length < 1) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const request = {
      title,
      description,
      thumbnailImageUrl,
      startDate: date,
      tags,
    }
    const result = await postAction(RequestUrl.BROADCASTS, request);
    if (result) {
      alert('방송이 생성되었습니다');
      router.push(`/broadcast/stream/${result.data.streamKey}`);
    }
  }

  return <CreateWrap>
    <BackGroundImage />
    <InputWrap>
      <h2>방송 생성</h2>
      <Input initialValue={title} onChange={onTitle} label="방송 제목" placeholder="방송 제목" width="100%" />
      <Textarea initialValue={description} onChange={onDescription} label="방송 소개" placeholder="방송 소개" width="100%" />
      <FileNoneWrap>
        <Input type="file" initialValue={thumbnailImageUrl} onInput={uploadImage} label="썸네일 이미지" placeholder="썸네일 이미지 업로드" width="100%" />
      </FileNoneWrap>
      <div>
        <Row justify="space-between" align="center">
          <Input initialValue={tag} onChange={onTag} label="태그 추가" placeholder="태그 추가" width="100%" />
          <Button auto color="gradient" onClick={addTags}>+</Button>
        </Row>
        <TagBox>
          {tags.map((tag, index) => {
            return <Button auto value={tag} key={index} color="gradient" size="xs" onClick={() => removeTags(tag)}>{tag} X</Button>
          })}
        </TagBox>
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
  margin-top: -20px !important;
  button {
    margin-right: 5px;
  }
`;

const FileNoneWrap = styled.div`
  input::file-selector-button {
    display: none;
  }
  input[type="file"] {
    margin-top: 1.6em;
    color: var(--nextui--inputTextColor);
  }
`;

