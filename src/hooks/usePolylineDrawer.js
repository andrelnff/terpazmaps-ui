import { useEffect } from 'react';

function usePolylineDrawer(map, streetsData) {
  useEffect(() => {
    if (map && streetsData) {
      Object.entries(streetsData).forEach(([streetsType, streetsData]) => {
        console.log(streetsData);
        if (streetsData.features) 
        streetsData.features.forEach(street => {
          const polyline = new window.google.maps.Polyline({
            path: street.geometry.coordinates.map(coord => ({ lat: coord[1], lng: coord[0] })),
            map: map,
            strokeColor: streetsData.properties["stroke-color"], // Usa a cor da linha do objeto JSON
            strokeOpacity: streetsData.properties['stroke-opacity'], // Usa a opacidade da linha do objeto JSON
            strokeWeight: 2, // Define a espessura da linha
          });

          polyline.setMap(map);
        });
      });
    }
  }, [map, streetsData]);
}

export default usePolylineDrawer;