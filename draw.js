function Draw(cobj,setting){
   this.cobj=cobj;
   this.type=setting.type||"stroke";
   this.color=setting.color||"#000";
   this.width=setting.width||"1";
}
Draw.prototype={
    init:function(){
        this.cobj.strokeStyle=this.color;
        this.cobj.fillStyle=this.color;
        this.cobj.lineWidth=this.width;
    },
    rect:function(x,y,x1,y1){
        this.init();
        this.cobj.beginPath();
        this.cobj.rect(x, y, x1-x, y1-y);
        if(this.type=="stroke"){
            this.cobj.stroke();
        }else{
            this.cobj.fill();
        }
    },
    circle:function(x,y,x1,y1){
        this.init();
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x, y, r, 0, Math.PI*2);
        if(this.type=="stroke"){
            this.cobj.stroke();
        }else{
            this.cobj.fill();
        }
    },
    line:function(x,y,x1,y1){
        this.init();
        this.cobj.beginPath();
        this.cobj.moveTo(x, y);
        this.cobj.lineTo(x1, y1);
        this.cobj.stroke();
    },
    poly:function(x,y,x1,y1,num){
        this.init();
        this.cobj.beginPath();
        this.cobj.save();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var nx=r*Math.cos(Math.PI/num);
        var ny=r*Math.sin(Math.PI/num);
        this.cobj.translate(x, y);
        this.cobj.rotate(Math.PI/2);
        this.cobj.moveTo(nx, ny);
        for (var i = 0; i <=num; i++) {
            this.cobj.save();
            this.cobj.rotate(i*Math.PI/180*(360/num));
            // this.cobj.rotate(Math.PI/2);
            // this.cobj.beginPath();
            // this.cobj.moveTo(nx, ny);
            this.cobj.lineTo(nx,-ny);
            if(this.type=="stroke"){
                this.cobj.stroke();
            }else{
                this.cobj.fill();
            }
            this.cobj.restore();
        };
        cobj.restore();
    },
    jiao:function(x,y,x1,y1,jiaonum){
        this.cobj.save();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        var angle=360/(this.jiaonum*2)*Math.PI/180;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaonum*2;i++){
            if(i%2==0) {
                this.cobj.lineTo(x + Math.cos(angle*i) * r, y + Math.sin(angle*i) * r);
            }else{
                this.cobj.lineTo(x + Math.cos(angle*i) * r1, y + Math.sin(angle*i) * r1);
            }
        }
            if(this.type=="stroke"){
                this.cobj.stroke();
            }else{
                this.cobj.fill();
            }
        this.cobj.restore();
    },
    pen:function(x,y,x1,y1){
        this.init();
        var cobj=this.cobj;
        cobj.lineTo(x1,y1);
        cobj.stroke();
    },
    eraser:function(x,y,x1,y1){
        this.init();
        var cobj=this.cobj;
        cobj.clearRect(x1,y1,10,10);
    },
    cut:function(x,y,x1,y1){
        this.init();
        var cobj=this.cobj;
        cobj.save();
        cobj.setLineDash([4,2]);
        cobj.strokeStyle="#999";
        cobj.lineWidth="1";
        cobj.beginPath();
        cobj.rect(x, y, x1-x, y1-y);
        cobj.stroke();
        cobj.restore();
    }

}