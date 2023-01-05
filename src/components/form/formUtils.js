import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash/core';
import { Box, FlexBox, FlexBoxColumn, Input, Label, TextCaption } from '../styled';

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
                <FlexBoxColumn key={id} className="input-container">
                    <Label>{labelName}</Label>
                    <Input onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </FlexBoxColumn>
            )
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
            const uploadMessage = 'Drag or click to select files';
            const rootProps = getRootProps();
            const inputProps = getInputProps();

            const renderUploadContainer = (
                <Box className="upload-container" {...rootProps}>
                    <Input {...inputProps} {...additionalProps} />
                    <TextCaption className="upload-message">
                        {uploadMessage}
                    </TextCaption>
                </Box>
            );

            const renderUploadItems = !_.isEmpty(inputValue) && inputValue.map(file => (
                <Box key={file.name} className="upload-preview-item">
                    {file.name}
                </Box>
            ));

            const renderUploadPreview = !_.isEmpty(inputValue) && (
                <FlexBoxColumn className="upload-preview-container">
                    {renderUploadItems}
                </FlexBoxColumn>
            );

            const renderUploadErrors = !_.isEmpty(fileRejections) && fileRejections.map(({ file, errors }) => {
                const errorMessages = errors.map(e => (
                    <Box className="file-rejection-error-item" key={e.code}>
                        {e.message}
                    </Box>
                ));

                return (
                    <FlexBoxColumn key={file.path} className="file-rejection-container">
                        <Box className="file-rejection-item">
                            {file.path}
                        </Box>

                        <FlexBoxColumn>
                            {errorMessages}
                        </FlexBoxColumn>
                    </FlexBoxColumn>
                )
            }
            );

            return (
                <FlexBoxColumn key={id} className="input-container">
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
            }
        });
    };

    //Attach max files validation
    if(validations?.maxFiles) {
        const { maxFiles } = validations;
        
        validationProps = {maxFiles, ...validationProps}
    }

    return validationProps;
}

export {
    buildFormFields
};