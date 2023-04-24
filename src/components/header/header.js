import React, { useContext } from 'react';
import { HeaderContainer } from './headerStyledComponents';
import UserMenu from './components/userMenu';
import DesktopMenu from './components/desktopMenu';
import MobileMenu from './components/mobileMenu';
import { MediaQueryContext } from '../../utils/context';
import Logo from './components/logo';

function Header() {
    const { isDesktop } = useContext(MediaQueryContext);
    const headerContainerPadding = isDesktop ? [8] : [2];

    const renderDesktopMenu = isDesktop && (
        <DesktopMenu />
    );

    const renderMobileMenu = !isDesktop && (
        <MobileMenu />
    );

    return (
        <HeaderContainer isDesktop={isDesktop} p={headerContainerPadding}>
            {renderMobileMenu}
            
            <Logo isDesktop={isDesktop} />

            {renderDesktopMenu}

            <UserMenu />
        </HeaderContainer>
    );
};

export default Header;