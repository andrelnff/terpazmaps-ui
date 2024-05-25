import React, { useState, useEffect, useCallback } from 'react';
import { Button, Drawer } from "@mui/material";
import FiltroLista from "../filtroLista/FiltroLista";
import { getStreetConditions } from "../../service/terPazMapService";
import { useMap } from "../../context/mapContext";
import { usePolylineDrawer } from "../../hooks/usePolylineDrawer";
import {useFiltros} from "../../context/filtrosContext";

export function FiltroRuas() {
    const [state, setState] = useState({
        right: false,
    });
    const { openDrawer, closeDrawer } = useMap();
    const { filtros, setFiltros, activeFilters, setActiveFilters } = useFiltros();

    const { drawStreets } = usePolylineDrawer();

    useEffect(() => {
        const initializeFilters = async () => {
            try {
                const conditions = await getStreetConditions();
                const initialFilters = conditions.map(condition => ({
                    label: condition.condition,
                    ativo: false,
                    color: condition.color
                }));
                setFiltros(initialFilters);
            } catch (error) {
                console.error('Erro ao buscar condições das ruas:', error);
            }
        };

        if (filtros.length === 0) { // Verifica se o estado global de filtros está vazio antes de inicializar
            initializeFilters();
        }
    }, [setFiltros, filtros.length]);

    useEffect(() => {
        const newActiveFilters = filtros.filter(filtro => filtro.ativo).map(filtro => filtro.label);
        setActiveFilters(newActiveFilters);
    }, [filtros, setActiveFilters]);

    useEffect(() => {
        drawStreets();
    }, [activeFilters, drawStreets]);

    const handleToggle = useCallback((label) => {
        const newFiltros = filtros.map(filtro => ({
            ...filtro,
            ativo: filtro.label === label ? !filtro.ativo : filtro.ativo
        }));
        setFiltros(newFiltros);
    }, [filtros, setFiltros]);

    const toggleDrawer = useCallback((anchor, open) => {
        setState(prevState => ({ ...prevState, [anchor]: open }));
        if (open) {
            openDrawer();
        } else {
            closeDrawer();
        }
    }, [openDrawer, closeDrawer]);

    return (
        <div>
            <Button
                sx={{
                    position: 'fixed',
                    left: 16,
                    bottom: 16,
                    zIndex: 9999,
                }}
                onClick={() => toggleDrawer('right', true)}
            >
                Abrir Drawer
            </Button>
            <Drawer
                anchor='right'
                open={state['right']}
                onClose={() => toggleDrawer('right', false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '15%',
                        height: '50%',
                        maxHeight: '50%',
                        right: '0',
                        borderRadius: '10px',
                        margin: 'auto',
                        position: 'fixed',
                        top: '25%',
                        overflow: 'visible'
                    }
                }}
                ModalProps={{
                    keepMounted: true,
                    BackdropProps: {
                        invisible: true
                    }
                }}
            >
                <FiltroLista filtros={filtros} handleToggle={handleToggle} />
            </Drawer>
        </div>
    );
}
