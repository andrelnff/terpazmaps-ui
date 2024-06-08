import {useCallback, useRef} from 'react';
import {useMap} from "../context/mapContext";
import {useMapCenter} from "./useMapCenter";
import {useLoading} from "../context/loadingContext";
import {getAllRegions} from "../service/terPazMapService";

export function useGeoJSON() {
  const polygons = useRef([]);
  const { map, selectedMap, updateIdNameList } = useMap();
  const { handlePolygonClick } = useMapCenter(map);
  const { startLoading, stopLoading } = useLoading();

  const fetchGeoJSON = useCallback(async () => {
    startLoading();
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
            if (selectedMap !== null && mapData.properties.ID !== selectedMap) {
              return;
            }
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

            tempList.push({id: mapData.properties.ID, name: mapData.properties.Nome, coordinates: mapData.properties.Centro.coordinates});
          }
        });
      }
    } catch (error) {
      console.error('Erro ao recuperar GeoJSON:', error);
    }
    stopLoading();
    updateIdNameList(tempList);
  }, [updateIdNameList, map, handlePolygonClick, selectedMap]);

  return { fetchGeoJSON };
}