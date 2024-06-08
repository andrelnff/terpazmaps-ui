import {useCallback, useState} from 'react';
import {usePolylineDrawer} from "./usePolylineDrawer";
import {useMap} from "../context/mapContext";
import {useFiltros} from "../context/filtrosContext";

export function useMapCenter() {
    const { desativarTodosFiltros } = useFiltros();
    const { fetchStreets } = usePolylineDrawer();
    const { map, toggleDrawer, setSelectedMap } = useMap();
    const [selectedMapId, setSelectedMapId] = useState(null);

    const centerMap = useCallback((targetCoordinates) => {
        if (map) {
            const currentCoordinates = map.getCenter();
            const stepLat = (targetCoordinates[1] - currentCoordinates.lat()) / 100;
            const stepLng = (targetCoordinates[0] - currentCoordinates.lng()) / 100;
            let i = 0;
            const intervalId = setInterval(() => {
                if (i < 100) {
                    const newLat = currentCoordinates.lat() + i * stepLat;
                    const newLng = currentCoordinates.lng() + i * stepLng;
                    map.setCenter({ lat: newLat, lng: newLng });
                    i++;
                } else {
                    clearInterval(intervalId);
                }
            }, 10);
            map.setZoom(15);
        }
    }, [map]);

    const handleMapSelect = useCallback((id, coordinates) => {
        setSelectedMap(id);
        centerMap(coordinates);
        fetchStreets(id).then(r => {
            desativarTodosFiltros();
            toggleDrawer('right', true);
            setSelectedMapId(id);
        });
    }, [centerMap, desativarTodosFiltros, fetchStreets, toggleDrawer]);

    const handlePolygonClick = useCallback((mapData) => {
        const center = mapData.properties.Centro.coordinates;
        handleMapSelect(mapData.properties.ID, center);
    }, [handleMapSelect]);

    return { handlePolygonClick, handleMapSelect, selectedMapId };
}
