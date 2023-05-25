import React, { useContext } from 'react';
import { CartIcon } from '../headerStyledComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { FlexBox, SemanticButton } from '../../styled';
import _ from 'lodash';
import { getRouteById } from '../../../routes/routesUtils';
import { Overlay, overlayProps } from '../../common';
import { useMediaQuery } from '../../../hooks';
import CartIconOverlay from './cartIconOverlay';
import CartSummaryTooltip from './cartSummaryTooltip';
import { CartContext } from '../../../context';

function UserMenu() {
    const { cart } = useContext(CartContext);
    const { path } = getRouteById(5);
    const { isDesktop } = useMediaQuery();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const cartItemCount = cart.length;
    const cartIcon = _.isEmpty(cart) ? ShoppingCartOutlinedIcon : ShoppingCartIcon;

    const handleCartClick = () => {
        navigate(path);
    };

    const renderCartSummaryTooltip = isDesktop && pathname !== path && (
        <CartSummaryTooltip 
            cart={cart} 
            isDesktop={isDesktop} 
            path={path}
            navigate={navigate}
        />
    );

    return (
        <FlexBox>
            {renderCartSummaryTooltip}
            
            <Overlay 
                overlayComponent={() => <CartIconOverlay cartItemCount={cartItemCount} />} 
                overlayPositionX={overlayProps.overlayPositionX.right}
                overlayPositionY={overlayProps.overlayPositionY.top}
            >
                <SemanticButton onClick={handleCartClick}>
                    <CartIcon component={cartIcon} />
                </SemanticButton>
            </Overlay>
        </FlexBox>
    );
};

export default UserMenu;