import React, { useContext } from 'react';
import { CartIcon } from '../headerStyledComponents';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { FlexBox } from '../../styled';
import { CartContext } from '../../../utils/context';
import _ from 'lodash';

function UserMenu() {
    const { cart } = useContext(CartContext);
    const cartIcon = _.isEmpty(cart) ? ShoppingCartOutlinedIcon : ShoppingCartIcon;

    return (
            <FlexBox m={[0, 0, 0, 15]}>
                <NavLink to={'/cart'}>
                    <CartIcon component={cartIcon} />
                </NavLink>
            </FlexBox>
    );
};

export default UserMenu;