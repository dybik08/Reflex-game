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
    let executed;

  //draw game area
    const drawGameArea = () => {
        for(let i=0; i<squareNumbers; i++){
           let singleSquare = document.createElement('div');
           singleSquare.innerText = i;
           singleSquare.classList.add('single-square', 'col-sm-2');
           singleSquare.id = i;
           singleSquare.onclick = onSquareClick;
           gameArea[0].appendChild(singleSquare);
        }
    };

    //start timer fn
    const startTimer = (gameTimer = 20, lives=5) => {
        if(!timerInterval){
            timerInterval = setInterval(()=>{
                lives = livesDisplayer.innerHTML.substr(-1);
                if(gameTimer>=1 && lives>0){
                    gameTimer -=1;
                    timerDisplayer.innerText = `Pozostały czas: ${gameTimer} sek`;
                }else {
                    clearInterval(timerInterval);
                    clearInterval(paintSquareInterwal);
                    return alert("You lost!!!!!")
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
                    lives --;
                    livesDisplayer.innerText = `Życia: ${lives}`;
                    alert(`Straciłeś życie. Zostało Ci ${lives} szans `)
                }
                const selectedSquareId = Math.floor(Math.random() * 24)
                const selectedSquare = document.getElementById(`${selectedSquareId}`)
                selectedSquare.classList.add('selectedSquare')
                paintedSquare = true;
            }, 2000);
        }
    };

    //button clicked
    const onSquareClick = () => {
        let squareClicked = event.target;
        if (squareClicked.classList.contains('selectedSquare')) {
            squareClicked.classList.remove('selectedSquare')
            paintedSquare = false;
            points++;
            pointsDisplayer.innerText = `Punkty: ${points}`;
        }else{
            lives = livesDisplayer.innerHTML.substr(-1);
            lives --;
            if(lives>0){
                livesDisplayer.innerText = `Życia: ${lives}`;
                alert(`Straciłeś życie. Zostało Ci ${lives} szans `)
            }
            else{
                clearInterval(timerInterval);
                clearInterval(paintSquareInterwal);
                return alert("You lost!!!!!")
            }
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
        timerInterval = undefined;
        paintSquareInterwal = undefined;
        if(paintedSquare){
            let selectColouredSquare = document.getElementsByClassName('selectedSquare')
            selectColouredSquare[0].classList.remove('selectedSquare')
            paintedSquare = false;
        }
        gameTimer = 20;
        timerDisplayer.innerText = `Pozostały czas: ${gameTimer} sek`;
        lives = 5;
        livesDisplayer.innerText = `Życia: ${lives}`;
        points = 0;
        pointsDisplayer.innerText = `Punkty: ${points}`;
        gameWorking = false;
    };


    drawGameArea();
};