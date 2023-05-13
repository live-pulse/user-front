import styled from 'styled-components';

const BroadcastWrap = styled.div`
  height: 100vh;
  width: 100%;
`;

const ButtonWrap = styled.div`
  left: 45%;
  bottom: 55%;
  position: absolute;
  z-index: 10;
`;

const BottomWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 38vh;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-start;
  flex-direction: column-reverse;
  padding: 1rem;
  overflow: hidden;

  z-index: 5;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgb(0 0 0 / 0%) 100%);
  -webkit-mask-image: linear-gradient(transparent, #fff 30px);

  label {
    color: #f1f3f5cc !important;
  }

  button {
    margin-top: 0.5rem;
  }
;
`;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 17vh;
  color: white;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgb(0 0 0 / 0%) 100%);
  padding: 1.3rem;

  z-index: 5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    margin: 0 !important;
  }
`;

const LiveBadgeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div > span > span {
    position: absolute;
    margin-top: -14px;
    animation: blink 1s ease-in-out infinite alternate;

    @-webkit-keyframes blink {
      0% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }

    @-moz-keyframes blink {
      0% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes blink {
      0% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

const LiveBadge = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const ViewerCount = styled.span`
  background-color: rgb(249 249 249 / 30%);
  padding-left: 50px;
  border-radius: 15px;
  width: 120px;
  height: 28px;
  text-align: center;
  font-weight: revert;
  display: inherit;
`;

const ChatWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const Chat = styled.span`
  color: white;
  background-color: rgba(0, 0, 0, 0.49);
  border-radius: 10px;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 5px 0 2.5px 0;
  width: 100%;

  h6 {
    margin: 0 !important;
    font-weight: bolder;
  }
`;

const ChatInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  calc(var(--nextui--inputHeightRatio) * var(--nextui-space-9));
`;

const VideoWrap = styled.div`
  left: 50%;
  position: fixed;
  transform: translateX(-50%);
  overflow: hidden;

  video {
    height: 100vh;
    outline: none;
    border: none;
    object-fit: cover;
  }
`;

export {
  BroadcastWrap,
  HeaderWrap,
  Header,
  LiveBadgeWrap,
  LiveBadge,
  ViewerCount,
  BottomWrap,
  ChatWrap,
  Chat,
  ButtonWrap,
  VideoWrap,
  ChatInputWrap
};
