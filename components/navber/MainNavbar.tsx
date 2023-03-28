import styled from "styled-components";
import { bellIcon, realCameraIcon, userIcon } from "@/components/svgs/Svgs";

export default function MainNavbar() {
  return <>
    <Navbar>
      <Icon>
        { realCameraIcon({width: 30, height: 30}) }
        <IconText>Live Pulse</IconText>
      </Icon>
      <Logo>
        { bellIcon({width: 30, height: 30}) }
        { userIcon({width: 30, height: 30}) }
      </Logo>
    </Navbar>
  </>;
}

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.h5`
  padding: 2% 2% 2% 4%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconText = styled.div`
  margin-left: 5px;
`;

const Logo = styled.div`
  padding: 2% 3% 2% 2%;
  svg {
    margin-left: 5px;
  }
`;
