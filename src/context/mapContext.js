import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
    const [idNameList, setIdNameList] = useState([]);
    const [map, setMapState] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const updateIdNameList = useCallback((newList) => {
        setIdNameList(newList);
    }, []);

    const openDrawer = useCallback(() => {
        setDrawerOpen(true);
    }, []);

    const closeDrawer = useCallback(() => {
        setDrawerOpen(false);
    }, []);


    const setMap = useCallback((mapInstance) => {
        console.log('atualização de mapa')
        setMapState(mapInstance);
    }, []);

    const value = useMemo(() => ({
        idNameList,
        updateIdNameList,
        map,
        setMap,
        drawerOpen,
        openDrawer,
        closeDrawer,
    }), [idNameList, updateIdNameList, map, setMap, drawerOpen, openDrawer, closeDrawer]);

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
