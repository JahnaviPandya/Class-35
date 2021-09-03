var ball1, database, position ;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";
    var ball1position = database.ref('ball/position');
    ball1position.on("value", readPosition, showerror);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x + x, 
        'y' : position.y + y
    })
}

function readPosition(data){
    position = data.val();
    ball1.x = position.x;
    ball1.y = position.y;
}

function showerror(){
    console.log("data not recieved from the database");
}