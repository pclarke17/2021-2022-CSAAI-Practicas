const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brickRowCount = 6;
const brickColumnCount = 8;

let score = 0;
const delay = 500;

let start = document.getElementById("start");


/* Estas son las propiedades de la pelota */
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 3,
    dx: 4,
    dy: -4,
    visible: true
  };

/* Estas son las propiedades de la raqueta */
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 100,
    h: 10,
    speed: 7,
    dx: 0,
    visible: true
  };

/* Estas son las propiedades de los ladrillos */
const brickInfo = {
    w: 70,
    h: 18,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
  };

/* Ladrillos */
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

/* Funcionamiento de la pelota en canvas */
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
     ctx.fillStyle = ball.visible  ? '#000000' : 'transparent';;
    ctx.fill();
    ctx.closePath();
  }

/* Funcionamiento de la raqueta en canvas */
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#000000' : 'transparent';
    ctx.fill();
    ctx.closePath();
  }

/* Puntuación en canvas */
function drawScore() {
    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 340, 40);
  }

/* Funcionamiento de los ladrillos en canvas */
function drawBricks() {
    bricks.forEach(column => {
      column.forEach(brick => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? '#000000' : 'transparent';
        ctx.fill();
        ctx.closePath();
      });
    });
  }

/* Como mover la raqueta */
function movePaddle() {
    paddle.x += paddle.dx;
  
    /* Con esto detectamos el muro */
    if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
    }
  
    if (paddle.x < 0) {
      paddle.x = 0;
      }
}

/* Movimiento de la pelota */
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    /* Colisión derecha e izquierda */
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    /* Colisión arriba y abajo */
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
    }

    /* Colisión con la raqueta */
    if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }


    /* Colisión con los ladrillos */
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w &&
                ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });

    /* Cuando perdemos */
    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

/* Sumar +1 a la puntuación */
function increaseScore() {
    score++;
  
    if (score % (brickRowCount * brickColumnCount) === 0) {
  
        ball.visible = false;
        paddle.visible = false;
  
        setTimeout(function () {
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;
        },delay)
    }
  }

  function vidas (){
    ctx.fillStyle = 'black';
    ctx.fillText(String(lives)+' '+String(score),canvas.width/2,40);

  }
/* Aparecen los ladrillos */
function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
    });
  }

  /* Dibujar */
function draw() {
    /* clear canvas */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
  }

/* Actualizar canvas */
function update() {
    movePaddle();
    moveBall();
  
    draw();
  
    requestAnimationFrame(update);
  }

  update();

  /* Evento tecla down */
function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
    }
  }
  
  /* Evento tecla up */
  function keyUp(e) {
    if (
      e.key === 'Right' ||
      e.key === 'ArrowRight' ||
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      paddle.dx = 0;
    }
  }
  
  start.onclick =() =>{
    ball.x = 255;
    ball.y = 400;
    showAllBricks();
    score = 0;
  }
  /* Controladores de lo que toquemos en el teclado*/
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);