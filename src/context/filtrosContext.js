import {createContext, useCallback, useContext, useState} from "react";

const FiltrosContext = createContext(null);

export const FiltrosProvider = ({ children }) => {
    const [filtros, setFiltros] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);

    const desativarTodosFiltros = useCallback(() => {
        setFiltros(filtrosAnteriores => filtrosAnteriores.map(filtro => ({
            ...filtro,
            ativo: false
        })));
    }, [setFiltros]);

    return (
        <FiltrosContext.Provider value={{ filtros, setFiltros, desativarTodosFiltros, activeFilters, setActiveFilters }}>
            {children}
        </FiltrosContext.Provider>
    );
};

export const useFiltros = () => {
    const context = useContext(FiltrosContext);
    if (context === undefined) {
        throw new Error('useFiltros deve ser usado dentro de um FiltrosProvider');
    }
    return context;
};

