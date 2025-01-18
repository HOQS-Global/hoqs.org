import React, { useEffect } from 'react';
import {
  Navbar as NavbarH,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@heroui/react';
import { HoqsLogo } from '@hoqs/core-components';
import { Link } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const menuItems = [
  { path: '/cabinets', name: 'Cabinets' },
  { path: '/drivers', name: 'Drivers' },
  //{ path: '/guides', name: 'Guides', disabled: true },
  { path: '/about', name: 'About' },
];

export const Navbar = () => 
  <NavbarH>
    <NavbarMenuToggle className="sm:hidden"/>
    <Branding />
    <NavbarContent className="hidden sm:flex" justify="center" children={<MenuItems />}/>
    <LoginStuff />
    <NavbarMenu children={<MenuItems />} />
  </NavbarH>


const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button isIconOnly variant="light" onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' ? <BsMoonStarsFill /> : <BsFillSunFill />}
    </Button>
  );
};

const Branding = () => {
  const { theme } = useTheme();
  return (
    <NavbarContent>
      <NavbarBrand>
        <Link to="/">
          <HoqsLogo variant={theme} />
        </Link>
      </NavbarBrand>
    </NavbarContent>
  );
};

const LoginStuff = () => (
  <NavbarContent justify="end">
    <DarkModeToggle/>
    <NavbarItem className="hidden lg:flex">
      <Link to="/login">Sign Up</Link>
    </NavbarItem>
    <NavbarItem>
      <Link to="/login">
        <Button color="primary" variant="flat" className="font-bold">
          Login
        </Button>
      </Link>
    </NavbarItem>
  </NavbarContent>
);

const MenuItems = () => 
  menuItems.map((item, index) => (
    <NavbarMenuItem key={`${item}-${index}`}>
      <Link to={item.path}>{item.name}</Link>
    </NavbarMenuItem>
  ));

export default Navbar;
