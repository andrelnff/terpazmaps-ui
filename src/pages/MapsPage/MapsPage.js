import React, {useEffect, useState} from "react";
import {CustomAppBar} from "../../components/appBar/CustomAppBar";
import {MenuLateral} from "../../components/menuLateral/MenuLateral";
import GoogleMap from "../../components/googleMap/GoogleMap";
import {isTokenValid} from "../../service/authService";
import {useNavigate} from "react-router-dom";
import {useMapCenter} from "../../hooks/useMapCenter";
import StarRating from "../../components/rating/Rating";
import MenuInferior from "../../components/menuInferior/MenuInferior";

function MapsPage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { selectedMapId } = useMapCenter();

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
            <GoogleMap />
            <StarRating mapId={selectedMapId}></StarRating>
            <MenuInferior></MenuInferior>
        </div>
    );
}

export default MapsPage;