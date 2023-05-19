import { Button, Modal, Row, Text } from '@nextui-org/react';
import Link from 'next/link';
import styled from 'styled-components';

export default function BroadcastFinish() {
  return <>
    <Modal
      preventClose
      blur
      aria-labelledby="modal-title"
      open={true}
    >
      <Modal.Header style={{marginTop: '1rem'}}>
        <Text id="modal-title" b size={18}>
          방송이 종료되었습니다<br />
          다음에 다시 찾아와주세요✨
        </Text>
      </Modal.Header>
      <Modal.Body style={{overflow: 'hidden'}}>
      </Modal.Body>
      <Modal.Footer style={{marginBottom: '1rem'}}>
        <Row justify="center">
          <Link href="/home">
            <Button auto color="gradient">
              메인으로
            </Button>
          </Link>
        </Row>
      </Modal.Footer>
    </Modal>
    <BackGroundImage/>
  </>;
}

const BackGroundImage = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('https://g-grafolio.pstatic.net/20230228_52/1677559585993WxEps_JPEG/20230228_wave_pc_jiyunsea.jpg');
  background-size: cover;
`;

