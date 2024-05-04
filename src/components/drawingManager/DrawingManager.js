import React, { useEffect } from 'react';
import { useDrawingManager } from '../../hooks/useDrawingManager';
import { useGeoJSON } from '../../hooks/useGeoJSON';
import OverlayControls from '../OverlayControls';
import './DrawingManager.css';
import Loading from '../loading/Loading';

function DrawingManager({ map }) {
  const { deleteAllOverlays, savePolygonGeoJSON } = useDrawingManager(map);
  const { fetchGeoJSON, isLoading } = useGeoJSON(map);
 
  useEffect(() => {
    fetchGeoJSON();
  }, [map, fetchGeoJSON]);

  return (
    <Loading isLoading={isLoading}>
      <OverlayControls onDelete={deleteAllOverlays} onSave={savePolygonGeoJSON} />
    </Loading>
  );
};

export default DrawingManager;