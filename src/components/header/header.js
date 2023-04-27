import React from 'react';
import { HeaderContainer, HeaderFlexBoxContainer } from './headerStyledComponents';
import UserMenu from './components/userMenu';
import DesktopMenu from './components/desktopMenu';
import MobileMenu from './components/mobileMenu';
import Logo from './components/logo';
import { useMediaQuery } from '../../hooks';

function Header() {
    const { isDesktop } = useMediaQuery();
    const headerContainerPadding = isDesktop ? [5, 8] : [2];

    const renderDesktopMenu = isDesktop && (
        <DesktopMenu />
    );

    const renderMobileMenu = !isDesktop && (
        <MobileMenu />
    );

    return (
        <HeaderContainer variant={'background'} p={headerContainerPadding}>
            <HeaderFlexBoxContainer $isDesktop={isDesktop}>
                {renderMobileMenu}

                <Logo isDesktop={isDesktop} />

                {renderDesktopMenu}

                <UserMenu />
            </HeaderFlexBoxContainer>
        </HeaderContainer>
    );
};

export default Header;