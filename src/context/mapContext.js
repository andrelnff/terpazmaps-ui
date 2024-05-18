import React, {createContext, useState, useContext, useCallback, useMemo} from 'react';

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
    const [idNameList, setIdNameList] = useState([]);

    const updateIdNameList = useCallback((newList) => {
        setIdNameList(newList);
    }, []);

    const value = useMemo(() => ({
        idNameList,
        updateIdNameList
    }), [idNameList, updateIdNameList]);

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
