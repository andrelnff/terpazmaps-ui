import { useRef, useEffect } from 'react';
import { createDrawingManager, setDrawingOptions, setupEventListeners } from '../components/DrawingManagerFunctions'; 
import { post } from '../service/mapService';



export function useDrawingManager(map) {
  const drawingManagerRef = useRef(null);
  const polygonRef = useRef(null);
  const overlaysRef = useRef([]);

  useEffect(() => {
    if (map) {
      createDrawingManager(drawingManagerRef);
      setDrawingOptions(drawingManagerRef, [
        window.google.maps.drawing.OverlayType.MARKER,
        window.google.maps.drawing.OverlayType.POLYGON,
        window.google.maps.drawing.OverlayType.POLYLINE,
      ]);
      setupEventListeners(drawingManagerRef, polygonRef, overlaysRef);
      drawingManagerRef.current.setMap(map);
    }
  }, [map]);

  const deleteAllOverlays = () => {
    overlaysRef.current.forEach(overlay => overlay.setMap(null));
    overlaysRef.current = [];
    polygonRef.current = null; 
    setDrawingOptions(drawingManagerRef, [
      window.google.maps.drawing.OverlayType.MARKER,
      window.google.maps.drawing.OverlayType.POLYGON,
      window.google.maps.drawing.OverlayType.POLYLINE,
    ]);
    drawingManagerRef.current.setDrawingMode(null);
  };

  const savePolygonGeoJSON = async () => {
    if (polygonRef.current) {
      const polygonPath = polygonRef.current.getPath();
      const coordinates = polygonPath.getArray().map(latLng => [latLng.lng(), latLng.lat()]);
      const geoJSON = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordinates]
        }
      };
      console.log(geoJSON);
      const timestamp = new Date().getTime();
      const mapName = 'mapa' + timestamp.toString();
  
      const newData = {
        limites: {
          type: "FeatureCollection",
          features: [geoJSON]
        },
        ruas: {},
        descarte: {}
      };
  
      await post('public', mapName, newData);
      deleteAllOverlays();
    }
  };

  return { deleteAllOverlays, savePolygonGeoJSON };
}