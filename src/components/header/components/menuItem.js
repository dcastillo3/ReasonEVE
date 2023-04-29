import React from 'react';
import { MenuItem as MenuItemStyled } from '../headerStyledComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import { SemanticButton } from '../../styled';

function MenuItem({name, path, callback}) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isActive = pathname === path;

    const handleMenuItemClick = path => {
        navigate(path);
        
        if(callback) callback();
    };

    return (
        <SemanticButton onClick={() => handleMenuItemClick(path)}>
            <MenuItemStyled $isActive={isActive}>
                {name}
            </MenuItemStyled>
        </SemanticButton>
    );
};

export default MenuItem;