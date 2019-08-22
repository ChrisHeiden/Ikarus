import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Style/Dot.css';
import '../Style/App.css';

class Dot extends Component { 

    constructor(props) {
        super(props);
        this.state = {
          clickState: false,
          hover: false,
          width: 10,
          height: 10,
        }
        this.click = this.click.bind(this);
        this.calPosition = this.calPosition.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
        this.hoverOver = this.hoverOver.bind(this);
        this.initColor = this.props.color;
    };  

    calcXPos(procent, middleX, plattformPosX, distance, diameter){
      let x = 0;
      
      if(middleX == plattformPosX)
      {
        const startX = middleX + (diameter/2) - (this.state.width/2);
        x = ((-procent /100)* distance.x) + startX;      
      }
      else
      {
        const startX = middleX + (diameter/2) - (this.state.width/2);
        x = ((-procent /100) * distance.x) + startX;  
      }
      return x;
    }

    calcYPos(procent, middleY, plattformPosY, distance, diameter){
      let y = 0;
      if(middleY == plattformPosY)
      {
        const startY = middleY + (diameter/2) - (this.state.width/2);
        y = ((-procent /100)* distance.y) + startY;       
      }
      else
      {
        const startY = middleY + (diameter/2) - (this.state.width/2);
        y = ((-procent /100)* distance.y) + startY;  
      }

      return y;
    }

    calPosition(middleX, middleY, plattformPosX, plattformPosY, distance, oldest, newest, date, diameter){
      let point = {
          x: 0,
          y: 0,
          procent: 0
      };

      var actualPost = date
      var oldestPost = oldest
      var newestPost = newest

    

      let procent = ((actualPost.getTime() - oldestPost.getTime()) * 100) / (newestPost.getTime() - oldestPost.getTime());
      if(procent === Infinity)
      {
        procent = 0;
      }

      if(procent > 100)
      {
        alert(procent);
      }

          const y = this.calcYPos(procent, middleY, plattformPosY, distance, diameter);
      const x = this.calcXPos(procent, middleX, plattformPosX, distance, diameter);
    
      point.x = x;
      point.y = y;
     
      point.procent = procent;

      return point;
    }

    click(){
      if(this.state.clickState === false)
      {
        this.setState({clickState: true},() => {});
      }
      else{
        this.setState({clickState: false},() => {});
      }
    }

    hoverOver(){
      this.setState({hover: true},() => {});
    }

    hoverOff(){
      this.setState({hover: false},() => {});
    }

    render() {
      if(this.props.plattformPosX == 0 || this.props.plattformPosY == 0 )
      {
        return(
          <React.Fragment></React.Fragment>
        )
      }
      else
      {
        const point = this.calPosition(this.props.middleX, 
                                      this.props.middleY,
                                      this.props.plattformPosX,
                                      this.props.plattformPosY,
                                      this.props.distance,
                                      this.props.oldest,                       
                                      this.props.newest,
                                      this.props.date,
                                      this.props.diameter)
        let stylesDot;
        if(this.state.hover == true){
          stylesDot = {
            top: point.y,
            left: point.x,
            background: 'red',
            opacity: (point.procent / 100)
          };
        }
        else{
          stylesDot = {
            top: point.y,
            left: point.x,
            background: this.initColor,
            opacity: (point.procent / 100)
          };
        }
        

        let stylesText = {
          top: point.y - 15,
          left: point.x + 35,
        };

        let info;

        if(this.state.clickState === true)
        {
          info = <p style={stylesText} className="location">{this.props.location}</p>
        }

        if(this.state.hover === true)
        {
          info = <div className="showInfos"><p>{this.props.location}</p><p>{this.props.date.toString()}</p></div>
        }
    
        
        return (
          <div>
            <div 
                onMouseEnter={this.hoverOver}
                onMouseLeave={this.hoverOff} 
                className="absoluteDot" 
                style={stylesDot}>
            </div>
            <div 
              style={stylesText}
              className="hoverInformation">
              {info}
            </div>
          </div>
      );
    }
  }
}


Dot.propTypes = {
  getMainDot: PropTypes.func
}
export default Dot;