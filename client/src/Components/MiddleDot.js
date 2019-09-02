import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import PlattformDot from './PlattformDot'
const axios = require('axios');

class MiddleDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           x: 0,
           y: 0,
           diameter: 50,
           dates: [],

           twitterLocations: [],
           twitterDates: [],

           tumblrLocations: [],
           tumblrDates: [],

           flickrLocations: [],
           flickrDates: [],   
           gotInformation: false,  
           timeSearch: -1,   
        };
        this.dotClick = this.dotClick.bind(this); 
        this.hideDots = this.hideDots.bind(this);
        this.sortbyTime = this.sortbyTime.bind(this);
    }

    refCallback = element => {
        const pos = element.getBoundingClientRect();
        this.setState({x: pos.x},() => {});            
        this.setState({y: pos.y},() => {});
    }

    async componentDidMount() {
        let twitterDates = [];
        let tumblrDates = [];
        let flickrDates = [];

        let twitterLocations = [];
        let tumblrLocations = [];
        let flickrLocations = [];

        let date = [];

        /********TWITTER**********/
        fetch('/twitter')
            .then(res => res.json())
            .then(tweet => {
                let size = tweet.length;

                for(let x = 0; x < size; ++x)
                {
                    twitterDates.push(new Date(tweet[x].user.created_at));
                    this.sortbyTime(twitterDates);
                    twitterLocations.push(tweet[x].user.location);
                }    
            }); 

        /********TUMBLR**********/
        fetch('/tumblr')
            .then(res => res.json())
            .then(tumb => {
                let size = tumb.length;
                for(let x = 0; x <size; ++x)
                {
                    tumblrDates.push(new Date(tumb[x].date));
                    this.sortbyTime(tumblrDates);
                    tumblrLocations.push(tumb[x].location);
                }
            });  


        /********FLICKR**********/
        const response = await fetch('/flickr')
        const flickrSet = await response.json();
        for(let i = 0; i < flickrSet.length; ++i)
        {
           await axios.get(' https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=061fec8f4fe3345cb146b8b6c0f85608&photo_id=' + flickrSet[i].id + '&format=json&nojsoncallback=1')
            .then((response) => {
                date.push(response.data);
            })
        }

        let size = flickrSet.length;
        for(let x = 0; x < size; ++x)
        {
            flickrDates.push(new Date(date[x].photo.dates.taken));
            this.sortbyTime(flickrDates);
            flickrLocations.push(date[x].photo.owner.location);
        }   

        /*Combine all datasets*/
        var flickrTwitter = flickrDates.concat(twitterDates); 
        var allDate = flickrTwitter.concat(tumblrDates); 
        this.sortbyTime(allDate);

        this.setState({
            twitterDates: twitterDates,
            tumblrDates: tumblrDates,
            flickrDates: flickrDates,

            twitterLocations: twitterLocations,
            tumblrLocations: tumblrLocations,
            flickrLocations: flickrLocations,

            dates: allDate,
            gotInformation: true,
        }, () =>{
            this.props.getAmountOfDots(this.state.dates.length);
        });
        
        //this.forceUpdate();
    };

    sortbyTime(array){
        array.sort((a,b) => { return b.getTime() - a.getTime();});
    }

    dotClick(clickedDate){
        this.setState({timeSearch: clickedDate},() => {});
    }

    
    hideDots(value){
        this.props.hideDots(value)
    }


    render() { 
        var opacityTwitter;       
        var opacityInstagram;       
        var opacityTumblr;      

        let styles = {
            alignSelf: this.props.alignSelf, 
            justifySelf: this.props.justifySelf, 
            opacity: this.props.opacity,
            width: this.state.diameter + "px",
            height: this.state.diameter + "px",
        };
      

        if(this.props.tumblr == true){ opacityTumblr = 1; }
        else{ opacityTumblr = 0; }

        if(this.props.twitter == true)
        { opacityTwitter = 1; }
        else { opacityTwitter = 0;}

        if(this.props.instagram ==  true)
        { opacityInstagram = 1;}
        else { opacityInstagram = 0;}
    

        return (
            <div className="infoVisGridPos dotPos gridVis">
                <div ref={this.refCallback} className="plattformDot" style={styles}></div>
              
                <PlattformDot 
                    showDistribution={this.props.showDistribution}
                    hideDots={this.hideDots} 
                    showAllDots={this.props.showAllDots}
                    filterYear={this.props.filterYear}
                    timeSearch={this.state.timeSearch}
                    dotClick={this.dotClick}
                    showAllLocations={this.props.showAllLocations} 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue}
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    alignSelf="end" 
                    justifySelf="end" 
                    opacity={opacityTwitter} 
                    title="Twitter" 
                    color={"#1DA1F2"}
                    middleX={this.state.x}
                    middleY={this.state.y}
                    allDates={this.state.dates}
                    dates={this.state.twitterDates}
                    locations={this.state.twitterLocations}
                    gotInformation={this.state.gotInformation}
                    />

                <PlattformDot 
                    showDistribution={this.props.showDistribution}
                    hideDots={this.hideDots} 
                    showAllDots={this.props.showAllDots}
                    filterYear={this.props.filterYear}
                    timeSearch={this.state.timeSearch}
                    dotClick={this.dotClick}
                    showAllLocations={this.props.showAllLocations} 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue} 
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    alignSelf="start" 
                    justifySelf="center"
                    opacity={opacityTumblr}
                    title="Tumblr" 
                    color={"#001A35"}
                    middleX={this.state.x} 
                    middleY={this.state.y}
                    allDates={this.state.dates}
                    dates={this.state.tumblrDates}
                    locations={this.state.tumblrLocations}
                    gotInformation={this.state.gotInformation}
                    />

                <PlattformDot 
                    showDistribution={this.props.showDistribution}
                    hideDots={this.hideDots} 
                    showAllDots={this.props.showAllDots}
                    filterYear={this.props.filterYear}
                    timeSearch={this.state.timeSearch}
                    dotClick={this.dotClick}
                    showAllLocations={this.props.showAllLocations} 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue} 
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    alignSelf="end" 
                    justifySelf="start" 
                    opacity={opacityInstagram}
                    title="Flickr" 
                    color={"#FF0085"}
                    middleX={this.state.x}
                    middleY={this.state.y}
                    allDates={this.state.dates}
                    dates={this.state.flickrDates}
                    locations={this.state.flickrLocations}
                    gotInformation={this.state.gotInformation}
                    />    
            </div>
        ); 
    }
}

MiddleDot.propTypes = {
    getAmountOfDots: PropTypes.func,
    hideDots: PropTypes.func
 }

export default MiddleDot;
