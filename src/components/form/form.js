import React, { useState } from 'react';
import './form.css';
import { buildFormFields } from './formUtils';
import _ from 'lodash/core';

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
        <div className="form-container">
            <form onSubmit={handleSubmitForm} className="add-track-form">
                {renderFormFields}
                <button className="form-submit" type="submit">Add Track</button>
            </form>
        </div>
    );
};

export default Form;