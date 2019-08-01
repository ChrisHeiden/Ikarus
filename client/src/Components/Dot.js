import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Style/Dot.css';
import '../Style/App.css';

class Dot extends Component { 

    constructor(props) {
        super(props);
        this.state = {
          clickState: false,
          width: 10,
          height: 10,
        }
        this.position = "";
        this.click = this.click.bind(this);
        this.calcPoint = this.calcPoint.bind(this);
    };  

    calcPoint(angle, radius, x, y){
      let point = {
          x: 0,
          y: 0
      };

      let shift = radius/2;
      point.y = (y + shift) + (radius * Math.sin(angle));
      point.x = (x + shift) + (radius * Math.cos(angle));
      
      return point;
    }

    click(){
      console.log("test")
      if(this.state.clickState === false)
      {
        this.setState({clickState: true});
        this.setState({height: 100});
        this.setState({width: 100});
      }else{
        this.setState({clickState: false});
        this.setState({height: 10});
        this.setState({width: 10});
      }
    }


    render() {
      this.position = this.props.location
      const point = this.calcPoint(this.props.angle, this.props.radius, this.props.x, this.props.y);
      console.log(point);
      let styles = {
        top: point.y,
        left: point.x,
        width: this.state.width + "px",
        height: this.state.height + "px",
      };
      let loca;
      if(this.state.clickState === true)
      {
        loca = <p style={styles}>{this.position}</p>
      }

      return (
        <div>
          <div onClick={this.click} className="absoluteDot" style={styles}>
            {loca}
          </div>
        </div>
    );
  }
}


Dot.propTypes = {
  getMainDot: PropTypes.func
}
export default Dot;