import { useRef, useState, useCallback } from 'react';
import { getStreetData } from "../service/terPazMapService";

export function usePolylineDrawer(map) {
  const polylines = useRef([]);
  const [error, setError] = useState(null);
  const [isLoading] = useState(false);

  const drawStreets = useCallback(async (regionId, setLoading) => {
    if (!setLoading) return;

    setLoading(true);
    polylines.current.forEach(polyline => polyline.setMap(null));
    polylines.current = [];

    try {
      const data = await getStreetData(regionId);
      console.log(data);
      if (data && data.features) {
        data.features.forEach(street => {
          let path;
          if (street.geometry.type === "Polygon") {
            path = street.geometry.coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] }));
          } else if (street.geometry.type === "LineString") {
            path = street.geometry.coordinates.map(coord => ({ lat: coord[1], lng: coord[0] }));
          }

          if (path) {
            const polyline = new window.google.maps.Polyline({
              path: path,
              map: map,
              strokeColor: street.properties.color,
              strokeOpacity: street.properties['stroke-opacity'],
              strokeWeight: 2,
            });

            polyline.setMap(map);
            polylines.current.push(polyline);
          }
        });
      }

    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar dados das ruas:', err);
    }
    setLoading(false);
  }, [map]);

  return { error, isLoading, drawStreets };
}
