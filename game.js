var myGamePiece;
var spwanpoint=0;
var type=0;
var myObstacles = [];
var myScore;
var explosion;

function startGame() {
    myGamePiece = new component(40, 70, "car6.png",200,400, "image");
    myGamePiece.gravity = 0.00;
    myScore = new component("30px", "Impact", "white", 150, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 420;
        this.canvas.height = 500;
		this.canvas.id="demo";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
		 window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })

function mouseDown() {
  accelerate(-0.2);
}

function mouseUp() {
  accelerate(0.05);
}
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
	this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
			
        } 
		if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);}
		
		else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
			//ctx.drawImage(myGamePiece,this.x,this.y,this.height,this.width);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.hitBottom = function() {
       
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom< othertop) || (mytop> otherbottom-20) || (myright < otherleft) || (myleft> otherright) ) {
            crash = false;
			
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
        	
		
            return;
        } 
		 	
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(80)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        //gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		spawnpoint= Math.floor(Math.random() * (300 - 100 + 1) ) + 100;
        type= Math.floor(Math.random() * (7 - 1 + 1) ) + 1;
		if(type==1)
		{
		 myObstacles.push(new component(40, 70,"car1.png" , spawnpoint, 0,"image"));
		}
		 else
		 if(type==2)
		 {
		 myObstacles.push(new component(40, 70,"car2.png" , spawnpoint, 0,"image"));
		 }
		 else
		 if(type==3)
		 {
		 myObstacles.push(new component(40, 70,"car3.png" , spawnpoint, 0,"image"));
		 }
		 else
		if(type==4)
		 {
		  myObstacles.push(new component(40, 70,"car4.png" , spawnpoint, 0,"image"));
		 }
		 else
		 if(type==5)
		 {
		  myObstacles.push(new component(40, 70,"car5.png" , spawnpoint, 0,"image"));
		 }
		 else
		 if(type==6)
		 {
		  myObstacles.push(new component(50, 50,"barrel.png" , spawnpoint, 0,"image"));
		 }
		  else
		 if(type==7)
		 {
		  myObstacles.push(new component(60, 50,"roadblock.png" , spawnpoint, 0,"image"));
		 }
		
		
		
		
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 4;
		
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
	myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -3; 
}

function moveright() {
    myGamePiece.speedX = 3; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
