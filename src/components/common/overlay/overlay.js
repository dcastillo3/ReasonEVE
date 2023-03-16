import React from 'react';
import { FlexBox } from '../../styled';
import { OverlayContainer } from './overlayStyledComponents';

function Overlay({ children, overlayComponent, center = false }) {
    return (
        <FlexBox center={center}>
            <OverlayContainer>
                {overlayComponent()}
            </OverlayContainer>
            {children}
        </FlexBox>
    );
};

export default Overlay;