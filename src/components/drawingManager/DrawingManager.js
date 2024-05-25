import React, { useEffect } from 'react';
import { useDrawingManager } from '../../hooks/useDrawingManager';
import { useGeoJSON } from '../../hooks/useGeoJSON';
import './DrawingManager.css';
import DrawingControls from "../drawingControls/DrawingControls";

function DrawingManager({ map }) {
  const { deleteAllOverlays, savePolygonGeoJSON, drawingManager } = useDrawingManager(map);
  const { fetchGeoJSON } = useGeoJSON(map);

  const setDrawingMode = (mode) => {
    if (drawingManager) {
      drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType[mode]);
    }
  };

  useEffect(() => {
    fetchGeoJSON();
  }, [map, fetchGeoJSON]);

    return (
        <DrawingControls
            setDrawingMode={setDrawingMode}
            savePolygonGeoJSON={savePolygonGeoJSON}
            deleteAllOverlays={deleteAllOverlays}
        />
    );
}

export default DrawingManager;