import React, { Component } from 'react';
//import Canvas from '../Classes/Canvas';
import '../Style/Transition.css';
import '../Style/App.css';

class Transition extends Component {
  
  constructor(props) {
    super(props);
    this.canvas;
  }

  componentDidMount() {
    //let canvas = new Canvas('canvas');

    this.canvas = this.refs.canvasComp
    this.canvas.width  = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
  }

  render() {
    function showInformation(){
      console.log("Infor");
    }

//    canvas.create();

    return (

      <div className="transition">
        <div>
          <h1>Climate Change</h1>
          <button onClick={showInformation}>I</button>
        </div>
        <canvas ref="canvasComp" />

      </div>
    );


  }
}

export default Transition;

/*
updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0,0, 300, 300);
    // draw children “components”
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
  }


  <div class="Transition">
          {createBoxes(10)}
        </div>

{this.state.tweets.map(tweet =>
          <div key={tweet.user.location}>{tweet.user.location}</div>
        )}
        {console.log(this.state.tweets[0])}

        <canvas ref="canvas" width={640} height={425} />     
*/