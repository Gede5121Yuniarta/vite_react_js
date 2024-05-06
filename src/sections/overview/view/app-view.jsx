import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppTasks from '../app-tasks';

export default function AppView() {
    const [priorities, setPriorities] = useState([]);

    useEffect(() => {
        const fetchPriorities = async () => {
            try {
                const response = await axios.get('https://simobile.singapoly.com/api/priority-issues');
                setPriorities(response.data.datas);
            } catch (error) {
                console.error('Error fetching priorities:', error);
            }
        };

        fetchPriorities();
    }, []);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Menu Master Data Priorities
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={12}>
                    <AppTasks
                        title="List Priorities"
                        list={priorities.map((item, index) => ({
                            id: item.id_priority,
                            number: index + 1, // Tambahkan nomor urut
                            name: item.priority_name,
                        }))}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
