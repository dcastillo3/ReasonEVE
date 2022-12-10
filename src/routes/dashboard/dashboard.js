import React from 'react';
import axios from 'axios';
import { Form } from '../../components/form';
import { sanitizeFormData } from '../../utils/reactUtils';
import { addTrackForm } from './dashboardForms';

function Dashboard() {
    const handleAddTrack = async formData => {
        try {
            const trackData = sanitizeFormData(formData);
            let res = await axios.post('/api/tracks', trackData);

            if (!res?.data?.success) {
                const { err = {} } = res.data;

                console.error(err);
            } else if (res?.data?.success) {
                //success action
                console.log(res.data);
            };
        } catch (err) {
            console.error(err.response);
        };
    };

    return (
        <Form formParams={addTrackForm} handleSubmit={handleAddTrack} />
    );
};

export default Dashboard;