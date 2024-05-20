import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
    const [idNameList, setIdNameList] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);
    const [map, setMapState] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filtros, setFiltros] = useState([]); // Estado global para filtros

    const desativarTodosFiltros = useCallback(() => {
        setFiltros(filtrosAnteriores => filtrosAnteriores.map(filtro => ({
            ...filtro,
            ativo: false
        })));
    }, [setFiltros]); // Atualiza para usar setFiltros


    const updateIdNameList = useCallback((newList) => {
        setIdNameList(newList);
    }, []);

    const centerMapOnRegion = useCallback((region) => {
        if (map && region) {
            map.setCenter({ lat: region.lat, lng: region.lng });
            map.setZoom(15);
        }
    }, [map]);

    const openDrawer = useCallback(() => {
        setDrawerOpen(true);
    }, []);

    const closeDrawer = useCallback(() => {
        setDrawerOpen(false);
    }, []);


    const setMap = useCallback((mapInstance) => {
        setMapState(mapInstance);
    }, []);

    const value = useMemo(() => ({
        filtros,
        setFiltros,
        desativarTodosFiltros,
        idNameList,
        updateIdNameList,
        activeFilters,
        setActiveFilters,
        map,
        setMap,
        drawerOpen,
        openDrawer,
        closeDrawer,
        centerMapOnRegion
    }), [filtros, desativarTodosFiltros, idNameList, updateIdNameList, activeFilters, map, setMap, drawerOpen, openDrawer, closeDrawer, centerMapOnRegion]);

    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMap deve ser usado dentro de um MapProvider');
    }
    return context;
};
