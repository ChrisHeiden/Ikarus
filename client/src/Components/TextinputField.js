import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/TextinputField.css';

class TextinputField extends Component {
    constructor(props){
        super(props);
        this.state = {
            textValue: "",            
        };
        this.handleText = this.handleText.bind(this);
        this.searchLocation = this.searchLocation.bind(this);
    } 
    
    
    handleText(event) {
        this.setState({textValue: event.target.value});
    }

    searchLocation(){
        console.log(this.state.textValue);
        this.props.searchLocationData(this.state.textValue);
    }


    render() {
     
        return (
            <div className="field">
                <input type="text" 
                       value={this.state.textValue} 
                       onChange={this.handleText}
                       placeholder="Find Location name ..."/>
                <div className="button" onClick={this.searchLocation}><p>Search</p></div>
            </div>
        );
    }
}

TextinputField.propTypes = {
    searchLocationData: PropTypes.func
}


export default TextinputField;