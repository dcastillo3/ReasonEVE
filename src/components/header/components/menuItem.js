import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '../../styled';
import { MenuItem as MenuItemStyled } from '../headerStyledComponents';

function MenuItem({name, path}) {
    const renderMenuItem = ({isActive}) => (
        <MenuItemStyled active={isActive}>
            {name}
        </MenuItemStyled>
    );

    return (
        <Box>
            <NavLink to={path}>
                {renderMenuItem}
            </NavLink>
        </Box>
    );
};

export default MenuItem;