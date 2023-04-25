import React, { useContext } from 'react';
import { CartLineItemPlayButtonIcon, CartLineItemPlayButton as CartLineItemPlayButtonStyled } from '../cartStyledComponents';
import { PlaylistContext } from '../../../../context';
import { getPlayButtonIcon } from '../../../../utils/reactUtils';

function CartLineItemPlayButton({product}) {
    const { currTrack, trackPlaying, togglePlay } = useContext(PlaylistContext);
    const productCardPlayButtonIcon = getPlayButtonIcon(product, currTrack, trackPlaying);

    const handleClickPlayButton = () => togglePlay(product);

    return (
        <CartLineItemPlayButtonStyled onClick={handleClickPlayButton} p={[0, 0]}>
            <CartLineItemPlayButtonIcon component={productCardPlayButtonIcon} />
        </CartLineItemPlayButtonStyled>
    );
};

export default CartLineItemPlayButton;