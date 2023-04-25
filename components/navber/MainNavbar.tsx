import styled from 'styled-components';
import { bellIcon, realCameraIcon, userIcon, plusIcon } from '@/components/svgs/Svgs';
import Menubar from '@/components/navber/Menubar';
import Link from "next/link";

export default function MainNavbar() {
  return <NavbarWrap>
    <Navbar>
      <Icon>
        { realCameraIcon({width: 30, height: 30}) }
        <IconText>Live Pulse</IconText>
      </Icon>
      <Logo>
        <Link href="/broadcast/create">
          { plusIcon({width: 30, height: 30}) }
        </Link>
        { bellIcon({width: 30, height: 30}) }
        { userIcon({width: 30, height: 30}) }
      </Logo>
    </Navbar>
    <Menubar />
  </NavbarWrap>;
}

const NavbarWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: white;
  backdrop-filter: saturate(180%) blur(var(--nextui--navbarBlur));
  height: initial;
  margin-bottom: 0 !important;
  align-items: center;
`;

const Icon = styled.h5`
  padding: 2% 2% 2% 4%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 !important;
`;

const IconText = styled.div`
  margin-left: 5px;
`;

const Logo = styled.div`
  padding: 3% 3% 2% 2%;
  svg {
    margin-left: 5px;
  }
`;
