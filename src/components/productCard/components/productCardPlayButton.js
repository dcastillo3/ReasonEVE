import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { ProductCardPlayButtonIcon, ProductCardPlayButton as ProductCardPlayButtonStyled } from '../productCardStyledComponents';

function ProductCardPlayButton() {
    return (
        <ProductCardPlayButtonStyled p={[0, 0]}>
            <ProductCardPlayButtonIcon component={PlayCircleIcon} />
        </ProductCardPlayButtonStyled>
    );
};

export default ProductCardPlayButton;