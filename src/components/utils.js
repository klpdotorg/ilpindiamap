export const renderLayers = (map) => {

	map.addLayer({
    "id": "state-fills",
    "type": "fill",
    "source": "states",
    "layout": {},
    "paint": {
      "fill-opacity": 1
    }
  });

  map.addLayer({
    "id": "state-borders",
    "type": "line",
    "source": "states",
    "paint": {
      "line-color": "white",
      "line-width": 1,
      "line-opacity": 0.5
    }
  });

  map.addLayer({
    "id": "state-fills-hover",
    "type": "fill",
    "source": "states",
    "layout": {},
    "paint": {
      "fill-opacity": 0.5
    },
    "filter": ["==", "NAME_1", ""]
  });

  map.addLayer({
    "id": "state-borders-hover",
    "type": "line",
    "source": "states",
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": "white",
      "line-width": 4,
      "line-opacity": 1
    },
    "filter": ["==", "NAME_1", ""]
  });
}

export const getDensityColor = (d) => {
  const colors = ['rgb(255,255,204)','rgb(217,240,163)','rgb(173,221,142)','rgb(120,198,121)','rgb(65,171,93)','rgb(35,132,67)','rgb(0,90,50)'].reverse()
  const ranges = [ 50, 25, 20, 15, 10, 5, 0 ];

  return  d > ranges[0] ? colors[0] :
    d > ranges[1] ? colors[1] :
    d > ranges[2] ? colors[2] :
    d > ranges[3] ? colors[3] :
    d > ranges[4] ? colors[4] :
    d > ranges[5] ? colors[5] :
    colors[6];
}