class Canvas { 
    constructor(name) 
    {    
        this.name = name;  
        this.canvas = this.refs.name
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }


    create(){
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#92B901";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    clearCanvas() {
        var ctx = this.canvas.getContext("2d");
        //ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.clearRect(0, 0, 50, 50);
    }
};


export default Canvas;