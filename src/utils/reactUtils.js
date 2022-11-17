import _ from 'lodash/core';

const sanitizeFormData = formData => {
    const sanitizedFormData = new FormData();
    const formDataFiles = {};

    //Attach all fields to FormData instance
    for(let field in formData) {
        const value = formData[field];
        const isFile = checkIfValueIsFiles(value);

        //Store and attach files last to populate req.body with other fields first
        if (isFile) formDataFiles[field] = value;
        else sanitizedFormData.append(field, value);
    };

    //Attach all File instances under same name for multer readability
    if (!_.isEmpty(formDataFiles)) {
        for(let field in formDataFiles) {
            let value = formDataFiles[field];

            value.forEach(file => {
                sanitizedFormData.append(field, file);
            })
        }
    }

    return sanitizedFormData;
};

const checkIfValueIsFiles = (value) =>
    Array.isArray(value) && value.length && value.every(item => item instanceof File);

export {
    sanitizeFormData
};