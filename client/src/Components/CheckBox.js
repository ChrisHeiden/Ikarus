import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            check: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    } 

    componentWillMount(){
        this.setState({
            check: this.props.initCheck,
        })
    }

    handleInputChange(event) {
       if(this.state.check == false)
       {
            this.setState({
                check: true
            })
       }
       else
       {
            this.setState({
                check: false
            })
       }
        this.props.isChecked(this.props.title);
    }


    render() { 
    
        return (
            <label className="container">{this.props.title}
                <input
                    type="checkbox" 
                    checked={this.state.check}
                    onChange={this.handleInputChange} />
            </label>
        );
    }
}

CheckBox.propTypes = {
    isChecked: PropTypes.func
 }


export default CheckBox;