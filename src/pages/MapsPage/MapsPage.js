import React, {useEffect, useState} from "react";
import {CustomAppBar} from "../../components/appBar/CustomAppBar";
import {MenuLateral} from "../../components/menuLateral/MenuLateral";
import GoogleMap from "../../components/GoogleMap";
import {isTokenValid} from "../../service/authService";
import {useNavigate} from "react-router-dom";
import {FiltroRuas} from "../../components/filtroRuas/FiltroRuas";
import SelectRegion from "../../components/selectRegion/SelectRegion";

function MapsPage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const validateAuth = async () => {
            const isValid = await isTokenValid();
            if (!isValid) {
                navigate('/login');
            }
        };

        validateAuth();
    }, [navigate]);

    return (
        <div className="App">
            <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <MenuLateral open={open} handleDrawerClose={handleDrawerClose} />
            <SelectRegion/>
            <FiltroRuas/>
            <GoogleMap />
        </div>
    );
}

export default MapsPage;