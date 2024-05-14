import React, {useEffect, useState} from "react";
import {CustomAppBar} from "../../components/appBar/CustomAppBar";
import {MenuLateral} from "../../components/menuLateral/MenuLateral";
import SelectorRegion from "../../components/selectorRegion/SelectorRegion";
import GoogleMap from "../../components/GoogleMap";
import {isTokenValid} from "../../service/authService";
import {useNavigate} from "react-router-dom";

function MapsPage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedMapId, setSelectedMapId] = useState('');
    const [idNameList] = useState([
        { id: 'map1', name: 'Mapa 1' },
        { id: 'map2', name: 'Mapa 2' },
    ]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMapSelectionChange = (id) => {
        setSelectedMapId(id);
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
            <SelectorRegion
                idList={idNameList}
                onSelectionChange={handleMapSelectionChange}
            />
            <GoogleMap selectedMapId={selectedMapId} />
        </div>
    );
}

export default MapsPage;