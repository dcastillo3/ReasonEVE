import React from 'react';
import { Button, FlexBox } from '../../styled';

function Switcher({ items, handleChooseItem, activeItem, itemProp }) {
    const activeItemName = activeItem[itemProp];

    const renderSwitcherItems = items.map((item, idx) => {
        //Displays an array of objects
        const itemName = item[itemProp];
        const buttonVariant = itemName === activeItemName ? 'secondary' : 'background';
        const handleSwitcherClick = itemName === activeItemName ? null : () => handleChooseItem(item);

        return (
            <Button key={idx} $size={'small'} $variant={buttonVariant} onClick={handleSwitcherClick}>
                {itemName}
            </Button>
        );
    });

    return (
        <FlexBox>
            {renderSwitcherItems}
        </FlexBox>
    );
};

export default Switcher;