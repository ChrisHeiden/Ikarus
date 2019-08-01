import React, { Component } from 'react';
import '../Style/InputBox.css';
import '../Style/General.css';

class InfoBox extends Component {
    
    constructor(props){
        super(props);
    } 



    render() {
        return (
            <div className="infoBoxGridPos box">
                <h1>About the App</h1>
                <p className="focusField">
                    In this project we try to visulize twitter data. In this specific case
                    the server gets tweets abount climate change. Even more it tries to 
                    present locations in which the hashtag <strong>#climatechange</strong> is used more often.
                    This bubbles are bigger then others. Futhermore, you can filter the 
                    the amount of locations they at least have to have, and you can filter by locations.

                    <br></br>            
                    <br></br>            
                    The project is called Ikarus. This name is specificially chose by the programmer.
                    Ikarus tried to escape the Labyrint with wing out of wachs. However, the fly too 
                    near the sun, and so he fall and died. The same happens with our economy. We try to 
                    maximaize our economy all the time without think about the danger. On of the results 
                    is climate change and if we don't careful, we will also fall. 
                </p>
            </div>
        );
    }
}

export default InfoBox;