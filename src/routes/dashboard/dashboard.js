import React from 'react';
import axios from 'axios';
import { Form } from '../../components/form';
import { sanitizeFormData } from '../../utils/reactUtils';
import { addTrackForm } from './dashboardForms';
import { Box, Card, Button, Text, TextSmall, TextCaption, Title, TitleSmall, TitleMedium } from '../../components/styled';

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
        <>
            <Form formParams={addTrackForm} handleSubmit={handleAddTrack} />

            <Box>
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

            <Card hover>
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

            <Card variant="secondary">
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

            <Card variant="success">
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

            <Card variant="warning">
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

            <Card variant="error">
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

            <Card variant="info">
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
        </>
    );
};

export default Dashboard;