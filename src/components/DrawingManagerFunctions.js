export function createDrawingManager(drawingManagerRef) {
  drawingManagerRef.current = new window.google.maps.drawing.DrawingManager({
    drawingControl: false,
    markerOptions: {
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    }
  });
}

export function setDrawingOptions(drawingManagerRef, drawingModes) {
  if (drawingManagerRef.current) {
    drawingManagerRef.current.setOptions({
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: drawingModes,
      },
    });
  }
}

export function setupEventListeners(drawingManagerRef, polygonRef, overlaysRef) {
  if (drawingManagerRef.current) {
    window.google.maps.event.addListener(drawingManagerRef.current, 'overlaycomplete', function(event) {
      overlaysRef.current.push(event.overlay);
      if (event.type === 'polygon') {
        polygonRef.current = event.overlay;
        drawingManagerRef.current.setDrawingMode(null);
      } else if (event.type === 'marker' || event.type === 'polyline') {
        if (polygonRef.current) {
          let contains = false;
          if (event.type === 'marker') {
            contains = window.google.maps.geometry.poly.containsLocation(event.overlay.getPosition(), polygonRef.current);
          } else { 
            var path = event.overlay.getPath();
            contains = true;
            for (var i = 0; i < path.getLength(); i++) {
              if (!window.google.maps.geometry.poly.containsLocation(path.getAt(i), polygonRef.current)) {
                contains = false;
                break;
              }
            }
          }
          if (!contains) {
            event.overlay.setMap(null);
          }
        }
      }
    });
  }
}
