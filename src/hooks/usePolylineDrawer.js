import { useEffect } from 'react';

function usePolylineDrawer(map, streetsData) {
  useEffect(() => {
    if (map && streetsData) {
      Object.entries(streetsData).forEach(([streetsType, streetsData]) => {
        if (streetsData.features) 
        streetsData.features.forEach(street => {
          const polyline = new window.google.maps.Polyline({
            path: street.geometry.coordinates.map(coord => ({ lat: coord[1], lng: coord[0] })),
            map: map,
            strokeColor: streetsData.properties["stroke-color"],
            strokeOpacity: streetsData.properties['stroke-opacity'],
            strokeWeight: 2, 
          });

          polyline.setMap(map);
        });
      });
    }
  }, [map, streetsData]);
}

export default usePolylineDrawer;