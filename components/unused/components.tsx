import { Text } from '@nextui-org/react';
import styled from 'styled-components';

export const NotOpen = () => {
  return <TextWrap>
    <div>
      <Text
        size="$3xl"
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        아직 오픈되지 않은 서비스입니다.
      </Text>
      <Text
        size="$3xl"
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        불편을 드려 죄송합니다.
      </Text>
    </div>
  </TextWrap>;
}


const TextWrap = styled.div`
  display: flex;
  width: 100vh;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
