import { useRef, useEffect } from 'react';
import { createDrawingManager, setupEventListeners } from '../components/drawingManager/DrawingManagerFunctions';
import { post } from '../service/mapService';
import {useMap} from "../context/mapContext";



export function useDrawingManager() {
  const { map } = useMap();
  const drawingManagerRef = useRef(null);
  const polygonRef = useRef(null);
  const overlaysRef = useRef([]);

  useEffect(() => {
    if (map) {
      createDrawingManager(drawingManagerRef);
      setupEventListeners(drawingManagerRef, polygonRef, overlaysRef);
      drawingManagerRef.current.setMap(map);
    }
  }, [map]);

  const deleteAllOverlays = () => {
    overlaysRef.current.forEach(overlay => overlay.setMap(null));
    overlaysRef.current = [];
    polygonRef.current = null;
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

  return { deleteAllOverlays, savePolygonGeoJSON, drawingManager: drawingManagerRef.current };
}