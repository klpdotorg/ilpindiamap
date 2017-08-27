import React from 'react';
import mapboxgl from 'mapbox-gl';

import HoverState from './HoverState';

const data = require('../data/india_telengana.geojson')

class Map extends React.Component {
  state = {
    hoverState: null
  }

  componentDidMount = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW91bnRhaW5maXJlZmx5IiwiYSI6ImNqNmx6MDA1djFpb3UzMnA4ZG8wN25kbW4ifQ.lwG4lBdb_V9mHtrOSobekw'

    const map = new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/dark-v9'
    })

    map.flyTo({
      center: [78.9629, 20.5937],
      zoom: 4
    })

    map.on('load', () => {
      this.addSource(map) //add source of geojson
      this.addLayers(map) //add layers on map
      this.addEvents(map) //add event on layers
    })
  }

  addEvents = (map) => {
    map.on("mousemove", "state-fills", (e) => {
      const properties = e.features[0].properties;

      this.setState({
        hoverState: {
          name: properties.NAME_1,
          country: properties.NAME_0,
          id: properties.ID_1
        }
      })

      map.setFilter("state-fills-hover", ["==", "NAME_1", properties.NAME_1 || ""]);
    });

    // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
    map.on("mouseleave", "state-fills", () => {
        map.setFilter("state-fills-hover", ["==", "NAME_1", ""]);
    });
  }

  addLayers = (map) => {
    map.addLayer({
      "id": "state-fills",
      "type": "fill",
      "source": "states",
      "layout": {},
      "paint": {
        "fill-color": "#627BC1",
        "fill-opacity": 0.5
      }
    });

    map.addLayer({
      "id": "state-borders",
      "type": "line",
      "source": "states",
      "layout": {},
      "paint": {
        "line-color": "white",
        "line-width": 1
      }
    });

    map.addLayer({
      "id": "state-fills-hover",
      "type": "fill",
      "source": "states",
      "layout": {},
      "paint": {
        "fill-color": "white",
        "fill-opacity": 1
      },
      "filter": ["==", "NAME_1", ""]
    });
  }

  addSource = (map) => {
    map.addSource("states", {
      "type": "geojson",
      "data": data
    });
  }

  render() {
    const { hoverState } = this.state;

    return (
      <div className='app-container'>
        <div
          className='Map'
          style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}
          ref={(x) => { this.container = x }}
        />
        <HoverState state={hoverState} />
      </div>
    )
  }
}

export default Map;
