import React, { useContext, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToolTip } from '../../common';
import { Button, FlexBox } from '../../styled';
import { CartContext, PlaylistContext } from '../../../context';
import { getCartButtonVariant } from '../../../utils/reactUtils';
import { AudioPlayerCartButtonIcon } from '../audioPlayerStyledComponents';
import AudioPlayerButtonMenu from './audioPlayerButtonMenu';

function AudioPlayerCartButton() {
    const { currTrack: product } = useContext(PlaylistContext);
    const { cart, addCartItem } = useContext(CartContext);
    const [showAudioPlayerCartButtonToolTip, setShowAudioPlayerCartButtonToolTip] = useState(false);
    const { productPricing = [] } = product;
    const buttonVariant = getCartButtonVariant(product, cart);

    const handleToggleAudioPlayerButtonToolTip = () => {
        setShowAudioPlayerCartButtonToolTip(!showAudioPlayerCartButtonToolTip);
    };

    const audioPlayerCartButton = (
        <Button
            onClick={() => addCartItem(productPricing[0], product)}
            variant={buttonVariant}
            m={[2]}
            size={'small'}
        >
            <AudioPlayerCartButtonIcon component={ShoppingCartIcon} />
        </Button>
    );

    const audioPlayerToolTipButton = (
        <ToolTip
            variant={'info'}
            pointerDirection={'down'}
            showToolTip={showAudioPlayerCartButtonToolTip}
            handleToggleToolTip={handleToggleAudioPlayerButtonToolTip}
            toolTipComponent={() => <AudioPlayerButtonMenu
                cart={cart}
                addCartItem={addCartItem}
                product={product}
                handleToggleToolTip={handleToggleAudioPlayerButtonToolTip}
            />}
        >
            <Button variant={buttonVariant} m={[2]} size={'small'}>
                <AudioPlayerCartButtonIcon component={ShoppingCartIcon} />
            </Button>
        </ToolTip>
    );

    const renderAudioPlayerCartButton = productPricing.length > 1 ? audioPlayerToolTipButton : audioPlayerCartButton;

    return (
        <FlexBox id="audio-player-cart-button">
            {renderAudioPlayerCartButton}
        </FlexBox>
    );
};

export default AudioPlayerCartButton;