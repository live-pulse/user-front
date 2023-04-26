import styled from 'styled-components';
import Link from 'next/link';
import { Button, Checkbox, Input, Textarea } from '@nextui-org/react';
import { CameraIcon } from '@/components/svgs/Svgs';


export default function CreateBroadcast() {
  return <CreateWrap>
    <BackGroundImage />
    <InputWrap>
      <h2>방송 생성</h2>
      <Input label="방송 제목" placeholder="방송 제목" width="100%" />
      <Textarea label="방송 소개" placeholder="방송 소개" width="100%" />
      <Input label="썸네일 이미지" placeholder="썸네일 이미지 업로드" width="100%" />
      <div>
        <span>태그 선택</span><br />
        <TagBox>
          <Checkbox color="gradient" size="sm" defaultSelected>
            게임
          </Checkbox>
          <Checkbox color="gradient" size="sm">
            먹방
          </Checkbox>
          <Checkbox color="gradient" size="sm">
            일상
          </Checkbox>
        </TagBox>
      </div>
      <Input label="방송 시작 시간" placeholder="방송 시작 시간" type="time" width="100%" />
      <Link href={{
        pathname: '/broadcast/stream/[id]',
        query: { id: 'jungsu' },
      }}>
        <Button icon={<CameraIcon  width={24} height={24} />} color="gradient" style={{width: '100%'}}>
          방송 생성
        </Button>
      </Link>
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
  align-items: center;
`;
