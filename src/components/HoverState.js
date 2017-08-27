import React, { Component } from 'react';

class HoverState extends Component {

  renderEmptyStateMsg = () => {
    return (
      <div className='hover-state'>
        <p>
          Hover on a state to see state information.
        </p>
      </div>
    )
  }

  render() {
    const { state } = this.props;

    if (!state)  {
      return this.renderEmptyStateMsg()
    }

    return (
      <div className='hover-state'>
        <p className='align-center bold'>State Information</p>
        <p><span>ID</span>: <span>{state.id}</span></p>
        <p><span>State Name</span>: <span>{state.name}</span></p>
        <p><span>Country</span>: <span>{state.country}</span></p>
      </div>
    )
  }
}

export default HoverState;
