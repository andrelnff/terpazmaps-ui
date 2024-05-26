import { useState, useCallback, useContext } from 'react';
import {usePolylineDrawer} from "./usePolylineDrawer";
import {MapContext} from "../context/mapContext";
import {useFiltros} from "../context/filtrosContext";

export function useMapCenter() {
    const { map } = useContext(MapContext);
    const { desativarTodosFiltros } = useFiltros();
    const [selectedId, setSelectedId] = useState(null);
    const { fetchStreets } = usePolylineDrawer();

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
        setSelectedId(id);
        centerMap(coordinates);
        fetchStreets(id);
        desativarTodosFiltros();
    }, [centerMap, desativarTodosFiltros, fetchStreets]);

    const handlePolygonClick = useCallback((mapData) => {
        const center = mapData.properties.Centro.coordinates;
        setSelectedId(mapData.properties.ID);
        handleMapSelect(mapData.properties.ID, center);
    }, [handleMapSelect]);

    return { handlePolygonClick, handleMapSelect, selectedId };
}
