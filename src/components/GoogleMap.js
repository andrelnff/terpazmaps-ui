import React, {useContext, useEffect} from "react";
import DrawingManager from "./drawingManager/DrawingManager";
import SelectRegion from "./selectRegion/SelectRegion";
import {FiltroRuas} from "./filtroRuas/FiltroRuas";
import {MapContext} from "../context/mapContext";

function GoogleMap() {
    const { setMap, map } = useContext(MapContext);

    useEffect(() => {
        if (window.google && window.google.maps && !map) {
            const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -1.4031, lng: -48.4307 },
                disableDefaultUI: true,
                zoom: 13,
            });

            setMap(mapInstance);
        }
    }, [setMap, map]);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '100vh' }}>
        {map && <DrawingManager />}
      </div>
      <SelectRegion/>
      <FiltroRuas/>
    </div>
  );
}

export default GoogleMap;
