import React from 'react';

const LoadingIndicator = ({ loading }) => {
	if (!loading) {
		return <div />
	}

	return (
		<div className='loading-cont'>
			<div className="loader"></div>
		</div>
	)
}

export default LoadingIndicator;