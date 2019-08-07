import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/InputBox.css';
import '../Style/General.css';
import Slider from './Slider'
import CheckBox from './CheckBox'
import TextinputField from './TextinputField'

class InputBox extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            twitter: true,
            tumblr: true,
            instagram: true,
        };        
        this.removeOldDatasets = this.removeOldDatasets.bind(this);
        this.removeNewDatasets = this.removeNewDatasets.bind(this);
        this.searchLocationData = this.searchLocationData.bind(this);
        this.isChecked = this.isChecked.bind(this);
    } 

    searchLocationData(location) {
        this.props.searchLocationData(location);
    }

    removeOldDatasets(number){
        this.props.removeOldDatasets(number);
    }

    removeNewDatasets(number){
        this.props.removeNewDatasets(number);
    }

    isChecked(plattform){
        if(plattform == "Tumblr")
        {
            if(this.state.tumblr == false)
            {
                this.setState({
                    tumblr: true
                })
            }
            else
            {
                this.setState({
                    tumblr: false
                })
            }
        }
        else if(plattform == "Twitter")
        {
            if(this.state.twitter == false)
            {
                this.setState({
                    twitter: true
                })
            }
            else
            {
                this.setState({
                    twitter: false
                })
            }
        }
        else if(plattform == "Instagram")
        {
            if(this.state.instagram == false)
            {
                this.setState({
                    instagram: true
                })
            }
            else
            {
                this.setState({
                    instagram: false
                })
            }
        }
        this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)
    }

    render() {
        return (
            <div className="box inputBoxGridPos">
                <h1>Filters</h1>
                <div className="line"></div>
                <div className="focusField">
                    <p>Remove oldest Datasets</p>
                    <Slider removeDatasets={this.removeOldDatasets} step={1} min={0} max={100} value={100}/>
                    <p>Remove newest Datasets</p>
                    <Slider removeDatasets={this.removeNewDatasets} value={0} step={1} min={0} max={100}/>
                    <p>Name of the Locations</p>
                    <TextinputField searchLocationData={this.searchLocationData}/>
                    <p>Plattform</p>
                    <CheckBox initCheck={this.state.twitter} isChecked={this.isChecked} title={"Twitter"}/>
                    <CheckBox initCheck={this.state.tumblr} isChecked={this.isChecked} title={"Tumblr"}/>
                    <CheckBox initCheck={this.state.instagram} isChecked={this.isChecked} title={"Instagram"}/>
                </div>
            </div>
        );
    }
}

InputBox.propTypes = {
    getAmount: PropTypes.func,
    lookUpPlattform: PropTypes.func
 }
//TODO: change max to real Max value that has been found
export default InputBox;