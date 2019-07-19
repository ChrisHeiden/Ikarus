import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';

class Dot extends Component { 

    constructor(props) {
        super(props);
        console.log("Dot:");
        console.log(this.props.xPos);
        console.log(this.props.yPos);
      }

    render() {
        return (
            <svg height={this.props.yPos} width={this.props.xPos}>
                <circle cx={this.props.xPos/2} cy={this.props.yPos/2} r={this.props.radius} fill="white" />
            </svg>
    );
  }
}

export default Dot;