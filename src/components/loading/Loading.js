import React from 'react';
import { useLoading } from '../../context/loadingContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loading = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 10000,
            }}
        >
            <CircularProgress size={200} thickness={4} />
        </Box>
    );
};
