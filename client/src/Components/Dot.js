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
        this.click = this.click.bind(this);
        this.calPosition = this.calPosition.bind(this);
    };  

    calcXPos(procent, middleX, plattformPosX, distance){
      let x = 0;
      if(middleX == plattformPosX)
      {
        x = plattformPosX + (this.state.width*2);
      }
      else
      {
        const startX = plattformPosX + (this.state.width*2);
        x = (distance / procent) + startX;
      }

      return x;
    }

    calcYPos(procent, middleY, plattformPosY, distance){
      let y = 0;
      if(middleY == plattformPosY)
      {
        y = plattformPosY + (this.state.height*2);
      }
      else
      {
        const startY = plattformPosY + (this.state.height*2);
        y = (distance / procent) + startY;
      }

      return y;
    }

    calPosition(middleX, middleY, plattformPosX, plattformPosY, distance, oldest, newest, date, diameter){
      let point = {
          x: 0,
          y: 0,
          procent: 0
      };

      var actualPost = new Date(date);
      var oldestPost = new Date(oldest);
      var newestPost = new Date(newest);

      // TODO: actualPost.getTime() - oldestPost.getTime() can be 0
      const procent = ((actualPost.getTime() - oldestPost.getTime()) * 100) / (newestPost.getTime() - oldestPost.getTime());
      // TODO: actualPost.getTime() - oldestPost.getTime() can be 0     
      // TODO: posY start in the middle
      const y = this.calcYPos(procent, middleY, plattformPosY, distance);
      const x = this.calcXPos(procent, middleX, plattformPosX, distance);

      point.x = x;
      point.y = y;
      if(y === Infinity)
      {
        point.y = plattformPosY;
      }
      if(x === Infinity)
      {
        point.x = plattformPosX;
      }
      point.procent = procent;
      //console.log(procent)

      return point;
    }

    click(){
      if(this.state.clickState === false)
      {
        this.setState({
          clickState: true, 
          height: 20,
          width: 20,
        });
      }
      else{
        this.setState({
          clickState: false,
          height: 10,
          width: 10,
        });
      }
    }

   


    render() {
      const point = this.calPosition(this.props.middleX, 
                                   this.props.middleY,
                                   this.props.plattformPosX,
                                   this.props.plattformPosY,
                                   this.props.distance,
                                   this.props.oldest,                       
                                   this.props.newest,
                                   this.props.date,
                                   this.props.diameter)
                                   
      //console.log(point)

      let styles = {
        top: point.y,
        left: point.x,
        width: this.state.width + "px",
        height: this.state.height + "px",
        opacity: (point.procent / 100)
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


      //console.log("actualPost: " + actualPost)
      //console.log("oldestPost: " + oldestPost)
      //console.log("newestPost: " + newestPost)

      //console.log("actualPost.getTime(): " + actualPost.getTime())
      //console.log("oldestPost.getTime(): " + oldestPost.getTime())
      //console.log("newestPost.getTime(): " + newestPost.getTime())
      //console.log(actualPost.getTime() - oldestPost.getTime())
      //console.log(newestPost.getTime() - oldestPost.getTime())
