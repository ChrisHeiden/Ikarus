class Dot { 
    constructor(x,y,radius,startAngle,endAngle)
    {    
        this.circle = new Path2D();

        this.x = x;    
        this.y = y; 
        this.startAngle = startAngle;    
        this.endAngle = endAngle; 
        this.radius = radius;    
    }

    redefineSize(x,y,radius,startAngle,endAngle){
        this.circle.arc(x, y, radius, startAngle, endAngle);
    }

    defineSize(){
        this.circle.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    }

    shrink(newRadius){
        this.radius = newRadius;
        defineSize();
    }

    expand(newRadius){
        this.radius = newRadius;
        defineSize();
    }
};
