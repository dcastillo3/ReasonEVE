import React from 'react';
import { logoName } from './headerConsts';
import { HeaderContainer, LogoContainer, LogoTitle } from './headerStyledComponents';
import Menu from './components/menu';
import { NavLink } from 'react-router-dom';
import UserMenu from './components/userMenu';

function Header() {
    return (
        <HeaderContainer p={[0, 8]} m={[8, 1]}>
            <LogoContainer>
                <NavLink to={'/'}>
                    <LogoTitle>{logoName}</LogoTitle>
                </NavLink>
            </LogoContainer>

            <Menu />
            
            <UserMenu />
        </HeaderContainer>
    );
};

export default Header;