import styled from 'styled-components';
import { Box, FlexBox } from '../../styled';
import { buildToolTipArrowStyle, buildToolTipContainerStyle } from './tooltipUtils';

const ToolTipContainer = styled(Box)`
    position: relative;
`;

const ToolTipComponentContainer = styled(FlexBox)`
    position: absolute;

    /* Style overrides last */
    ${buildToolTipContainerStyle}
`;

const ToolTipArrowContainer = styled(Box)`
    position: absolute;
    align-self: flex-end;

    /* Style overrides last */
    ${buildToolTipArrowStyle}
`;

export {
    ToolTipContainer,
    ToolTipComponentContainer,
    ToolTipArrowContainer
};