import React, { useState } from 'react';
import { FlexBox } from '../../styled';
import _ from 'lodash';
import { ToolTip, tooltipProps } from '../../common';
import { useEffectAfterFirstRender } from '../../../hooks';
import { CartSummary } from '../../cartSummary';

function CartSummaryTooltip({ cart, isDesktop, path, navigate }) {
    const [showCartSummary, setShowCartSummary] = useState(false);

    const handleToggleCartSummary = () => {
        setShowCartSummary(!showCartSummary);
    };

    // Show cart tooltip when the cart is changed.
    useEffectAfterFirstRender(() => {
        if (!showCartSummary) setShowCartSummary(true);
    }, [cart]);

    return (
        <FlexBox>
            <ToolTip
                toolTipComponent={() => <CartSummary
                    handleToggleCartSummary={handleToggleCartSummary}
                    isDesktop={isDesktop}
                    cart={cart}
                    path={path}
                    navigate={navigate}
                />}
                variant={tooltipProps.variant.info}
                pointerDirection={tooltipProps.pointerDirection.top}
                pointerSize={tooltipProps.pointerSize.small}
                flipY={true}
                showToolTip={showCartSummary}
                handleToggleToolTip={handleToggleCartSummary}
            />
        </FlexBox>
    );
};

export default CartSummaryTooltip;