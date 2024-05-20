import React, {useContext, useEffect} from "react";
import DrawingManager from "./drawingManager/DrawingManager";
import SelectRegion from "./selectRegion/SelectRegion";
import {FiltroRuas} from "./filtroRuas/FiltroRuas";
import {MapContext} from "../context/mapContext";

function GoogleMap() {
    const { setMap, map: globalMap } = useContext(MapContext); // Use o contexto para acessar e definir o mapa

    useEffect(() => {
        if (window.google && window.google.maps && !globalMap) { // Verifique se o mapa global ainda não foi definido
            const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -1.4031, lng: -48.4307 },
                disableDefaultUI: true,
                zoom: 13,
            });

            setMap(mapInstance);
        }
    }, [setMap, globalMap]);

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '100vh' }}>
        {globalMap && <DrawingManager map={globalMap} />}
      </div>
      <SelectRegion/>
      <FiltroRuas/>
    </div>
  );
}

export default GoogleMap;
