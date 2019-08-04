import React, { Component } from 'react';
import '../Style/InputBox.css';
import '../Style/General.css';
import Slider from './Slider'
class InputBox extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            textValue: "",            
        };
    
        this.handleText = this.handleText.bind(this);
    } 

    handleText(event) {
        this.setState({textValue: event.target.value});
    }

    render() {
        console.log(this.props.amountTw)
        console.log(this.state.sliderValue)
        return (
            <div className="box inputBoxGridPos">
                <h1>Filters</h1>
                <div className="focusField">
                    <p>Show how many:</p>
                    <Slider step={1} min={0} max={100} value={100}/>

                    <p>Name of the Locations</p>
                    <input  type="text" value={this.state.textValue} onChange={this.handleText}/>
                   
                    <p>How old can it be</p>
                    <Slider value={0} step={0.1} min={0} max={1}/>
                </div>
            </div>
        );
    }
}

//TODO: change max to real Max value that has been found
export default InputBox;