import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

class PieChart extends Component {
	
	getConfig = (title, value) => {
		//const male_value = 1000 - value;
		return 
	}

	state = {
		value: 0,
		title: '',
		config: this.getConfig('')
	}

	componentDidMount = () => {
		this.setStateValues(this.props.hoveredState)
	}

	setStateValues = (hoveredState) => {
		if (hoveredState) {
			this.setState({
				title: hoveredState.name,
				value: hoveredState.sex_ratio
			})	
		}
	}

	componentWillReceiveProps = (nextProps) => {
		if (this.props.hoveredState !== nextProps.hoveredState) {
			this.setStateValues(nextProps.hoveredState)
		}
	}

	render() {
		const config = {
			chart: {
				plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        spacingLeft: 5,
        type: 'pie',
		    height: 200,
		    width: 200,
		    backgroundColor: 'hsla(240, 100%, 3%, 0.82)'
			},
			title: {
        text: this.state.title,
        style: { color: 'white', fontSize: '15px'}
	    },
	    subtitle: {
	    	text: 'Enrollment Ratio: Females for every 1000 Males'
	    },
		  series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Female',
            y: this.state.value
        }, {
            name: 'Male',
            y: 1000,
        }]
    	}]
		}

		return (
			<div className='pie-chart'>
				<ReactHighcharts config={config} isPureConfig={false} neverReflow={false}/>
			</div>
		)
	}
}

export default PieChart;