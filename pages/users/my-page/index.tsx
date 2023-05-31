'use client'

import styled from 'styled-components';
import { Button, Input, Modal, Row, Text } from '@nextui-org/react';
import { Mail, NameIcon, PhoneIcon, PhotoIcon, UserIcon } from '@/components/svgs/Svgs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getRestActions, patchAction, postImage, RequestUrl } from '@/api/myActions';

export default function MyPage() {
  const router = useRouter();

  const [account, setAccount] = useState();
  const [email, setEmail] = useState();
  const onMail = (e) => setEmail(e.currentTarget.value);
  const [name, setName] = useState();
  const onName = (e) => setName(e.currentTarget.value);
  const [phone, setPhone] = useState();
  const onPhone = (e) => setPhone(e.currentTarget.value);
  const [userImageUrl, setUserImageUrl] = useState();

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const result = await postImage(file);
    if (result) {
      setUserImageUrl(result.data);
    }
  }

  const update = async () => {
    if (!email || !name || !phone || !userImageUrl) {
      alert('모든 항목을 입력해주세요');
      return;
    }

    const request = {
      email,
      name,
      phone,
      userImageUrl,
    }

    const result = await patchAction(RequestUrl.USERS, request);
    if (result) {
      alert('회원 수정이 완료되었습니다.');
      router.back();
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const result = await getRestActions(RequestUrl.USERS, null);
      if (result) {
        setAccount(result.data.account);
        setEmail(result.data.email);
        setName(result.data.name);
        setPhone(result.data.phone);
        setUserImageUrl(result.data.userImageUrl);
      } else {
        router.back();
      }
    }
    fetch();
  }, [account]);

  return <>
    <Modal
      preventClose
      blur
      aria-labelledby="modal-title"
      open={true}
    >
      <Modal.Header style={{marginTop: '1rem'}}>
        <Text id="modal-title" b size={18}>
          회원 정보 수정
        </Text>
      </Modal.Header>
      <Modal.Body style={{overflow: 'hidden'}}>
        <Input
          value={account}
          bordered
          color="secondary"
          placeholder="Account"
          contentLeft={<UserIcon />}
          readOnly
        />
        <Input
          value={email}
          onChange={onMail}
          bordered
          fullWidth
          color="secondary"
          placeholder="Mail"
          type="mail"
          contentLeft={<Mail />}
        />
        <Input
          initialValue={name}
          onChange={onName}
          bordered
          fullWidth
          color="secondary"
          placeholder="Name"
          contentLeft={<NameIcon />}
        />
        <FileNoneWrap>
          <Input
            onInput={uploadImage}
            type="file"
            bordered
            fullWidth
            color="secondary"
            placeholder={userImageUrl ? userImageUrl : "User Image"}
            contentLeft={<PhotoIcon />}
          />
        </FileNoneWrap>
        <Input
          value={phone}
          onChange={onPhone}
          bordered
          fullWidth
          color="secondary"
          placeholder="Phone"
          contentLeft={<PhoneIcon />}
        />
      </Modal.Body>
      <Modal.Footer style={{marginBottom: '1rem'}}>
        <Row justify="center">
          <Button color="gradient" onClick={update}>
            수정
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
    <BackGroundImage/>
  </>;
}

const BackGroundImage = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('https://g-grafolio.pstatic.net/20210227_247/1614414885773WKham_JPEG/KakaoTalk_Photo_2021-02-26-01-47-09_m.jpg');
  background-size: cover;
`;

const FileNoneWrap = styled.div`
  input::file-selector-button {
    display: none;
  }
  input[type="file"] {
    margin-top: 1.6em;
    color: var(--nextui--inputTextColor);
  }
  height: 40px !important;
`;

