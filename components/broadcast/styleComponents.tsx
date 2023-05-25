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

const ReadyWrap = styled.div`
  position: absolute;
  display: flex;
  z-index: 3;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  h1, h2, h3, h4, h5, h6 {
    color: #fff;
    margin: 0 !important;
  }
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

const BottomStreamWrap = styled.div`
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
  
  button {
    margin: 10px 0 10px 10px;
  }
`;

const LiveBadgeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LiveBadge = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;

  span > span {
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

const ViewerCount = styled.div`
  background-color: rgb(249 249 249 / 30%);
  padding-left: 50px;
  border-radius: 15px;
  width: 105px;
  height: 28px;
  text-align: center;
  font-weight: 600;
  display: inherit;
  font-size: smaller;
  padding-top: 3px;
  justify-content: center;
`;

const ChatWrap = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 0.5rem;

  @keyframes slide-up {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Chat = styled.span`
  color: white;
  background-color: rgba(0, 0, 0, 0.49);
  border-radius: 10px;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin: 5px 0 2.5px 0;
  width: 100%;

  opacity: 0;
  animation: slide-up 0.5s ease-in-out forwards;

  h6 {
    margin: 0 !important;
    font-weight: bolder;
  }
`;

const ChatInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin: 0 !important;
  }
`;

const VideoWrap = styled.div`
  left: 50%;
  position: fixed;
  transform: translateX(-50%);
  overflow: hidden;

  video {
    height: 100vh;
    width: 100vh;
    outline: none;
    border: none;
    object-fit: cover;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0.375rem 0.75rem;
  margin: 0 3px 0 0;
  font-size: revert;
  font-weight: 400;
  font-family: inherit;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 12px;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

export {
  BroadcastWrap,
  HeaderWrap,
  Header,
  LiveBadgeWrap,
  LiveBadge,
  ViewerCount,
  BottomWrap,
  BottomStreamWrap,
  ChatWrap,
  Chat,
  ButtonWrap,
  ReadyWrap,
  VideoWrap,
  ChatInputWrap,
  Input,
};
