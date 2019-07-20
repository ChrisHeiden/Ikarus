import React, { Component } from 'react';
import '../Style/Dot.css';

class Dot extends Component { 

    constructor(props) {
        super(props);
        console.log("Dot:");
        //console.log(this.props.xPos);
        //console.log(this.props.yPos);
        //console.log(this.props.big);
      }

    render() {
      let heightDiv;
      let widthDiv;

      console.log(this.props.amount);


      if(this.props.size === this.props.amount)
      {
        heightDiv = this.props.size;
        widthDiv = this.props.size;
      }

      const divStyle = {
        height: heightDiv +'px',
        width: widthDiv +'px'
      };
        return (
           <div /*style={divStyle}*/ className="dot">
           </div>
    );
  }
}

export default Dot;



// <svg height={11} width={11}>
//  <circle cx={11} cy={11} r={this.props.radius} fill="white" />
//</svg>