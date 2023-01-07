import React, { useState } from 'react';
import { buildFormFields } from './formUtils';
import _ from 'lodash/core';
import { FlexBox, Form as StyledForm, Button, Card } from '../styled';

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
        <Card variant="backgroundLight">
            <FlexBox style={{ justifyContent: 'center' }}>
                <StyledForm onSubmit={handleSubmitForm}>
                    {renderFormFields}
                    <Button m={[5]} type="submit">Add Track</Button>
                </StyledForm>
            </FlexBox>
        </Card>
    );
};

export default Form;