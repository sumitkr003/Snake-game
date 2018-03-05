function init(){
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    game_over = false;

    score = 0;

    food = getRandomFood();
    snake = {
        init_length:5,
        cells:[],
        color:'yellow',
        direction:'right',

        createSnake: function () {
            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },

        //initialing drawing snake
        drawSnake: function () {
          for(var i=0;i<this.cells.length;i++){
              pen.fillStyle = this.color;
              pen.strokeStyle = "black";
              pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
              pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
          }
        },

        //updating snake(movement of snake)
        updateSnake:function () {
            headX = this.cells[0].x;
            headY = this.cells[0].y;

            if(headX==food.x && headY==food.y){
                food = getRandomFood();
                score+=5;
            }
            else{
                this.cells.pop();
            }

            if(this.direction == "right"){
                nextX = headX + 1;
                nextY = headY;
            }else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }else if(this.direction == "up"){
                nextX = headX;
                nextY = headY - 1;
            }else if(this.direction == "down"){
                nextX = headX;
                nextY = headY + 1;
            }

            this.cells.unshift({x:nextX,y:nextY});

            var last_x = Math.round(W/10);
            var last_y = Math.round(H/10);

            if(this.cells[0].y<0 || this.cells[0].x <0|| this.cells[0].x>last_x || this.cells[0].y>last_y){
                alert("GameOver");
                game_over = true;

            }
        }
    }
    snake.createSnake();

    function KeyPressed(e) {
        if(e.key=="ArrowRight"){
            snake.direction = "right";
        }else if(e.key=="ArrowLeft"){
            snake.direction = "left";
        }else if(e.key=="ArrowUp"){
            snake.direction = "up";
        }else if(e.key=="ArrowDown"){
            snake.direction = "down";
        }
    }

    document.addEventListener('keydown',KeyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    // pen.fillStyle = "green";
    // pen.fillRect(box.x,box.y,box.w,box.h);

    snake.drawSnake();

    pen.fillStyle = food.color;

    pen.fillRect(food.x*10,food.y*10,10,10);

    pen.fillStyle = "white";
    pen.font = "14px Roboto";
    pen.fillText("Score : "+score,10,10);

}

function update(){
    snake.updateSnake();
}

function gameloop(){
    draw();
    update();

    if(game_over==true){
        clearInterval(f);
    }
}

function getRandomFood() {
    var foodx = Math.round(Math.random()*(W-10)/10);
    var foody = Math.round(Math.random()*(H-10)/10);

    foodcolors = ['red','aqua','blue','orange','purple','orchid','coral'];
    var i = Math.round(Math.random()*(foodcolors.length-1));

    var food = {
        x:foodx,
        y:foody,
        color:foodcolors[i]
    }

    return food;
}

init();
var f = setInterval(gameloop,100);