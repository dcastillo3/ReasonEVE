import styled from "styled-components";
import { FlexBox, Text, Title } from "../styled";
import { Icon } from "@mui/material";

const HeaderContainer = styled(FlexBox)`
    align-items: center;
`;

const LogoContainer = styled(FlexBox)`
    flex: 1;
`;

const LogoTitle = styled(Title)`
    font-size: ${({theme}) => theme.typography.h3.fontSize};
`;

const MenuContainer = styled(FlexBox)`
    justify-content: space-between;
    width: ${({theme}) => theme.spacing(163)};
`;

const MenuItem = styled(Text)`
    ${({active}) => active && 'font-weight: 600;'}
`;

const CartIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.h3.fontSize} !important;
    position: relative !important;
    top: 3px !important;
`;

export {
    HeaderContainer,
    LogoContainer,
    LogoTitle,
    MenuContainer,
    MenuItem,
    CartIcon
};