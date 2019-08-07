import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import PlattformDot from './PlattformDot'

class MiddleDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           x: 0,
           y: 0,
           diameter: 50,
        };
    }

    refCallback = element => {
        const pos = element.getBoundingClientRect();
        this.setState({x: pos.x},() => {});            
        this.setState({y: pos.y},() => {});
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
      

        if(this.props.tumblr == true)
        {
            opacityTumblr = 1;
        }
        else
        {
            opacityTumblr = 0;
        }

        if(this.props.twitter == true)
        {
            opacityTwitter = 1;
        }
        else
        {
            opacityTwitter = 0;
        }

        if(this.props.instagram ==  true)
        {
            opacityInstagram = 1;
        }
        else
        {
            opacityInstagram = 0;
        }


        return (
            <div className="infoVisGridPos dotPos gridVis">
                <div ref={this.refCallback} className="testDot" style={styles}></div>
              
                <PlattformDot 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue}
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    howMany={this.props.howMany} 
                    alignSelf="end" 
                    justifySelf="end" 
                    opacity={opacityTwitter} 
                    title="Twitter" 
                    middleX={this.state.x}
                    middleY={this.state.y}/>

                <PlattformDot 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue} 
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    howMany={this.props.howMany} 
                    alignSelf="start" 
                    justifySelf="center"
                    opacity={opacityTumblr}
                    title="Tumblr" 
                    middleX={this.state.x} 
                    middleY={this.state.y}/>

    	        <PlattformDot 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue} 
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    howMany={this.props.howMany} 
                    alignSelf="end" 
                    justifySelf="start" 
                    opacity={opacityInstagram}
                    title="Flickr" 
                    middleX={this.state.x}
                    middleY={this.state.y}/>    
            </div>
        ); 
    }
}

export default MiddleDot;
