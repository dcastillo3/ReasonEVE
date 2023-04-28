import React, { useContext, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToolTip } from '../../common';
import { CartContext, PlaylistContext } from '../../../context';
import { getCartButtonText, getCartButtonVariant } from '../../../utils/reactUtils';
import { AudioPlayerCartButtonContainer, AudioPlayerCartButtonIcon, AudioPlayerCartCustomButton } from '../audioPlayerStyledComponents';
import AudioPlayerButtonMenu from './audioPlayerButtonMenu';
import { useMediaQuery } from '../../../hooks';

function AudioPlayerCartButton() {
    const { currTrack: product } = useContext(PlaylistContext);
    const { cart, addCartItem } = useContext(CartContext);
    const { isDesktop } = useMediaQuery();
    const [showAudioPlayerCartButtonToolTip, setShowAudioPlayerCartButtonToolTip] = useState(false);
    const { productPricing = [] } = product;
    const buttonVariant = getCartButtonVariant(product, cart);
    const buttonText = getCartButtonText(product, cart);

    const handleToggleAudioPlayerButtonToolTip = () => {
        setShowAudioPlayerCartButtonToolTip(!showAudioPlayerCartButtonToolTip);
    };

    const buttonIcon = (
        <AudioPlayerCartButtonIcon component={ShoppingCartIcon} />
    );

    const renderButtonContent = isDesktop ? buttonText : buttonIcon;

    const audioPlayerCartButton = (
        <AudioPlayerCartCustomButton
            onClick={() => addCartItem(productPricing[0], product)}
            variant={buttonVariant}
            m={[2]}
            size={'small'}
        >
            {renderButtonContent}
        </AudioPlayerCartCustomButton>
    );

    const audioPlayerToolTipButton = (
        <ToolTip
            variant={'info'}
            pointerDirection={'left'}
            showToolTip={showAudioPlayerCartButtonToolTip}
            handleToggleToolTip={handleToggleAudioPlayerButtonToolTip}
            toolTipComponent={() => <AudioPlayerButtonMenu
                cart={cart}
                addCartItem={addCartItem}
                product={product}
                handleToggleToolTip={handleToggleAudioPlayerButtonToolTip}
            />}
        >
            <AudioPlayerCartCustomButton variant={buttonVariant} size={'small'}>
                {renderButtonContent}
            </AudioPlayerCartCustomButton>
        </ToolTip>
    );

    const renderAudioPlayerCartButton = productPricing.length > 1 ? audioPlayerToolTipButton : audioPlayerCartButton;

    return (
        <AudioPlayerCartButtonContainer id="audio-player-cart-button">
            {renderAudioPlayerCartButton}
        </AudioPlayerCartButtonContainer>
    );
};

export default AudioPlayerCartButton;