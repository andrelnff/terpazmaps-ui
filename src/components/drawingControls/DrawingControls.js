import React from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction} from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import MapIcon from '@mui/icons-material/Map';
import ClearIcon from '@mui/icons-material/Clear';
import BackHandIcon from '@mui/icons-material/BackHand';
import SaveIcon from '@mui/icons-material/Save';

const actions = [
    { icon: <MapIcon />, name: 'Desenhar Polígono', mode: 'POLYGON' },
    { icon: <AddLocationAltIcon />, name: 'Desenhar Marcador', mode: 'MARKER' },
    { icon: <AddRoadIcon />, name: 'Desenhar Polilinha', mode: 'POLYLINE' },
    { icon: <BackHandIcon />, name: 'Mover Mapa', mode: null },
    { icon: <SaveIcon />, name: 'Salvar GeoJSON', action: 'save' },
    { icon: <ClearIcon />, name: 'Deletar Todos', action: 'delete' },
];

function DrawingControls({ setDrawingMode, savePolygonGeoJSON, deleteAllOverlays }) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAction = (action) => {
        if (action.mode !== undefined) {
            setDrawingMode(action.mode);
        } else if (action.action === 'save') {
            savePolygonGeoJSON();
        } else if (action.action === 'delete') {
            deleteAllOverlays();
        }
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => handleAction(action)}
                />
            ))}
        </SpeedDial>
    );
}

export default DrawingControls;