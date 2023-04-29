import React, { useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import { Box, Card } from '../../styled';
import { ModalContainer } from './modalStyledComponents';

function Modal({children, modalComponent, variant}) {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const renderModal = showModal && (
        <ClickAwayListener onClickAway={handleToggleModal}>
            <Card $rounded={true} $variant={variant} $p={[2, 4]}>
                {modalComponent()}
            </Card>
        </ClickAwayListener>
    );

    return (
        <ModalContainer>
            <Box onClick={handleToggleModal}>
                {children}
            </Box>
            
            {renderModal}
        </ModalContainer>
    );
};

export default Modal;