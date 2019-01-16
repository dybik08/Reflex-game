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

//--------------------------------------
    const Component = (function () {

        'use strict';


        const Component = function (elem, options) {
            if (!elem) throw 'You did not provide an element to make into a component.';
            this.elem = elem;
            this.data = options ? options.data : null;
            this.template = options ? options.template : null;
        };

        //sanitization for safety reasons
        Component.sanitize = function (str) {
            const temp = document.createElement('div');
            temp.textContent = str;
            return temp.innerHTML;
        };


        Component.prototype.render = function () {

            // Make sure there's a template
            if (!this.template) throw 'No template was provided.';

            // If elem is an element, use it.
            // If it's a selector, get it.
            const elem = typeof this.elem === 'string' ? document.querySelector(this.elem) : this.elem;
            if (!elem) return;

            // Get the template
            const template = (typeof this.template === 'function' ? this.template(this.data) : this.template);
            if (['string', 'number'].indexOf(typeof template) === -1) return;

            // Render the template into the element
            if (elem.innerHTML === template) return;
            elem.innerHTML = template;

            // Dispatch a render event
            if (typeof window.CustomEvent === 'function') {
                const event = new CustomEvent('render', {
                    bubbles: true
                });
                elem.dispatchEvent(event);
            }

            // Return the elem for use elsewhere
            return elem;

        };

        return Component;

    })();

    //draw game area
    function drawReactiveGameArea3(times) {
        let repeatedString = '<div class="single-square col-sm-2">'+`${times}`+'</div>';
        while (times < 23) {
            times++;
            repeatedString += '<div class="single-square col-sm-2">'+`${times}`+'</div>';
        }
        return repeatedString;
    }

    const setup = function () {

        // Create the reflex-game component
        reflex = new Component('#app', {
            data: {
                time: 10,
                running: false
            },
            template: function (props) {
                const template =
                    '<div id="reflex">' +
                    (props.time) +
                    '</div>' +
                    '<div class=" col-sm-12 game-wrapper">' +
                        '<div class="col-sm-6 offset-sm-3 game-area">'+
                            (drawReactiveGameArea3(0))+
                        '</div>'+
                        '<div class="wrapper">' +
                            '<button class="btn btn-primary col-sm-2" data-reflex="' + (props.running ? 'stop' : 'start') + '">' + (props.running ? 'Stop' : 'Start') + '</button>' +
                            '<button class="btn btn-primary col-sm-2" data-reflex="reset">Reset</button>' +
                        '</div>'
                    '</div>';

                return template;
            }
        });

        // Render the reflex into the DOM
        reflex.render();

    };


    const start = function () {

        // Render immediately
        reflex.data.running = true;
        reflex.render();

        // Start the timer
        timer = window.setInterval(function () {

            // Update the timer and stop game if it reach 0
            reflex.data.time = reflex.data.time -1;
            if(reflex.data.time>=1){
                reflex.render();
            }else{
                reflex.data.time = 0;
                reflex.render()
                clearInterval(timer)
                alert('Koniec czasu! Przegrałeś!')
            }
        }, 1000);
    };

    /**
     * Stop the timer
     */
    const stop = function () {
        reflex.data.running = false;
        window.clearInterval(timer);
        reflex.render();
    };

    /**
     * Reset the timer
     */
    const reset = function () {
        reflex.data.time = 10;
        stop();
    };

    /**
     * Handle click events
     */
    const clickHandler = function (event) {

        // Check if a reflex action button was clicked
        const action = event.target.getAttribute('data-reflex');
        if (!action) return;

        // If it's the start button, start
        if (action === 'start') {
            start();
            return;
        }

        // If it's the stop button, stop
        if (action === 'stop') {
            stop();
            return;
        }

        // If it's the reflex button, reset
        if (action === 'reset') {
            reset();
        }
    };


// Setup the app
    setup();

// Listen for clicks
    document.addEventListener('click', clickHandler, false);

    //-----------------------Previous app code below for comparison

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
                    return alert("Przegrałeś!")
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
                return alert("Przegrałeś")
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