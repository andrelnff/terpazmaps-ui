import { useState, useCallback, useContext } from 'react';import {usePolylineDrawer} from "./usePolylineDrawer";
import {MapContext} from "../context/mapContext";
import {useFiltros} from "../context/filtrosContext";

export function useMapCenter() {
    const { map } = useContext(MapContext);
    const { desativarTodosFiltros } = useFiltros();
    const [selectedId, setSelectedId] = useState(null);
    const { fetchStreets } = usePolylineDrawer();

    const centerMap = useCallback((coordinates) => {
        if (map) {
            map.setCenter({ lat: coordinates[1], lng: coordinates[0] });
            map.setZoom(15);
        }
    }, [map]);

    const handleMapSelect = useCallback((id, coordinates) => {
        setSelectedId(id);
        centerMap(coordinates);
    }, [centerMap]);

    const handlePolygonClick = useCallback((mapData) => {
        const center = mapData.properties.Centro.coordinates;
        handleMapSelect(mapData.properties.ID, center);
        fetchStreets(mapData.properties.ID);
        desativarTodosFiltros();
    }, [handleMapSelect, fetchStreets, desativarTodosFiltros]);

    return { handlePolygonClick, handleMapSelect, selectedId };
}
