import React, { useContext, useEffect } from 'react';
import { Box } from '../../styled';
import { CartContext } from '../../../context';

function Purchased() {
    const { clearCart } = useContext(CartContext);

    useEffect(() => {        
        clearCart();
    }, []);

    return (
        <Box p={[0, 8]}>
            Thank you for your purchase!
        </Box>
    );
};

export default Purchased;