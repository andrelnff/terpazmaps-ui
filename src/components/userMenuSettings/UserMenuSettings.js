import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {AuthContext, useAuth} from "../../context/authContext";
import {useNavigate} from "react-router-dom";


const settings = ['Perfil', 'Conta', 'Dashboard', 'Sair'];

const UserMenuSettings = ({ anchorElUser, handleOpenUserMenu, handleCloseUserMenu }) => {
    const { authData } = useContext(AuthContext);

    const navigate = useNavigate();
    const { logout } = useAuth();

    const userImage = authData && authData.userImage ? authData.userImage : null;


    const handleLogout = () => {
        console.log("tentei sair")
        logout();
        handleCloseUserMenu();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src= {userImage} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={setting === 'Sair' ? handleLogout : handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default UserMenuSettings;