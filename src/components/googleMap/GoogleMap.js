// src/components/googleMap/GoogleMap.js
import React, {useEffect, useRef} from "react";
import DrawingManager from "../drawingManager/DrawingManager";
import SelectRegion from "../selectRegion/SelectRegion";
import {FiltroRuas} from "../filtroRuas/FiltroRuas";
import {useMap} from "../../context/mapContext";

function GoogleMap() {
    const { setMap, map, setSelectedMap } = useMap();
    const mapRef = useRef(null);

    useEffect(() => {
        if (window.google && window.google.maps && !map) {
            const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -1.4031, lng: -48.4307 },
                disableDefaultUI: true,
                zoom: 13,
            });

            setMap(mapInstance);
        }
    }, [setMap, map]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mapRef.current && !mapRef.current.contains(event.target)) {
                setSelectedMap(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setSelectedMap]);

    return (
        <div style={{ position: 'relative' }} ref={mapRef}>
            <div id="map" style={{ width: '100%', height: '100vh' }}>
                {map && <DrawingManager />}
            </div>
            <SelectRegion/>
            <FiltroRuas/>
        </div>
    );
}

export default GoogleMap;