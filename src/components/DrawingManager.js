import React, { useEffect, useState } from 'react';
import { useDrawingManager } from '../hooks/useDrawingManager';
import { useGeoJSON } from '../hooks/useGeoJSON';
import OverlayControls from './OverlayControls';
import Loading from './loading/Loading'; // Importe o componente de Loading
import './DrawingManager.css';

function DrawingManager({ map }) {
  const { deleteAllOverlays, savePolygonGeoJSON } = useDrawingManager(map);
  const { fetchGeoJSON } = useGeoJSON(map);
  const [loading, setLoading] = useState(true); // Adicione um estado de carregamento

  useEffect(() => {
    fetchGeoJSON().then(() => setLoading(false)); // Defina o carregamento como false quando os dados estiverem prontos
  }, [map]);

  return (
    <>
      {loading && <Loading />}
      <OverlayControls onDelete={deleteAllOverlays} onSave={savePolygonGeoJSON} />
    </>
  );
};

export default DrawingManager;