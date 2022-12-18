import styled from 'styled-components';
import { buildStyles } from '../styledUtils';

export const Grid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    /* Style overrides last */
    ${buildStyles}
`;

export const GridColumn = styled(Grid)`
    flex-direction: column;
`;