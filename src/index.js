window.onload = () => {
    //init variables
    //dom ones
    const gameArea = document.getElementsByClassName('game-area');
    const startButton = document.getElementById('startBtn');
    const stopButton = document.getElementById('stopBtn');
    const timerDisplayer = document.getElementById('timer');
    const pointsDisplayer = document.getElementById('points');
    const livesDisplayer = document.getElementById('lives');

    //game ones
    const squareNumbers = 24;
    let gameTimer = 5;
    let lives = 3;
    let gameWorking = false;
    let timerInterval;
    let points = 0;
    let paintSquareInterwal;
    let paintedSquare = false;

  //draw game area
    const drawGameArea = () => {
        for(let i=0; i<squareNumbers; i++){
           let singleSquare = document.createElement('div');
           singleSquare.innerText = i;
           singleSquare.classList.add('single-square', 'col-sm-2');
           singleSquare.id = i;
           gameArea[0].appendChild(singleSquare);
        }
    };

    //start timer fn
    const startTimer = (gameTimer = 7) => {
        if(!timerInterval){
            timerInterval = setInterval(()=>{
                if(gameTimer>=1){
                    gameTimer -=1;
                    timerDisplayer.innerText = `Pozostały czas: ${gameTimer} sek`;
                }else {
                    clearInterval(timerInterval);
                    clearInterval(paintSquareInterwal);
                    return alert("'Time's up!")
                }
            },1000);
        }
    };

    //selectRandomSquare fn
    const selectSquare = () => {
        if(!paintSquareInterwal){
            paintSquareInterwal = setInterval(() => {
                if(paintedSquare){
                    let selectColouredSquare = document.getElementsByClassName('selectedSquare')
                    selectColouredSquare[0].classList.remove('selectedSquare')
                }
                const selectedSquareId = Math.floor(Math.random() * 24)
                const selectedSquare = document.getElementById(`${selectedSquareId}`)
                selectedSquare.classList.add('selectedSquare')
                paintedSquare = true;
            }, 2000);
        }
    };

    //start game fn
    const startGame = () => {
        startTimer();
        selectSquare();
    };

    //start game btn
    startButton.onclick = startGame;

    //restart game btn
    stopButton.onclick = () => {
        clearInterval(timerInterval);
        clearInterval(paintSquareInterwal);
        gameTimer = 10;
        timerDisplayer.innerText = `Pozostały czas: ${gameTimer} sek`;
        lives = 2;
        livesDisplayer.innerText = `Życia: ${lives}`;
        points = 0;
        pointsDisplayer.innerText = `Punkty: ${points}`;
        gameWorking = false;
    };


    drawGameArea();
};