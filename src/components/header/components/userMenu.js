import React, { useContext } from 'react';
import { CartIcon } from '../headerStyledComponents';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { FlexBox, SemanticButton } from '../../styled';
import { CartContext } from '../../../utils/context';
import _ from 'lodash';
import { getRouteById } from '../../../routes/routesUtils';

function UserMenu() {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const { path } = getRouteById(5);
    const cartIcon = _.isEmpty(cart) ? ShoppingCartOutlinedIcon : ShoppingCartIcon;

    const handleCartClick = () => {
        navigate(path);
    };

    return (
            <FlexBox>
                <SemanticButton onClick={handleCartClick}>
                    <CartIcon component={cartIcon} />
                </SemanticButton>
            </FlexBox>
    );
};

export default UserMenu;