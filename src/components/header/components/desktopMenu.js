import React from 'react';
import { menuRoutes } from '../../../routes/routesConsts';
import { DesktopMenuContainer } from '../headerStyledComponents';
import MenuItem from './menuItem';
import { Box } from '../../styled';

function DesktopMenu() {
    const renderMenuItems = menuRoutes.map(({ name, path }, idx) => (
        <Box key={idx} m={[0, 15]}>
            <MenuItem key={idx} name={name} path={path} />
        </Box>
    ));

    return (
        <DesktopMenuContainer>
            {renderMenuItems}
        </DesktopMenuContainer>
    );
};

export default DesktopMenu;