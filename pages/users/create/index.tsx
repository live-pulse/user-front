'use client'

import styled from 'styled-components';
import { Button, Input, Modal, Row, Text } from '@nextui-org/react';
import { Mail, NameIcon, Password, PhoneIcon, PhotoIcon, UserIcon } from '@/components/svgs/Svgs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { postAction, RequestUrl } from '@/api/myActions';

export default function UsersCreate() {
  const router = useRouter();

  const [account, setAccount] = useState();
  const onAccount = (e) => setAccount(e.currentTarget.value);
  const [validAccount, setValidAccount] = useState(false);
  const [password, setPassword] = useState();
  const onPassword = (e) => setPassword(e.currentTarget.value);
  const [passwordCheck, setPasswordCheck] = useState();
  const onPasswordCheck = (e) => setPasswordCheck(e.currentTarget.value);
  const [email, setEmail] = useState();
  const onMail = (e) => setEmail(e.currentTarget.value);
  const [name, setName] = useState();
  const onName = (e) => setName(e.currentTarget.value);
  const [phone, setPhone] = useState();
  const onPhone = (e) => setPhone(e.currentTarget.value);
  const [userImageUrl, setUserImageUrl] = useState();
  const onUserImageUrl = (e) => setUserImageUrl(e.currentTarget.value);

  const create = async () => {
    if (!validAccount) {
      alert('아이디 중복체크가 완료되지 않았습니다.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;

    }

    if (!account || !password || !passwordCheck || !email || !name || !phone || !userImageUrl) {
      alert('모든 항목을 입력해주세요');
      return;
    }

    const request = {
      account,
      password,
      passwordCheck,
      email,
      name,
      phone,
      userImageUrl,
    }

    const result = await postAction(RequestUrl.USERS, request);
    if (result) {
      alert('회원가입이 완료되었습니다');
      router.push('/users');
    }
  }

  const checkAccount = async () => {
    const result = await postAction(RequestUrl.USERS_VALID, { account });
    if (result) {
      alert('사용 가능한 아이디입니다.');
      setValidAccount(true);
    }
  }

  return <>
    <Modal
      preventClose
      blur
      aria-labelledby="modal-title"
      open={true}
    >
      <Modal.Header style={{marginTop: '1rem'}}>
        <Text id="modal-title" b size={18}>
          Live Pulse에 회원 가입
        </Text>
      </Modal.Header>
      <Modal.Body style={{overflow: 'hidden'}}>
        <Row justify="space-between">
          <Input
            value={account}
            onChange={onAccount}
            bordered
            color="secondary"
            placeholder="Account"
            contentLeft={<UserIcon />}
          />
          <Button auto color="gradient" onPress={checkAccount}>
            중복체크
          </Button>
        </Row>
        <Input
          value={password}
          onChange={onPassword}
          bordered
          fullWidth
          color="secondary"
          placeholder="Password"
          type="password"
          contentLeft={<Password />}
        />
        <Input
          value={passwordCheck}
          onChange={onPasswordCheck}
          bordered
          fullWidth
          color="secondary"
          placeholder="Check Password"
          type="password"
          contentLeft={<Password />}
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
          value={name}
          onChange={onName}
          bordered
          fullWidth
          color="secondary"
          placeholder="Name"
          contentLeft={<NameIcon />}
        />
        <Input
          value={phone}
          onChange={onPhone}
          bordered
          fullWidth
          color="secondary"
          placeholder="User Image"
          contentLeft={<PhotoIcon />}
        />
        <Input
          value={userImageUrl}
          onChange={onUserImageUrl}
          bordered
          fullWidth
          color="secondary"
          placeholder="Phone"
          contentLeft={<PhoneIcon />}
        />
      </Modal.Body>
      <Modal.Footer style={{marginBottom: '1rem'}}>
        <Row justify="space-between">
          <Link href="/users">
            <Text size={14}>계정이 이미 존재합니까?</Text>
          </Link>
          <Button auto color="gradient" onPress={create}>
            Create Account
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

