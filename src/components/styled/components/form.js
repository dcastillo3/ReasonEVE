import styled from 'styled-components';
import { Card } from './box';
import { body2, label } from '../styledConsts';
import { buildTypography } from '../styledUtils';

export const Form = styled.form`
`;

export const Label = styled.label`
    ${(props) => buildTypography(props, label)}
`;

export const Input = styled.input`
    padding: ${({theme}) => theme.spacing(2)};
    border-radius: ${({theme}) => theme.spacing(1)};
    border: solid 1px ${({theme}) => theme.palette.info.main};

    ${(props) => buildTypography(props, body2)}
`;

export const Textarea = styled.textarea`
    padding: ${({theme}) => theme.spacing(2)};
    border-radius: ${({theme}) => theme.spacing(1)};
    border: solid 1px ${({theme}) => theme.palette.info.main};

    ${(props) => buildTypography(props, body2)}
`;

export const Select = styled.select`
    padding: ${({theme}) => theme.spacing(2)};
    border-radius: ${({theme}) => theme.spacing(1)};
    border: solid 1px ${({theme}) => theme.palette.info.main};

    ${(props) => buildTypography(props, body2)}
`;

export const DragAndDrop = styled(Card)`
    border-radius: ${({theme}) => theme.spacing(1)};
    border: dashed 1px ${({theme}) => theme.palette.info.main};
    cursor: pointer;
`;