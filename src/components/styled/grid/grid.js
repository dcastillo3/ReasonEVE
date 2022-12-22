import styled from 'styled-components';

export const Grid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const GridColumn = styled(Grid)`
    flex-direction: column;
`;