import React from 'react';
import { Box, Button, FlexBoxColumn, Label } from '../../styled';

function ProductCardButtonMenu({prices}) {
    const renderPriceButtons = prices.map((price, idx) => (
        <FlexBoxColumn m={[2, 0]} key={idx}>
            <Label>{price.title}:</Label>
            <Button variant={'secondary'} m={[1, 0]} size={'small'}>{price.amount}</Button>
        </FlexBoxColumn>
    ));

    return (
        <Box>
            <FlexBoxColumn>
                {renderPriceButtons}
            </FlexBoxColumn>
        </Box>
    );
};

export default ProductCardButtonMenu;