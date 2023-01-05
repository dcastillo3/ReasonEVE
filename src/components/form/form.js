import React, { useState } from 'react';
import './form.css';
import { buildFormFields } from './formUtils';
import _ from 'lodash/core';
import { FlexBox, Form as StyledForm, Button } from '../styled';

function Form({formParams, handleSubmit}) {
    const inputData = formParams.inputs.reduce((prevVal, {id, defaultValue}) => ({...prevVal, [id]: defaultValue}), {});

    const [formFields, setFormFields] = useState(formParams.inputs);
    const [formData, setFormData] = useState(inputData);

    const handleChangeField = e => {
        const { name, value } = e.target;
        const newFormData = {
            ...formData,
            [name]: value
        };

        setFormData(newFormData);
    };

    const handleSubmitForm = e => {
        e.preventDefault();

        handleSubmit(formData);
    };

    const renderFormFields = (!_.isEmpty(formFields) && !_.isEmpty(formData))
        && buildFormFields(formFields, formData, handleChangeField);

    return (
        <FlexBox style={{justifyContent: 'center'}} className="form-container">
            <StyledForm onSubmit={handleSubmitForm}>
                {renderFormFields}
                <Button type="submit">Add Track</Button>
            </StyledForm>
        </FlexBox>
    );
};

export default Form;