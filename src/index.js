window.onload = () => {
    //init variables
    const squareNumbers = 24;
    let gameTimer = 5;
    let lives = 3;
    const gameArea = document.getElementsByClassName('game-area');
    const startButton = document.getElementById('startBtn');
    const timer = document.getElementById('timer');
    timer.innerText = `Pozostały czas: ${gameTimer} sek`;
    let timerWorking = false;

  //draw game area
    const drawGameArea = () => {
        for(let i=0; i<squareNumbers; i++){
           let singleSquare = document.createElement('div');
           singleSquare.innerText = i;
           singleSquare.classList.add('single-square', 'col-sm-2');
           gameArea[0].appendChild(singleSquare);
        }
    };


    //start game
    startButton.onclick = () => {
        if(!timerWorking){
            let timerInterval = setInterval(()=>{
                if(gameTimer>=1){
                    gameTimer -=1;
                    timer.innerText = `Pozostały czas: ${gameTimer} sek`;
                }else {
                    clearInterval(timerInterval)
                    return alert("'Time's up!")
                }
            },1000);
            timerWorking = true;
        }
    };

    drawGameArea();
};