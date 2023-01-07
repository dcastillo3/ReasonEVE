import styled from 'styled-components';
import { Card } from '../box/box';
import { label } from '../styledConsts';
import { buildTypography } from '../styledUtils';

export const Form = styled.form`
`;

export const Label = styled.label`
    ${(props) => buildTypography(props, label)}
`;

export const Input = styled.input`
    
`;

export const DragAndDrop = styled(Card)`
    border: dashed 1px rgb(54 54 54);
    cursor: pointer;
`;