import { useState, useCallback, useContext, useRef, useEffect } from 'react';
import { getStreetData } from "../service/terPazMapService";
import { MapContext } from "../context/mapContext";

export function usePolylineDrawer() {
  const { map, activeFilters } = useContext(MapContext);
  const [allStreets, setAllStreets] = useState(null);
  const polylines = useRef([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchStreets = useCallback(async (regionId) => {
    setIsDataLoaded(false); // Reset the isDataLoaded before fetching new data
    try {
      const data = await getStreetData(regionId);
      setAllStreets(data);
      setIsDataLoaded(true); // Set to true after successful data fetch
    } catch (err) {
      console.error('Erro ao buscar dados das ruas:', err);
    }
  }, []);

  const drawStreets = useCallback(() => {
    if (!isDataLoaded) return;

    polylines.current.forEach(polyline => polyline.setMap(null));
    polylines.current = [];

    if (allStreets && allStreets.features) {
      const filteredStreets = allStreets.features.filter(street =>
          activeFilters.includes(street.properties.condition)
      );

      filteredStreets.forEach(street => {
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
  }, [isDataLoaded, allStreets, activeFilters, map]);

  useEffect(() => {
    if (isDataLoaded) {
      drawStreets();
    }
  }, [isDataLoaded, activeFilters, drawStreets]);

  return { fetchStreets, drawStreets };
}
