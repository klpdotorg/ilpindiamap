import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class ColumnChart extends Component {
	
	state = {
		value: 0,
		title: ''
	}

	componentDidMount = () => {
		this.setStateValues(this.props.hoveredState)
	}

	setStateValues = (hoveredState) => {
		if (hoveredState) {
			this.setState({
				value: hoveredState.std_v_division,
				title: hoveredState.name
			})	
		}
	}

	componentWillReceiveProps = (nextProps) => {
		if (this.props.hoveredState !== nextProps.hoveredState) {
			this.setStateValues(nextProps.hoveredState)
		}
	}

	render() {

		const { hoveredState } = this.props;
		const { title, value } = this.state;

		const config = {
			chart: {
		    type: 'column',
		    height: 200,
		    width: 200,
		    spacingRight: 20,
		    backgroundColor: 'hsla(240, 100%, 3%, 0.82)'
			},
			title: {
        text: `${title}`,
        style: { color: 'white', fontSize: '15px'}
	    },
	    xAxis: {
	    	categories: [
	        `Std. V can read Std. II text: ${value ? value.toFixed(2) : ''}%`,
        ],
        crosshair: true
	    },
	    yAxis: {
        min: 0,
        max: 100,
        title: {
          text: ''
        }
	    },
		  series: [{
		      data: [value]
		  }],
		}

		return (
			<div className='column-chart'>
				<ReactHighcharts config={config} isPureConfig={false} neverReflow={false}/>
			</div>
		)
	}
}

export default ColumnChart;
