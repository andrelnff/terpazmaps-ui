import { useRef, useState, useCallback } from 'react';
import { getAllRegions } from '../service/terPazMapService';
import { useMapCenter } from './useMapCenter';
import {useMap} from "../context/mapContext";

export function useGeoJSON(map) {
  const polygons = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handlePolygonClick } = useMapCenter(map);
  const { updateIdNameList } = useMap();

  const fetchGeoJSON = useCallback(async () => {
    setIsLoading(true);
    let tempList = [];
    try {
      polygons.current.forEach(polygon => {
        polygon.setMap(null);
      });

      polygons.current = [];

      const userData = await getAllRegions();
      if (map && userData) {
        const mapas = userData.features;
        mapas.forEach((mapData) => {
          if (mapData) {
            const polygon = new window.google.maps.Polygon({
              paths: mapData.geometry.coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] })),
              map: map,
              fillColor: '#87CEFA',
              fillOpacity: 0.35,
              strokeColor: '#1E90FF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            });

            polygon.addListener('click', () => {
              handlePolygonClick(mapData);
            });

            polygon.setMap(map);
            polygons.current.push(polygon);

            tempList.push({id: mapData.properties.ID, name: mapData.properties.Nome});
          }
        });
      }
    } catch (error) {
      console.error('Erro ao recuperar GeoJSON:', error);
    }
    setIsLoading(false);
    updateIdNameList(tempList);
  }, [updateIdNameList, map, handlePolygonClick]);

  return { fetchGeoJSON, isLoading};
}
