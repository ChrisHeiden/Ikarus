import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import '../Style/PlattformDot.css';
import PropTypes from 'prop-types';
import Dot from './Dot'

class PlattformDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           click: false,
           x: 0,
           y: 0,
           diameter: 50,
        };
        this.onClick = this.onClick.bind(this);
        this.calcDistance = this.calcDistance.bind(this);        
        this.calcDots = this.calcDots.bind(this); 
        this.dotClick = this.dotClick.bind(this); 
        this.hideDots = this.hideDots.bind(this); 
        
        this.time;
    }

    

    refCallback = element => {
        const pos = element.getBoundingClientRect();
                 
        this.setState({
            x: pos.x,
            y: pos.y
        },() => {});       
    }

    onClick(){
        if(this.state.click == false)
        {
            this.setState({click: true},() => {});
        }
        else
        {
            this.setState({click: false},() => {});
        }
    }

    calcDistance(){
        let distance = {x: 0, y:0}
        let x = this.props.middleX - this.state.x
        let y = this.props.middleY - this.state.y
        distance.x = x;
        distance.y = y;
        
        return distance;
    }

    dotClick(clickedDate){
        this.props.dotClick(clickedDate.getFullYear());
    }

    hideDots(value){
        this.props.hideDots(value)
    }


    calcDots(distance){
        const dates = this.props.dates;
        const allDates = this.props.allDates;
        let listItems = dates.map((date, index) =>
            {
                const removeNewDatasetValue = this.props.removeNewDatasetValue;
                const removeOldDatasetValue = this.props.removeOldDatasetValue;
                let dot;

                //console.log(this.props.searchLocation);
                //console.log(this.props.filterYear);
               
                const allDateIndex = allDates.indexOf(date);
                if(allDateIndex <= removeOldDatasetValue && allDateIndex >= removeNewDatasetValue)
                {
                    //console.log(1);
                    if(this.props.searchLocation !== undefined &&
                       this.props.searchLocation !== null && 
                       this.props.locations[index] !== undefined &&
                       this.props.searchLocation.length !== 0)
                    {
                        //console.log(6);
                        //console.log(this.props.locations[index].length);
                        //console.log(this.props.locations[index].search(this.props.searchLocation));
                        //console.log(this.props.locations[index]);
                        //console.log(this.props.searchLocation);
                        //console.log(this.props.filterYear);
                        //console.log(date.getFullYear());
                        
                        /* filter location + time */
                        if( this.props.locations[index].length !== 0 &&
                            this.props.locations[index].search(this.props.searchLocation) != -1 && 
                            this.props.filterYear != -1 && 
                            date.getFullYear() == this.props.filterYear)
                        {
                            dot = <Dot showAllDots={this.props.showAllDots} hideDots={this.hideDots} showAll={false} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={date} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={this.state.diameter}></Dot>      
                        }
                        /* filter only location */
                        else if( this.props.filterYear == -1 && 
                                 date.getFullYear() != this.props.filterYear &&
                                 this.props.locations[index].length != 0 &&
                                 this.props.locations[index].search(this.props.searchLocation) != -1)
                        {
                            dot = <Dot showAllDots={this.props.showAllDots} hideDots={this.hideDots} search={false} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={date} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={this.state.diameter}></Dot>
                        }
                        else{}
                    }
                    /* filter only time */
                    else if(this.props.filterYear != -1 && date.getFullYear() == this.props.filterYear)
                    {
                        dot = <Dot showAllDots={this.props.showAllDots} hideDots={this.hideDots} showAll={false} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={date} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={this.state.diameter}></Dot>
                    }
                    /* show all */
                    else if(this.props.filterYear == -1 && date.getFullYear() != this.props.filterYear)
                    {
                        dot = <Dot showAllDots={this.props.showAllDots} hideDots={this.hideDots} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={date} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={this.state.diameter}></Dot>
                    }           
                    //console.log("");
                }
               
                return dot;
            }  
        )
        //console.log("__________________________________");
        return listItems
    }

    render() {

        if(this.props.gotInformation == false)
        {
            return (
                <div className="loading"></div>
            )
        }
        else
        {
            let distance = this.calcDistance();
          
            let click;

            
            let styles = {
                //backgroundColor: this.props.color,
                alignSelf: this.props.alignSelf, 
                justifySelf: this.props.justifySelf, 
                opacity: this.props.opacity,
                width: this.state.diameter + "px",
                height: this.state.diameter + "px",
            };

        
            if(this.state.click == true)
            {
                let textStyle = {
                    position: "relative",
//                    top: "40px",
                    left:"70px",
                }
                click = <p style={textStyle} >{this.props.title}</p>
            }

            //onClick={this.onClick}
            return (
                <div ref={this.refCallback} className="plattformDot" style={styles}>
                    {click}
                    {this.calcDots(distance)}
                </div>
            );
        }        
    }
}


Dot.PlattformDot = {
    dotClick: PropTypes.func,
    hideDots: PropTypes.func
  }

export default PlattformDot;
