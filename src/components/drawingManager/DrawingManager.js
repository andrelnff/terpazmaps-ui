import React, { useEffect } from 'react';
import { useDrawingManager } from '../../hooks/useDrawingManager';
import { useGeoJSON } from '../../hooks/useGeoJSON';
import './DrawingManager.css';
import DrawingControls from "../drawingControls/DrawingControls";

function DrawingManager() {
  const { deleteAllOverlays, savePolygonGeoJSON, drawingManager } = useDrawingManager();
  const { fetchGeoJSON } = useGeoJSON();

  const setDrawingMode = (mode) => {
    if (drawingManager) {
      drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType[mode]);
    }
  };

  useEffect(() => {
    fetchGeoJSON();
  }, [fetchGeoJSON]);

    return (
        <DrawingControls
            setDrawingMode={setDrawingMode}
            savePolygonGeoJSON={savePolygonGeoJSON}
            deleteAllOverlays={deleteAllOverlays}
        />
    );
}

export default DrawingManager;