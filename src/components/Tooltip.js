import React, { Component } from 'react';

class Tooltip extends Component {
	render() {

		const { visible, hoveredState, point } = this.props;
		
		if (!visible) {
			return <div />
		}

		return (
			<div className="tooltip" style={{left: point.x, top: point.y}}>
        <div className="header">{hoveredState.name}</div>
        <div>Number Of Schools: {hoveredState.num_schools || 0}</div>
        <div>Population: {hoveredState.population}</div>
      </div>
		)
	}
}

export default Tooltip;