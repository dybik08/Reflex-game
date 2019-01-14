window.onload = () => {
    //init variables
    const squareNumbers = 24;
    const gameTimer = 60;
    const lives = 3;

  //draw game area
    const drawGameArea = () => {
        const gameArea = document.getElementsByClassName('game-area');
        for(let i=0; i<squareNumbers; i++){
           let singleSquare = document.createElement('div');
           singleSquare.innerText = i;
           singleSquare.classList.add('single-square', 'col-sm-2');
           gameArea[0].appendChild(singleSquare);

        }
    };

    drawGameArea();
};