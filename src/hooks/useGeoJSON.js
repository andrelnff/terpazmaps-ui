import { useRef, useState } from 'react';
import { get } from '../service/terPazMapService';
import usePolylineDrawer from './usePolylineDrawer'

export function useGeoJSON(map) {
  const polygons = useRef([]);
  const [streetsData, setStreetsData] = useState(null);

  // Use o hook usePolylineDrawer aqui
  usePolylineDrawer(map, streetsData);

  const fetchGeoJSON = async () => {
    try {
      polygons.current.forEach(polygon => {
        polygon.setMap(null);
      });

      polygons.current = [];

      const userData = await get(); 
      if (map && userData) {
        const mapas = userData.features;
        console.log(mapas);
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
                const center = mapData.properties.Centro.coordinates;
                map.setCenter({ lat: center[1], lng: center[0] });
                map.setZoom(15);
              });

              polygon.setMap(map);
              polygons.current.push(polygon);
          }
        });
      }
    } catch (error) {
      console.error('Erro ao recuperar GeoJSON:', error);
    }
  };

  return { fetchGeoJSON };
}