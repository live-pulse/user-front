import styled from 'styled-components';
import { Button, Input, Modal, Row, Text } from '@nextui-org/react';
import { Mail, Password } from '@/components/svgs/Svgs';
import Link from "next/link";

export default function Users() {
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
          bordered
          color="secondary"
          size="lg"
          placeholder="Account"
          contentLeft={<Mail fill="currentColor" />}
        />
        <Input
          bordered
          fullWidth
          color="secondary"
          size="lg"
          placeholder="Password"
          type="password"
          contentLeft={<Password fill="currentColor" />}
        />
      </Modal.Body>
      <Modal.Footer>
        <Row justify="space-between">
          <Link href="/users/create">
            <Text size={14}>계정이 존재하지 않습니까?</Text>
          </Link>
          <Button auto color="gradient">
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
  background-image: url('https://g-grafolio.pstatic.net/20230423_277/1682246003950urmU4_PNG/%B8%AE%BF%A5_%B8%BB%B6%FB%B0%F5_%C0%DC%B5%F0%B9%E7.png');
  background-size: cover;
`;
