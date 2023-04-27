import styled from "styled-components";
import { FlexBox, FlexBoxColumn, Box, Text, Title, Card } from "../styled";
import { Icon } from "@mui/material";

const HeaderContainer = styled(Card)`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${({theme}) => theme.zIndex.appBar};
`;

const HeaderFlexBoxContainer = styled(FlexBox)`
    align-items: center;
    
    ${({$isDesktop}) => !$isDesktop && `justify-content: space-between;`}
`;

const LogoContainer = styled(FlexBox)`
    ${({$isDesktop}) => $isDesktop && `flex: 1;`}
`;

const LogoTitle = styled(Title)`
    font-size: ${({theme}) => theme.typography.h3.fontSize};
`;

const MenuContainer = styled(Box)`
`;

const DesktopMenuContainer = styled(FlexBox)`
`;

const MobileMenuContainer = styled(FlexBoxColumn)`
`;

const MenuItem = styled(Text)`
    ${({isActive}) => isActive && 'font-weight: 600;'}
`;

const CartIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.h3.fontSize} !important;
`;

const MenuIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.h3.fontSize} !important;
    position: relative !important;
    top: 3px !important;
`;

const MobileMenuItemsContainer = styled(Card)`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: ${({theme}) => theme.spacing(50)};
    z-index: ${({theme}) => theme.zIndex.drawer};
`;

const MobileMenuItemContainer = styled(Box)`
    border-bottom: solid 1px ${({theme, borderVariant}) => theme.palette[borderVariant].main};
`;

export {
    HeaderContainer,
    LogoContainer,
    LogoTitle,
    MenuContainer,
    DesktopMenuContainer,
    MobileMenuContainer,
    MenuItem,
    CartIcon,
    MenuIcon,
    MobileMenuItemsContainer,
    MobileMenuItemContainer,
    HeaderFlexBoxContainer
};