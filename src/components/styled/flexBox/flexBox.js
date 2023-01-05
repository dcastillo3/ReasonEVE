import styled from 'styled-components';
import { buildFlexBox } from '../styledUtils';

export const FlexBox = styled.div`
    display: flex;
    flex-direction: row;
    
    /* Style overrides last */
    ${buildFlexBox}
`;

export const FlexBoxColumn = styled(FlexBox)`
    flex-direction: column;
`;