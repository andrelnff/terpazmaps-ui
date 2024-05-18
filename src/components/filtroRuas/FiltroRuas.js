import {useEffect, useState} from "react";
import {Button, Drawer} from "@mui/material";
import {getStreetConditions} from "../../service/terPazMapService";
import FiltroLista from "../filtroLista/FiltroLista";


export function FiltroRuas() {
    const [state, setState] = useState({
        right: false,
    });
    const [filtros, setFiltros] = useState([]);

    useEffect(() => {
        const fetchStreetConditions = async () => {
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

        fetchStreetConditions();
    }, []);

    const handleToggle = (label) => {
        const newFiltros = filtros.map((filtro) => {
            if (filtro.label === label) {
                return { ...filtro, ativo: !filtro.ativo };
            }
            return filtro;
        });
        setFiltros(newFiltros);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            <Button
                sx={{
                    position: 'fixed',
                    left: 16,
                    bottom: 16,
                    zIndex: 9999,
                }}
                onClick={toggleDrawer('right', true)}
            >
                Abrir Drawer
            </Button>

            <Drawer
                anchor='right'
                open={state['right']}
                onClose={toggleDrawer('right', false)}
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