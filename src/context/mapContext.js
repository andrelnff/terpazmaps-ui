import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
    const [idNameList, setIdNameList] = useState([]);
    const [map, setMapState] = useState(null);
    const [drawerState, setDrawerState] = useState({ right: false });

    const updateIdNameList = useCallback((newList) => {
        setIdNameList(newList);
    }, []);

    const setMap = useCallback((mapInstance) => {
        console.log('atualização de mapa')
        setMapState(mapInstance);
    }, []);

    const toggleDrawer = useCallback((anchor, open) => {
        setDrawerState(prevState => ({ ...prevState, [anchor]: open }));
    }, []);

    const value = useMemo(() => ({
        idNameList,
        updateIdNameList,
        map,
        setMap,
        drawerState,
        toggleDrawer,
    }), [idNameList, updateIdNameList, map, setMap, drawerState, toggleDrawer]);

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
