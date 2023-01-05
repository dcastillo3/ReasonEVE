import styled from 'styled-components';
import { label } from '../styledConsts';
import { buildTypography } from '../styledUtils';

export const Form = styled.form`
`;

export const Label = styled.label`
    ${(props) => buildTypography(props, label)}
`;

export const Input = styled.input`
    
`;