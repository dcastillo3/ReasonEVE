import React from 'react';
import { menuRoutes } from '../../../routes/routesConsts';
import { DesktopMenuContainer, DesktopMenuItemContainer } from '../headerStyledComponents';
import MenuItem from './menuItem';

function DesktopMenu() {
    const renderMenuItems = menuRoutes.map(({ name, path }, idx) => (
        <DesktopMenuItemContainer key={idx}>
            <MenuItem key={idx} name={name} path={path} />
        </DesktopMenuItemContainer>
    ));

    return (
        <DesktopMenuContainer>
            {renderMenuItems}
        </DesktopMenuContainer>
    );
};

export default DesktopMenu;