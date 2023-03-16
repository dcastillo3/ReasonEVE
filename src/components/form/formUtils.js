import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash/core';
import { Box, Card, DragAndDrop, FlexBox, FlexBoxColumn, Input, Label, TextCaption, TextSmall } from '../styled';
import { uploadMessage } from './formConsts';

const buildFormFields = (formFields, formData, handleChangeField) => {
    const renderedFormFields = [];
    const fieldsPerRow = 2;
    let inputStack = [];
    let idx = 0;

    while (idx < formFields.length) {
        const formField = formFields[idx];
        const input = getInput(formField, formData, handleChangeField);

        inputStack.push(input);

        const rowIsFull = inputStack.length === fieldsPerRow;
        const lastFormField = (idx === (renderedFormFields.length - 1));
        
        if(rowIsFull || lastFormField) {
            const formRow = (
                <FlexBox itemsPerRow={fieldsPerRow} key={idx}>
                    {inputStack}
                </FlexBox>
            );

            inputStack = [];
            renderedFormFields.push(formRow);
        };

        idx += 1;
    };

    return renderedFormFields;
};

const getInput = (formField, formData, handleChangeField) => {
    const { 
        id, 
        labelName, 
        inputType,
        additionalProps,
        validations
    } = formField;
    const inputValue = formData[id];

    switch(inputType) {
        case 'text': {
            return (
                <FlexBoxColumn m={[5]} key={id}>
                    <Label>{labelName}</Label>
                    <Input onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </FlexBoxColumn>
            );
        };
        
        case 'upload': {
            //format data for handleChangeField
            const onDrop = useCallback(acceptedFiles => {
                const mockEvent = {
                    target: {
                        name: id,
                        value: acceptedFiles
                    }
                };

                return handleChangeField(mockEvent);
            });
            const validationProps = getValidationProps(validations);
            const dropZoneParams = {
                onDrop,
                ...validationProps
            };
            const {
                fileRejections,
                getRootProps,
                getInputProps
            } = useDropzone(dropZoneParams);
            const rootProps = getRootProps();
            const inputProps = getInputProps();

            const renderUploadContainer = (
                <DragAndDrop p={[5]} hover variant="backgroundLight" {...rootProps}>
                    <Input {...inputProps} {...additionalProps} />
                    <TextCaption>
                        {uploadMessage}
                    </TextCaption>
                </DragAndDrop>
            );

            const renderUploadItems = !_.isEmpty(inputValue) && inputValue.map(file => (
                <Box m={[1, 0]} p={[1, 2]} key={file.name}>
                    {file.name}
                </Box>
            ));

            const renderUploadPreview = !_.isEmpty(inputValue) && (
                <Card m={[2]} variant="success">
                    <FlexBoxColumn>
                        {renderUploadItems}
                    </FlexBoxColumn>
                </Card>
            );

            const renderUploadErrors = !_.isEmpty(fileRejections) && fileRejections.map(({ file, errors }) => {
                const errorMessages = errors.map(e => (
                    <Box m={[1, 0]} p={[1, 2]} key={e.code}>
                        <TextSmall>
                            {e.message}
                        </TextSmall>
                    </Box>
                ));

                return (
                    <Card m={[2]} variant="warning">
                        <FlexBoxColumn key={file.path}>
                            <Box m={[1, 0]} p={[1, 2]}>
                                {file.path}
                            </Box>

                            <FlexBoxColumn>
                                {errorMessages}
                            </FlexBoxColumn>
                        </FlexBoxColumn>
                    </Card>
                );
            });

            return (
                <FlexBoxColumn m={[5]} key={id}>
                    <Label>{labelName}</Label>
                    {renderUploadContainer}

                    {renderUploadPreview}

                    {renderUploadErrors}
                </FlexBoxColumn>
            );
        };
    };
};

const getValidationProps = validations => {
    let validationProps = {};

    //Attach file type validation
    if(validations?.fileTypes?.length) {
        validations.fileTypes.forEach(validation => {
            validationProps.accept = {
                [validation]: [],
                ...validationProps.accept
            };
        });
    };

    //Attach max files validation
    if(validations?.maxFiles) {
        const { maxFiles } = validations;
        
        validationProps = {maxFiles, ...validationProps}
    };

    return validationProps;
};

export {
    buildFormFields
};