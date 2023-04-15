import React from 'react';
import { ClickAwayListener } from '@mui/material';
import { Arrow, Box, Card, FlexBox } from '../../styled';
import { ToolTipArrowContainer, ToolTipComponentContainer, ToolTipContainer } from './tooltipStyledComponents';

function ToolTip({ children, toolTipComponent, variant, pointerDirection, pointerSize, showToolTip, handleToggleToolTip }) {
    const renderToolTip = showToolTip && (
        <ClickAwayListener onClickAway={handleToggleToolTip}>
            <ToolTipComponentContainer pointerDirection={pointerDirection} pointerSize={pointerSize}>
                <ToolTipArrowContainer pointerDirection={pointerDirection} pointerSize={pointerSize}>
                    <Arrow size={pointerSize} variant={variant} pointerDirection={pointerDirection} />
                </ToolTipArrowContainer>

                <Card $rounded={true} variant={variant} p={[2, 4]}>
                    {toolTipComponent()}
                </Card>
            </ToolTipComponentContainer>
        </ClickAwayListener>
    );

    return (
        <FlexBox>
            <ToolTipContainer>
                <Box onClick={handleToggleToolTip}>
                    {children}
                </Box>

                {renderToolTip}
            </ToolTipContainer>
        </FlexBox>
    );
};

export default ToolTip;