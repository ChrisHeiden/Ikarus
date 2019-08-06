import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import MiddleDot from './MiddleDot'

class InfoVis extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    } 
    

    render() {

        return (
            <div className="infoVisGridPos dotPos gridVis">
                <MiddleDot 
                        twitter={this.props.twitter} 
                        instagram={this.props.instagram}
                        tumblr={this.props.tumblr}
                        searchLocation={this.props.searchLocation} 
                        howMany={this.props.howMany} 
                        removeNewDatasetValue={this.props.removeNewDatasetValue} 
                        removeOldDatasetValue={this.props.removeOldDatasetValue} 
                        alignSelf="center" 
                        justifySelf="center" 
                        opacity=".1"/>   
            </div>
        );
    }
}


export default InfoVis;