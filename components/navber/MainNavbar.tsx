import styled from 'styled-components';
import { realCameraIcon, userIcon, plusIcon } from '@/components/svgs/Svgs';
import Menubar from '@/components/navber/Menubar';
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import { Dropdown } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function MainNavbar() {
  const auth = getCookie('auth');
  const [isLogin, setIsLogin] = useState(true);

  const logout = () => {
    deleteCookie('auth');
    alert('로그아웃 되었습니다.');
    setIsLogin(false);
  }

  useEffect(() => {
  }, [isLogin]);

  return <NavbarWrap>
    <Navbar>
      <Icon>
        { realCameraIcon({width: 30, height: 30}) }
        <IconText>Live Pulse</IconText>
      </Icon>
      <Logo>
        <Link href="/broadcast/create" style={{width: "30px", height: "30px"}}>
          { plusIcon({width: 30, height: 30}) }
        </Link>
        { !auth &&
          <Link href="/users" style={{width: "30px", height: "30px"}}>
            { userIcon({width: 30, height: 30}) }
          </Link>
        }
        { auth &&
          <DropDownWrap>
            <Dropdown>
              <Dropdown.Button light color="error">
                { userIcon({width: 30, height: 30}) }
              </Dropdown.Button>
              <Dropdown.Menu
                variant="light"
                aria-label="Actions"
              >
                <Dropdown.Item key="edit">
                  <Link href="/users/my-page">MyPage</Link>
                </Dropdown.Item>
                <Dropdown.Item key="delete" color="error">
                  <a onClick={logout}>Logout</a>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </DropDownWrap>
        }
      </Logo>
    </Navbar>
    <Menubar />
  </NavbarWrap>;
}

const DropDownWrap = styled.div`
  padding: 0 3% 0 3%;
`;

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
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    padding: 0 5% 0 5% !important;
  }
  span {
    margin: 0 !important;
  }
`;
