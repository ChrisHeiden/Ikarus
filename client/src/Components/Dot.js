import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Style/Dot.css';

class Dot extends Component { 

    constructor(props) {
        super(props);
        this.state = {
        }
        this.calcPoint = this.calcPoint.bind(this);
    };  

    calcPoint(angle){
      let point = {
          x: 1,
          y: 1
      };
      if(this.props.y >= 1){
        point.y = this.props.y + (this.props.radius*3) * Math.cos(angle);
        point.x = this.props.x + (this.props.radius*3) * Math.sin(angle);
      }
      return point;
  }


    render() {
      const angle = this.props.angle;
      console.log(angle);
      const point = this.calcPoint(angle);

      let styles = {
        top: point.y,
        left: point.x,
      };

      return (
        <div className="dot infoDot" style={styles}>
        </div>
    );
  }
}


Dot.propTypes = {
  getMainDot: PropTypes.func
}
export default Dot;