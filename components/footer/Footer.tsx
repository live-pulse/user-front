import styled from 'styled-components';

export default function Footer() {
  return <>
    <FooterWrap>
      <TextWrap>
        <h5>Live Pulse</h5>
        <hr />
        <span>coals0329@cowave.kr</span><br />
        <span>© 2023 Live Pulse, Inc. All rights reserved.</span>
      </TextWrap>
    </FooterWrap>
  </>;
}

const FooterWrap = styled.div`
  margin-top: 5%;
  height: 150px;
  width: 100%;
  background-color: #f2f3f4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrap = styled.div`
  color: darkgray !important;
  padding: 0 20px 0 20px;
  width: 100%;
  
  span {
    font-size: 14px;
  }
  
  h1, h2, h3, h4, h5, h6, span {
    margin: 3px !important;
  }
`;
