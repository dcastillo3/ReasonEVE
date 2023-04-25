import React, { useContext } from 'react';
import { ProductCardPlayButtonIcon, ProductCardPlayButton as ProductCardPlayButtonStyled } from '../productCardStyledComponents';
import { PlaylistContext } from '../../../context';
import { getPlayButtonIcon } from '../../../utils/reactUtils';

function ProductCardPlayButton({product}) {
    const { currTrack, trackPlaying, togglePlay } = useContext(PlaylistContext);
    const productCardPlayButtonIcon = getPlayButtonIcon(product, currTrack, trackPlaying);

    const handleClickPlayButton = () => togglePlay(product);

    return (
        <ProductCardPlayButtonStyled onClick={handleClickPlayButton} p={[0, 0]}>
            <ProductCardPlayButtonIcon component={productCardPlayButtonIcon} />
        </ProductCardPlayButtonStyled>
    );
};

export default ProductCardPlayButton;