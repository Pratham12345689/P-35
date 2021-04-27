var ball;
var database;
var bg,gh;



function preload(){
    bg=loadImage("bg.png");
    gh=loadImage("gh.png");
}


function setup(){
    createCanvas(900,500);
    database=firebase.database();
    ball = createSprite(250,250,10,10);
    ball.scale=0.6;
   ball.addImage(gh);
    var loc=database.ref("ball/position");
    loc.on("value",readop);
}


function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
    }
    drawSprites();
}

function changePosition(x,y){
   database.ref("ball/position").set({
       'x':position.x+x,
       'y':position.y+y
   })
}
function readop(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;
}