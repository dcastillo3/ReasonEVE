import React from 'react';
import axios from 'axios';
import { Form } from '../../form';
import { buildFormData } from '../../../utils/reactUtils';
import { addTrackForm } from './dashboardForms';
import { Box, Card, Button, Text, TextSmall, TextCaption, Title, TitleSmall, TitleMedium } from '../../styled';
import { apis } from '../../../utils/consts';

function Dashboard() {
    const handleAddTrack = async trackData => {
        try {
            const formData = buildFormData(trackData);
            let res = await axios.post(apis.tracks, formData);

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
        <Box>
            <Form formParams={addTrackForm} handleSubmit={handleAddTrack} />

            <Box p={[3, 5]} m={[0, 8]}>
                <Text>
                    Box Text
                </Text>

                <TextSmall>
                    Box TextSmall
                </TextSmall>

                <TextCaption>
                    Box Text Caption
                </TextCaption>

                <Title>
                    Box Title
                </Title>
                
                <TitleMedium>
                    Box TitleMedium
                </TitleMedium>

                <TitleSmall>
                    Box TitleSmall
                </TitleSmall>
            </Box>

            <Card p={[3, 5]} m={[0, 8]} hover>
                <Text>
                    Card Text
                </Text>

                <TextSmall>
                    Box TextSmall
                </TextSmall>

                <TextCaption>
                    Card Text Caption
                </TextCaption>

                <Title>
                    Card Title
                </Title>
                
                <TitleMedium>
                    Card TitleMedium
                </TitleMedium>

                <TitleSmall>
                    Card TitleSmall
                </TitleSmall>
            </Card>

            <Card p={[3, 5]} m={[0, 8]} variant="secondary">
                <Text>
                    Card Text
                </Text>

                <TextSmall>
                    Box TextSmall
                </TextSmall>

                <TextCaption>
                    Card Text Caption
                </TextCaption>

                <Title>
                    Card Title
                </Title>
                
                <TitleMedium>
                    Card TitleMedium
                </TitleMedium>

                <TitleSmall>
                    Card TitleSmall
                </TitleSmall>
            </Card>

            <Card p={[3, 5]} m={[0, 8]} variant="success">
                <Text>
                    Card Text
                </Text>

                <TextSmall>
                    Box TextSmall
                </TextSmall>

                <TextCaption>
                    Card Text Caption
                </TextCaption>

                <Title>
                    Card Title
                </Title>
                
                <TitleMedium>
                    Card TitleMedium
                </TitleMedium>

                <TitleSmall>
                    Card TitleSmall
                </TitleSmall>
            </Card>

            <Card p={[3, 5]} m={[0, 8]} variant="warning">
                <Text>
                    Card Text
                </Text>

                <TextSmall>
                    Box TextSmall
                </TextSmall>

                <TextCaption>
                    Card Text Caption
                </TextCaption>

                <Title>
                    Card Title
                </Title>
                
                <TitleMedium>
                    Card TitleMedium
                </TitleMedium>

                <TitleSmall>
                    Card TitleSmall
                </TitleSmall>
            </Card>

            <Card p={[3, 5]} m={[0, 8]} variant="error">
                <Text>
                    Card Text
                </Text>

                <TextSmall>
                    Box TextSmall
                </TextSmall>

                <TextCaption>
                    Card Text Caption
                </TextCaption>

                <Title>
                    Card Title
                </Title>
                
                <TitleMedium>
                    Card TitleMedium
                </TitleMedium>

                <TitleSmall>
                    Card TitleSmall
                </TitleSmall>
            </Card>

            <Card p={[3, 5]} m={[0, 8]} variant="info">
                <Text>
                    Card Text
                </Text>

                <TextSmall>
                    Box TextSmall
                </TextSmall>

                <TextCaption>
                    Card Text Caption
                </TextCaption>

                <Title>
                    Card Title
                </Title>
                
                <TitleMedium>
                    Card TitleMedium
                </TitleMedium>

                <TitleSmall>
                    Card TitleSmall
                </TitleSmall>
            </Card>

            <Box p={[3, 0]} m={[0, 8]}>
                <Button>
                    Button
                </Button>

                <Button variant="secondary">
                    Button
                </Button>

                <Button variant="success">
                    Button
                </Button>

                <Button variant="warning">
                    Button
                </Button>

                <Button variant="error">
                    Button
                </Button>

                <Button variant="info">
                    Button
                </Button>
            </Box>
        </Box>
    );
};

export default Dashboard;