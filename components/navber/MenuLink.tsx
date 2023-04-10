import { Navbar } from '@nextui-org/react';

type NavData = {
  index: number;
  name: string;
  href: string;
  isActive: boolean;
}
export default function MenuLink({ index, name, href, isActive }: NavData) {
  return <>
    <Navbar.Link key={index} href={href} isActive={isActive}>
      {isActive}
      {name}
    </Navbar.Link>
  </>;
}
