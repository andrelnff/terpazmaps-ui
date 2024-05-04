import React, { useEffect, useState } from "react";
import DrawingManager from "./drawingManager/DrawingManager";
import { useGeoJSON } from '../hooks/useGeoJSON';
import RegionSelector from './RegionSelector'; // Importe o novo componente


function GoogleMap() {
  const [map, setMap] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { fetchGeoJSON } = useGeoJSON(map, selectedRegion);

  const regions = [
    { id: 1, name: 'Região 1' },
    { id: 2, name: 'Região 2' },
  ];

  useEffect(() => {
    if (window.google && window.google.maps) {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.4031, lng: -48.4307 },
        zoom: 13,
      });

      setMap(mapInstance);
    }
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchGeoJSON();
    }
  }, [selectedRegion, fetchGeoJSON]);

  return (
    <div style={{ position: 'relative' }}>
      <RegionSelector regions={regions} onRegionChange={setSelectedRegion} />

      <div id="map" style={{ width: '100%', height: '100vh' }}>
        {map && <DrawingManager map={map} />}
      </div>
    </div>
  );
};

export default GoogleMap;
