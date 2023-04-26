import React from 'react';
import { logoName } from '../headerConsts';
import { LogoContainer, LogoTitle } from '../headerStyledComponents';
import { useNavigate } from 'react-router-dom';
import { SemanticButton } from '../../styled';
import { getRouteById } from '../../../routes/routesUtils';

function Logo({isDesktop}) {
    const navigate = useNavigate();
    const { path } = getRouteById(1);

    const handleLogoClick = () => {
        navigate(path);
    };

    return (
        <LogoContainer $isDesktop={isDesktop}>
            <SemanticButton onClick={handleLogoClick}>
                <LogoTitle>{logoName}</LogoTitle>
            </SemanticButton>
        </LogoContainer>
    );
};

export default Logo;