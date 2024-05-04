import { useState, useRef, useCallback } from 'react';
import { get } from '../service/terPazMapService';


export function useGeoJSON(map) {
  const polygons = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idNameList, setIdNameList] = useState([]);

  // Função para centralizar o mapa
  const centerMap = (coordinates) => {
    map.setCenter({ lat: coordinates[1], lng: coordinates[0] });
    map.setZoom(15);
  };

  // Função para lidar com o clique no polígono
  const handlePolygonClick = (mapData) => {
    const center = mapData.properties.Centro.coordinates;
    centerMap(center);
  };

  const fetchGeoJSON = useCallback(async () => {
    setIsLoading(true);
    let tempList = [];
    try {
      polygons.current.forEach(polygon => {
        polygon.setMap(null);
      });

      polygons.current = [];

      const userData = await get();
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

            polygon.addListener('click', (event) => {
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
    setIdNameList(tempList);
  }, [map]);

  return { fetchGeoJSON, isLoading, idNameList, centerMap, handlePolygonClick };
}