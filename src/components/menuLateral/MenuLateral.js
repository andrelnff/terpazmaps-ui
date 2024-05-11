import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InsightsIcon from '@mui/icons-material/Insights';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export function MenuLateral({ open, handleDrawerClose }) {
    const theme = useTheme();

    const drawerItems = [
        { text: 'Navegar', icon: <FmdGoodIcon /> },
        { text: 'Estatísticas', icon: <InsightsIcon /> },
        { text: 'Sobre', icon: <InfoIcon /> },
        { text: 'Créditos', icon: <DescriptionIcon /> },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#1976d2',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} sx={{ color: '#ffffff' }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {drawerItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: '#ffffff' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ color: '#ffffff' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
