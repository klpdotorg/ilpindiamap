import React from 'react';

const LeftPopup = () => {
	const colors = ['rgb(255,255,204)','rgb(217,240,163)','rgb(173,221,142)','rgb(120,198,121)','rgb(65,171,93)','rgb(35,132,67)','rgb(0,90,50)']
  const ranges = [ 50, 25, 20, 15, 10, 5, 0 ].reverse();

	return (
		<div className='color-chart'>
			<p className="color-chart-title">Number of schools per 100000 people</p>
			<div className='color-chart-body'>
				{
					colors.map((color, i) => {
						const value = ranges.length <= i + 1 ? `${ranges[i]}+` : `${ranges[i]}-${ranges[i+1]}`;

						return <p className='status-cont' key={i}><i className="color-status" style={{ backgroundColor: color}}/><span>{value}</span></p>
					})
				}
			</div>
		</div>
	)
}

export default LeftPopup;