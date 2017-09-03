import React from 'react';
import mapboxgl from 'mapbox-gl';

import Tooltip from './Tooltip';
import ColumnChart from './ColumnBar';
import PieChart from './PieChart';
import LeftPopup from './LeftPopup';
import LoadingIndicator from './LoadingIndicator';

import { renderLayers, getDensityColor } from './utils';

import { json } from 'd3-request';

class Map extends React.Component {
  state = {
    hoverState: null,
    point: null,
    visible: false,
    loading: true
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

      json('https://raw.githubusercontent.com/klpdotorg/ilpindiamap/new-setup/src/data/india-states.geojson', (error, response) => {
        if (!error) {

          this.addSource(map, response) //add source of geojson
          this.addLayers(map) //add layers on map
          this.addEvents(map) //add event on layers
        }
      });
    })
  }

  addEvents = (map) => {
    map.on("mousemove", "state-fills", (e) => {
      const properties = e.features[0].properties;
      const state = this.statesData[properties.code];
      const hoveredState = {
        name: state.DISE.name,
        num_schools: state.DISE['#schools'],
        population: state.DISE.population,
        literacy: state.DISE.literacy,
        std_v_division: state.ASER.std_v_division,
        sex_ratio: state.DISE.enrollment_sex_ratio_I_V
      }

      if (this.state.hoverState.name !== hoveredState.name) {
        this.setState({
          hoverState: hoveredState,
          point: e.point,
          visible: true
        })
      }

      map.setFilter("state-fills-hover", ["==", "NAME_1", properties.NAME_1 || ""]);
      map.setFilter("state-borders-hover", ["==", "NAME_1", properties.NAME_1 || ""]);
    });

    // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
    map.on("mouseleave", "state-fills", () => {
      map.setFilter("state-fills-hover", ["==", "NAME_1", ""]);
      map.setFilter("state-borders-hover", ["==", "NAME_1", ""]);

      //Setting visible false to hide tooltip
      this.setState({
        visible: false
      })
    });
  }

  drawLayersWithData = (map) => {   
    const data = this.statesData;

    Object.keys(data).forEach((stateCode) => {
      const state = data[stateCode]
      const color = getDensityColor(state.DISE['#schools'] * 10000 / state.DISE.population);

      map.addLayer({
        "id": `state-fill-${stateCode}`,
        "type": "fill",
        "source": "states",
        "layout": {},
        "paint": {
          "fill-color": color,
          "fill-opacity": 0.5 ,
        },
        "filter": ["==", "code", stateCode]
      });
    })

    const defaultSelectState = data['KA']

    this.setState({
      hoverState: {
        name: defaultSelectState.DISE.name,
        num_schools: defaultSelectState.DISE['#schools'],
        population: defaultSelectState.DISE.population,
        literacy: defaultSelectState.DISE.literacy,
        std_v_division: defaultSelectState.ASER.std_v_division,
        sex_ratio: defaultSelectState.DISE.enrollment_sex_ratio_I_V
      },
    })
  }

  addLayers = (map) => {
    
    renderLayers(map);

    json('https://raw.githubusercontent.com/klpdotorg/ilpindiamap/new-setup/src/data/data.json', (error, response) => {
      if (!error) {
        this.statesData = response

        this.drawLayersWithData(map);
        this.setState({
          loading: false
        })
      }
    });

  }

  addSource = (map, data) => {
    map.addSource("states", {
      "type": "geojson",
      "data": data
    });
  }

  render() {
    const { hoverState, point, visible, loading } = this.state;

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

        <Tooltip visible={visible} hoveredState={hoverState} point={point} />

        <ColumnChart hoveredState={hoverState}/>
        <PieChart hoveredState={hoverState}/>
        <LeftPopup />
        <LoadingIndicator loading={loading}/>
      </div>
    )
  }
}

export default Map;

