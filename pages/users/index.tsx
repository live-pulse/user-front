'use client'

import styled from 'styled-components';
import { Button, Input, Modal, Row, Text } from '@nextui-org/react';
import { postAction, RequestUrl } from '@/api/myActions';
import { UserIcon, Password } from '@/components/svgs/Svgs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { setCookie } from 'cookies-next';

export default function Users() {
  const router = useRouter();

  const [account, setAccount] = useState();
  const onAccount = (e) => setAccount(e.currentTarget.value);
  const [password, setPassword] = useState();
  const onPassword = (e) => setPassword(e.currentTarget.value);

  const create = async () => {
    const request = {
      account,
      password,
    }
    const result = await postAction(RequestUrl.LOGIN, request);
    if (result) {
      console.log(result);
      alert('로그인이 완료되었습니다.');
      setCookie('auth', result.data.token, { maxAge: 60 * 60 });
      await router.back();
    }
  }

  return <>
    <Modal
      preventClose
      blur
      aria-labelledby="modal-title"
      open={true}
    >
      <Modal.Header>
        <Text id="modal-title" b size={18}>
          Live Pulse에 로그인
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          value={account}
          onChange={onAccount}
          bordered
          color="secondary"
          placeholder="Account"
          contentLeft={<UserIcon />}
        />
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
      </Modal.Body>
      <Modal.Footer>
        <Row justify="space-between">
          <Link href="/users/create">
            <Text size={14}>계정이 존재하지 않습니까?</Text>
          </Link>
          <Button auto color="gradient" onPress={create}>
            Sign in
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
    <BackGroundImage />
  </>;
}

const BackGroundImage = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('https://g-grafolio.pstatic.net/20220406_116/1649215060171sLWlQ_JPEG/%C1%A6%B8%F1_%BE%F8%C0%BD-1_%BA%B9%BB%E72.jpg');
  background-size: cover;
`;
