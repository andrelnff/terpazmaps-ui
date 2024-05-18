import { useRef, useState } from 'react';
import {getStreetData} from "../service/terPazMapService";

export function usePolylineDrawer(map) {
  const polylines = useRef([]);
  const [streetsData, setStreetsData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading] = useState(false); // Estado de carregamento para as ruas

  const drawStreets = async (regionId, setLoading) => {
    setLoading(true);
    polylines.current.forEach(polyline => polyline.setMap(null));
    polylines.current = [];

    try {
      const data = await getStreetData(regionId);
      setStreetsData(data);
      if (data && data.features) {
        data.features.forEach(street => {
          const polyline = new window.google.maps.Polyline({
            path: street.geometry.coordinates.map(coord => ({ lat: coord[1], lng: coord[0] })),
            map: map,
            strokeColor: street.properties.color,
            strokeOpacity: street.properties['stroke-opacity'],
            strokeWeight: 2,
          });

          polyline.setMap(map);
          polylines.current.push(polyline);
        });
      }
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar dados das ruas:', err);
    }
    setLoading(false);
  };

  return { streetsData, error, isLoading, drawStreets };
}
