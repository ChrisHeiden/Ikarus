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
        this.countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Côte d'Ivoire","Cabo Verde	","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Holy See","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya	","Kiribati	","Kuwait	","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine State","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa	","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];           
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
                date.push(dataSet[x].photo.dates.taken);
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
                    }
                    this.setState({
                        dates: date,
                        locations: location,
                        gotInformation: true
                    },() => {});          
                });
                //console.log("");
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
        else if(this.props.title === 'Instagram')
        {
            console.log("test");
            fetch('/instagram')
            .then(res => res.json())
            .then(tumb => {
                let date = [];
                let location = [];
                let size = tumb.length;
                for(let x = 0; x <size; ++x)
                {
                    location.push(tumb[x].location);
                    date.push(new Date(tumb[x].date));
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

        if(this.props.title === 'Flickr')
        {
            console.log(dates);
        }

        let listItems = dates.map((date, index) =>
            {
                const howMany = this.props.howMany;

                const removeNewDatasetValue = this.props.removeNewDatasetValue;
                const removeOldDatasetValue = this.props.removeOldDatasetValue;
                let dot;
               
                if(removeOldDatasetValue != -1) {
                    /*if(this.state.locations[index] == undefined || 
                       this.state.locations[index] == "" || 
                       this.props.searchLocation == undefined || 
                       this.props.searchLocation == "")
                    {

                    }*/
                    //else{
                        //if(this.state.locations[index].search(this.props.searchLocation) == -1)
                        //{

                        //}
                        //else{
                            if(index <= removeOldDatasetValue && index >= removeNewDatasetValue)
                            {
                                dot = <Dot searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.state.locations[index]} date={date} distance={distance} oldest={oldestPost} newest={newestPost} diameter={this.state.diameter}></Dot>
                            }
                        //}
                    //}
                    
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
                alignSelf: this.props.alignSelf, 
                justifySelf: this.props.justifySelf, 
                opacity: this.props.opacity,
                width: this.state.diameter + "px",
                height: this.state.diameter + "px",
            };

            if(this.props.title == 'Flickr')
            {
                console.log(this.state.dates);
                console.log(this.state.locations);
            }
            if(this.state.click == true)
            {
                click = <p>{this.props.title}</p>
            }

              
            return (
                <div ref={this.refCallback} className="testDot" style={styles} onClick={this.onClick}>
                    {click}
                    {this.calcDots(distance, oldest, newest)}
                </div>
            );
        }        
    }
}


export default PlattformDot;
