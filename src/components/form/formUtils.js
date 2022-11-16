import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash/core';

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
                <div key={idx} className="row-container">
                    {inputStack}
                </div>
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
    const label = `${labelName}:`;
    const inputValue = formData[id];

    switch(inputType) {
        case 'text': {
            return (
                <div key={id} className="input-container">
                    <label>{label}</label>
                    <input onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </div>
            )
        };

        // case 'number': {
        //     return (
        //         <div key={id} className="input-container">
        //             <label>{label}</label>
        //             <input onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
        //         </div>
        //     )
        // };
        
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
                <div className="upload-container" {...rootProps}>
                    <input {...inputProps} {...additionalProps} />
                    <div className="upload-message">
                        {uploadMessage}
                    </div>
                </div>
            );

            const renderUploadItems = !_.isEmpty(inputValue) && inputValue.map(file => (
                <div key={file.name} className="upload-preview-item">
                    {file.name}
                </div>
            ));

            const renderUploadPreview = !_.isEmpty(inputValue) && (
                <div className="upload-preview-container">
                    {renderUploadItems}
                </div>
            );

            const renderUploadErrors = !_.isEmpty(fileRejections) && fileRejections.map(({ file, errors }) => {
                const errorMessages = errors.map(e => (
                    <div className="file-rejection-error-item" key={e.code}>
                        {e.message}
                    </div>
                ));

                return (
                    <div key={file.path} className="file-rejection-container">
                        <div className="file-rejection-item">
                            {file.path}
                        </div>

                        <div className="file-rejection-error-container">
                            {errorMessages}
                        </div>
                    </div>
                )
            }
            );

            return (
                <div key={id} className="input-container">
                    <label>{label}</label>
                    {renderUploadContainer}

                    {renderUploadPreview}

                    {renderUploadErrors}
                </div>
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