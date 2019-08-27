import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/TextinputField.css';

class TextinputField extends Component {
    constructor(props){
        super(props);
        this.state = {
            textValue: "",            
            check: true,            
        };
        this.handleText = this.handleText.bind(this);
        this.searchLocation = this.searchLocation.bind(this);
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
    } 
    
    
    handleText(event) {
        this.setState({textValue: event.target.value},() => {});
    }

    searchLocation(){
        this.onClickCheckbox();
        this.props.searchLocationData(this.state.textValue);
    }

    onClickCheckbox(){
        if(this.state.check == true){
            this.setState({textValue: "",
                           check: false}, () => {this.props.removeLoctionSearch(this.state.check)});
        }
        else{
            this.setState({check: true}, () => {this.props.removeLoctionSearch(this.state.check)});
        }
    }

    onEnter(event){
        if (event.keyCode === 13) 
        {
            this.onClickCheckbox();
        }
    }



    render() {
     
        return (
            <div className="field">
                <input type="text" 
                       value={this.state.textValue} 
                       onChange={this.handleText}
                       onKeyPress={this.enter}
                       placeholder="Find Location name ..."/>
                <div className="button" onClick={this.searchLocation}><p>Search</p></div>
                <input
                    type="checkbox"
                    checked={this.state.check}
                    onChange={this.onClickCheckbox} />            
            </div>
        );
    }
}

TextinputField.propTypes = {
    searchLocationData: PropTypes.func,
    removeLoctionSearch: PropTypes.func
}


export default TextinputField;