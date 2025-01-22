import React, { useEffect, useState } from 'react';
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
import { signOut, useAuth } from '../../helpers/auth';
import { FormattedMessage } from 'react-intl';
import toast from 'react-hot-toast';

const menuItems = [
  { path: '/cabinets', name: 'Cabinets' },
  { path: '/drivers', name: 'Drivers' },
  //{ path: '/guides', name: 'Guides', disabled: true },
  { path: '/about', name: 'About' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeNavigationMenu = () => setIsMenuOpen(false);
  return <NavbarH
    shouldHideOnScroll
    isBordered 
    isMenuOpen={isMenuOpen}
    onMenuOpenChange={setIsMenuOpen}
    >
    <NavbarMenuToggle className="sm:hidden"/>
    <Branding />
    <NavbarContent className="hidden sm:flex" justify="center" children={<MenuItems />}/>
    <LoginStuff />
    <NavbarMenu children={<MenuItems closeNavigationMenu={closeNavigationMenu} />} />
  </NavbarH>
};


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

const LoginStuff = () => {
  return <NavbarContent justify="end">
    <DarkModeToggle/>
    <NavbarItem>
      <UserLoginLogout />
    </NavbarItem>
  </NavbarContent>
}

function UserLoginLogout() {
  const auth = useAuth();
  const [isLoading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await signOut();
    } catch (e) {
      toast.error('Failed to logout');
      console.error(e);
    }
    setLoading(false);
  }

  if (auth) {
    return (
      <Button
        isLoading={isLoading}
        onClick={logout}
        color="primary"
        variant="flat"
      >
        <FormattedMessage id="navbar.logout" />
      </Button>
    );
  }

  return (
    <Button as={Link} to="/login" color="primary" variant="flat">
      <FormattedMessage id="navbar.login" />
    </Button>
  );
}

const MenuItems = ({closeNavigationMenu} : {closeNavigationMenu: () => void}) =>
  menuItems.map((item, index) => (
    <NavbarMenuItem key={`${item}-${index}`} onClick={closeNavigationMenu}>
      <Link to={item.path}>
        {({ isActive }) => <span className={isActive ? "text-primary-500" : ""}>{item.name}</span>}
      </Link>
    </NavbarMenuItem>
  ));

export default Navbar;
