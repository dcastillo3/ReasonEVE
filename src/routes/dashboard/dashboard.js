import React from 'react';
import axios from 'axios';
import { Form } from '../../components/form';
import { sanitizeFormData } from '../../utils/reactUtils';
import { addTrackForm } from './dashboardForms';

function Dashboard() {
    const handleAddTrack = async formData => {
        try {
            const trackData = sanitizeFormData(formData);
            let res = await axios.post('/api/addTrack', trackData);

            if(res?.data?.success) {
                //Success action
                console.log(res.data.message);
            }
        } catch (err) {
            console.error(err.response);
        }
    };

    return (
        <Form formParams={addTrackForm} handleSubmit={handleAddTrack} />
    );
};

export default Dashboard;