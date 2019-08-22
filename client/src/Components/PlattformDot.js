import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
const axios = require('axios');
import Dot from './Dot'

class PlattformDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           click: false,
           gotInformation: false,
           x: 0,
           y: 0,
           dates: [],
           locations: [],
           diameter: 50,
        };
        this.onClick = this.onClick.bind(this);
        this.calcDistance = this.calcDistance.bind(this);
        this.findNewestPost = this.findNewestPost.bind(this);
        this.findOldestPost = this.findOldestPost.bind(this);            
        this.calcDots = this.calcDots.bind(this); 
    }

    
    async componentDidMount() {
        if(this.props.title === 'Flickr')
        {
            let dataSet =[];
            let date = [];
            let location = [];
            
            const response = await fetch('/flickr')
            const flickrSet = await response.json();
            for(let i = 0; i < flickrSet.length; ++i)
            {
               await axios.get(' https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=061fec8f4fe3345cb146b8b6c0f85608&photo_id=' + flickrSet[i].id + '&format=json&nojsoncallback=1')
                .then((response) => {
                    dataSet.push(response.data);
                })
                .catch((err) => {
    
                })
            }

            let size = dataSet.length;
            for(let x = 0; x < size; ++x)
            {
                location.push(dataSet[x].photo.owner.location);
                date.push(new Date(dataSet[x].photo.dates.taken));
                date.sort((a,b) => { return b.getTime() - a.getTime();});
            }   
            for(let x = 0; x < size; ++x)
            {
                console.log(date[x]);
            }   
            this.setState({
                dates: date,
                locations: location,
                gotInformation: true
            },() => {});      
        }
        if(this.props.title === 'Tumblr')
        {
            fetch('/tumblr')
                .then(res => res.json())
                .then(tumb => {
                    let date = [];
                    let location = [];
                    let size = tumb.length;
                    for(let x = 0; x <size; ++x)
                    {
                        location.push(tumb[x].location);
                        date.push(new Date(tumb[x].date));
                        date.sort((a,b) =>
                        {
                            return b.getTime() - a.getTime();
                        });
                    }
                    this.setState({
                        dates: date,
                        locations: location,
                        gotInformation: true
                    },() => {});          
                });
        }
        else if(this.props.title === 'Twitter')
        {
            fetch('/twitter')
                .then(res => res.json())
                .then(tweet => {
                    let date = [];
                    let location = [];
                    let size = tweet.length;

                    for(let x = 0; x < size; ++x)
                    {
                        date.push(new Date(tweet[x].user.created_at));
                        date.sort((a,b) =>
                        {
                            return b.getTime() - a.getTime();
                        });

                        location.push(tweet[x].user.location);
                    }
                    this.setState({
                        dates: date,
                        locations: location,
                        gotInformation: true
                    },() => {});         
                    
                }); 
        }
      
        this.forceUpdate();
    };


    findNewestPost(){
        let newestPost = this.state.dates[0];
        let size = this.state.dates.length;
        for(let x = 0; x <size; ++x)
        {
            if(newestPost < this.state.dates[x])
            {
                newestPost = this.state.dates[x];
            }
        }
       return newestPost;
    }

    findOldestPost(){
        let oldestPost = this.state.dates[0];
        let size = this.state.dates.length;
        for(let x = 0; x <size; ++x)
        {
            if(oldestPost > this.state.dates[x])
            {
                oldestPost = this.state.dates[x];
            }
        }
       return oldestPost;
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

    calcDots(distance, oldestPost, newestPost){
        const dates = this.state.dates;
        let listItems = dates.map((date, index) =>
            {
                const howMany = this.props.howMany;

                const removeNewDatasetValue = this.props.removeNewDatasetValue;
                const removeOldDatasetValue = this.props.removeOldDatasetValue;
                let dot;

               
                if(removeOldDatasetValue != -1) {
                    if(this.props.showAllLocations == false){
                        if(this.props.searchLocation != undefined && 
                            this.state.locations[index] != undefined &&
                            this.state.locations[index].search(this.props.searchLocation) != -1){
                            if(this.props.searchLocation == "" || this.state.locations[index] == ""){}
                            if(index <= removeOldDatasetValue && index >= removeNewDatasetValue)
                            {
                                dot = <Dot searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.state.locations[index]} date={date} distance={distance} oldest={oldestPost} newest={newestPost} diameter={this.state.diameter}></Dot>
                            }
                        }    
                    }
                    else{
                        if(index <= removeOldDatasetValue && index >= removeNewDatasetValue)
                        {
                            dot = <Dot color={this.props.color} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.state.locations[index]} date={date} distance={distance} oldest={oldestPost} newest={newestPost} diameter={this.state.diameter}></Dot>
                        }                    
                    }                   
                }
                else{

                }
                return dot;
            }  
        )
        return listItems
    }

    render() {

        if(this.state.gotInformation == false)
        {
            return (
                <React.Fragment/>
            )
        }
        else
        {
            let distance = this.calcDistance();
            const oldest = this.findOldestPost();
            const newest = this.findNewestPost();
          
            let click;

            
            let styles = {
                backgroundColor: this.props.color,
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

              
            return (
                <div ref={this.refCallback} className="plattformDot" style={styles} onClick={this.onClick}>
                    {click}
                    {this.calcDots(distance, oldest, newest)}
                </div>
            );
        }        
    }
}


export default PlattformDot;
