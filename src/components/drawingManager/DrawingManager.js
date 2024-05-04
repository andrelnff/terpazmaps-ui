import React, { useEffect } from 'react';
import { useDrawingManager } from '../../hooks/useDrawingManager';
import { useGeoJSON } from '../../hooks/useGeoJSON';
import './DrawingManager.css';
import Loading from '../loading/Loading';
import DrawingControls from "../drawingControls/DrawingControls";

function DrawingManager({ map }) {
  const { deleteAllOverlays, savePolygonGeoJSON, drawingManager } = useDrawingManager(map);
  const { fetchGeoJSON, isLoading } = useGeoJSON(map);

  const setDrawingMode = (mode) => {
    if (drawingManager) {
      drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType[mode]);
    }
  };

  useEffect(() => {
    fetchGeoJSON();
  }, [map, fetchGeoJSON]);

    return (
        <Loading isLoading={isLoading}>
            <DrawingControls
                setDrawingMode={setDrawingMode}
                savePolygonGeoJSON={savePolygonGeoJSON}
                deleteAllOverlays={deleteAllOverlays}
            />
        </Loading>
    );
}

export default DrawingManager;