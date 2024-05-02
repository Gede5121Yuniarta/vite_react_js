import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductsCard from '../product-card';

export default function ProductsView() {
    // State untuk menyimpan data dari API
    const [priorities, setPriorities] = useState([]);
    // State untuk menangani loading
    const [loading, setLoading] = useState(true);
    // State untuk menangani error
    const [error, setError] = useState(null);

    // Gunakan useEffect untuk mengambil data saat komponen dimuat
    useEffect(() => {
        // Fungsi untuk mengambil data dari API
        const fetchPriorities = async () => {
            try {
                // Lakukan GET request ke API
                const response = await axios.get('https://simobile.singapoly.com/api/division-department');
                // Simpan data dari response API ke state
                setPriorities(response.data.datas);
            } catch (err) {
                // Tangani error jika terjadi
                setError(err);
            } finally {
                // Set loading ke false
                setLoading(false);
            }
        };

        // Panggil fungsi fetchPriorities
        fetchPriorities();
    }, []);

    // Tampilkan pesan loading jika data sedang diambil
    if (loading) {
        return <div>Loading...</div>;
    }

    // Tampilkan pesan error jika terjadi kesalahan
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Tampilkan komponen utama dengan data prioritas yang diperoleh dari API
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Menu Master Data Department
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={12}>
                    <ProductsCard
                        title="List Department"
                        list={priorities.map((priority) => ({
                            id: priority.id_division_target,
                            name: priority.division_department_name,
                        }))}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
