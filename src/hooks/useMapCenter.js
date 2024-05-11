import { useState, useCallback } from 'react';

export function useMapCenter(map) {
    const [selectedId, setSelectedId] = useState(null);

    const centerMap = useCallback((coordinates) => {
        map.setCenter({ lat: coordinates[1], lng: coordinates[0] });
        map.setZoom(15);
    }, [map]);

    const handleMapSelect = useCallback((id, coordinates) => {
        setSelectedId(id);
        centerMap(coordinates);
    }, [centerMap]);

    const handlePolygonClick = useCallback((mapData) => {
        const center = mapData.properties.Centro.coordinates;
        handleMapSelect(mapData.properties.ID, center);
    }, [handleMapSelect]);

    return { handlePolygonClick, handleMapSelect, selectedId };
}
