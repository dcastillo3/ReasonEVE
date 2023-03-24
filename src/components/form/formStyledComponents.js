import styled from 'styled-components';
import { FlexBoxColumn, Textarea } from '../styled';

const HiddenFormFieldContainer = styled(FlexBoxColumn)`
    display: none;
`;

const FormTextArea = styled(Textarea)`
    height: ${({theme}) => theme.spacing(20)};
    resize: vertical;
`;

export {
    HiddenFormFieldContainer,
    FormTextArea
};