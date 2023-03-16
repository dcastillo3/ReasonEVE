import styled from 'styled-components';
import { FlexBox } from '../../styled';

const HeadingContainer = styled(FlexBox)`
    align-items: center;
    width: ${({theme}) => theme.spacing(88)};
`;

export {
    HeadingContainer
};