'use client'

import { Navbar } from '@nextui-org/react';
import { useRouter } from 'next/router';
import MenuLink from '@/components/navber/MenuLink';

type NavData = {
  index: number;
  name: string;
  href: string;
  isOpen: boolean;
}

type NavDataArr = NavData[];

const navData: NavDataArr = [
  {
    index: 0,
    name: "Home",
    href: "/home",
  },
  {
    index: 1,
    name: "Event",
    href: "/event",
  },
  {
    index: 2,
    name: "Category",
    href: "/category",
  }
];

export default function Menubar() {
  const router = useRouter();

  return <>
    <Navbar variant="sticky" shouldHideOnScroll={true} disableShadow={true} maxWidth="fluid" isCompact={true}>
      <Navbar.Content activeColor="error" variant="underline-rounded" underlineHeight="light" gap="full">
        {navData.map((data) => {
          return <MenuLink
            key={data.index}
            index={data.index}
            name={data.name}
            href={data.href}
            isActive={router.pathname === data.href}
          />
        })}
      </Navbar.Content>
    </Navbar>
  </>;
}
