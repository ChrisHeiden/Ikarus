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
        this.removeLoctionSearch = this.removeLoctionSearch.bind(this);
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
                this.setState({tumblr: true},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
            else
            {
                this.setState({tumblr: false},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
        }
        else if(plattform == "Twitter")
        {
            if(this.state.twitter == false)
            {
                this.setState({twitter: true},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
            else
            {
                this.setState({twitter: false},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
        }
        else if(plattform == "Flickr")
        {
            if(this.state.instagram == false)
            {
                this.setState({instagram: true},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
            else
            {
                this.setState({instagram: false},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
        }
    }

    removeLoctionSearch(event){
        this.props.removeLoctionSearch(event);
    }

    render() {
        return (
            <div className="box inputBoxGridPos">
                <h1>Filters</h1>
                <div className="line"></div>
                <div className="focusField">
                    <h3>Remove oldest Datasets</h3>
                    <Slider removeDatasets={this.removeOldDatasets} step={1} min={0} max={this.props.amountFilter} value={this.props.amountFilter}/>
                    <h3>Remove newest Datasets</h3>
                    <Slider removeDatasets={this.removeNewDatasets} value={0} step={1} min={0} max={this.props.amountFilter}/>
                    <h3>Name of the Locations</h3>
                    <TextinputField removeLoctionSearch={this.removeLoctionSearch} searchLocationData={this.searchLocationData}/>
                    <h3>Plattform</h3>
                    <div className="checkboxes">
                        <CheckBox initCheck={this.state.twitter} isChecked={this.isChecked} title={"Twitter"}/>
                        <CheckBox initCheck={this.state.tumblr} isChecked={this.isChecked} title={"Tumblr"}/>
                        <CheckBox initCheck={this.state.instagram} isChecked={this.isChecked} title={"Flickr"}/>
                    </div>
                </div>
            </div>
        );
    }
}

InputBox.propTypes = {
    getAmount: PropTypes.func,
    lookUpPlattform: PropTypes.func,
    removeLoctionSearch: PropTypes.func
 }

 export default InputBox;