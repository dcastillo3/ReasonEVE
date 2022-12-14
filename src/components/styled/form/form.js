import styled from 'styled-components';

export const Form = styled.form`
    ${props => props.position ? `position: ${props.position}` : ''}
`;