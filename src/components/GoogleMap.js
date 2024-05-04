import React, { useEffect, useState } from "react";
import DrawingManager from "./drawingManager/DrawingManager";

function GoogleMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -1.4031, lng: -48.4307 },
        zoom: 13,
      });

      setMap(mapInstance);
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '100vh' }}>
        {map && <DrawingManager map={map} />}
      </div>
    </div>
  );
}

export default GoogleMap;
