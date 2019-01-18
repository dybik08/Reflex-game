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
        let repeatedString = '<div data-reflex="clickedSquare" id="' + (times) + '" class="single-square col-sm-2">'+`${times}`+'</div>';
        while (times < 23) {
            times++;
            repeatedString += '<div data-reflex="clickedSquare" id="' + (times) + '" class="single-square col-sm-2">'+`${times}`+'</div>';
        }
        return repeatedString;
    }

    const setup = function () {

        // Create the reflex-game component
        reflex = new Component('#app', {
            data: {
                time: 10,
                running: false,
                lives: 5,
                points: 0,
                paintedSquare: false,
            },
            template: function (props) {
                const template =
                    '<div class="row col-sm-12">' +
                        '<div class="game-info" ><h1 id="lives">Szanse: '+ (props.lives) +'</h1></div>'+
                        '<div class="game-info" ><h1 id="points">Punkty: '+ (props.points) +'</h1></div>'+
                        '<div class="title"><h1>Reflex Game</h1></div>'+
                        '<div id="clock"></div>' +
                    '</div>'+
                    '<div class=" col-sm-12 game-wrapper">' +
                        '<div class="col-sm-9 col-md-6 offset-sm-3 game-area">'+
                            (drawReactiveGameArea3(0))+
                        '</div>'+
                        '<div class="wrapper">' +
                            '<button class="btn btn-primary col-sm-2" data-reflex="' + (props.running ? 'stop' : 'start') + '">' + (props.running ? 'Stop' : 'Start') + '</button>' +
                            '<button id="last" class="btn btn-primary col-sm-2" data-reflex="reset">Reset</button>' +
                        '</div>'
                    '</div>';

                return template;
            }
        });

        clock = new Component('#clock', {
            data:{
                time: 10,
            },
            template: function (props) {
                const template =
                    '<div class="offset-sm-2 game-info" ><h1 id="timer">Pozostały czas: '+ (props.time) + ' sek</h1></div>';

                return template;
            }
        });

        // Render the reflex into the DOM
        reflex.render();
        clock.render();
    };


    const start = function () {

        // Render immediately
        reflex.data.running = true;
        reflex.render()
        clock.render();

        // Start the timer
        timer = window.setInterval(function () {

            // Update the timer and stop game if it reach 0
            clock.data.time = clock.data.time -1;
            if(clock.data.time>=1 && reflex.data.lives>0){
                clock.render();
            }else{
                clock.data.time = 0;
                clock.render()
                clearInterval(timer)
                window.clearInterval(paintSquareInterwal)
                alert('Koniec czasu!')
            }
        }, 1000);

        paintSquareInterwal = window.setInterval(() => {
            if(reflex.data.paintedSquare){
                let selectColouredSquare = document.getElementsByClassName('selectedSquare')
                selectColouredSquare[0].classList.remove('selectedSquare')
                reflex.data.paintedSquare = false;
                reflex.data.lives--;
                alert(`Nie kliknąłeś kwadratu! Zostało Ci ${reflex.data.lives} szans `)
                clock.render()
            }
            const selectedSquareId = Math.floor(Math.random() * 24)
            const selectedSquare = document.getElementById(`${selectedSquareId}`)
            selectedSquare.classList.add('selectedSquare')
            reflex.data.paintedSquare = true;
        }, 2000);
    };

    /**
     * Stop the timer
     */
    const stop = function () {
        reflex.data.running = false;
        reflex.data.paintedSquare = false;
        window.clearInterval(timer);
        if(!paintSquareInterwal) return;
        window.clearInterval(paintSquareInterwal)
        reflex.render()
        clock.render()

    };

    /**
     * Reset the timer
     */
    const reset = function () {
        clock.data.time = 10;
        reflex.data.lives = 5;
        reflex.data.points = 0;
        reflex.render();
        clock.render();
        stop();
    };


    /**
     * On square click
     */
    const onReactiveSquareClick = () => {
        if(!reflex.data.running)return;
        let squareClicked = event.target;
        if (squareClicked.classList.contains('selectedSquare')) {
            squareClicked.classList.remove('selectedSquare')
            reflex.data.paintedSquare = false;
            reflex.data.points++;
            reflex.render();
            clock.render();

        }else{
            reflex.data.lives--;
            if(reflex.data.lives>0){
                alert(`Zły kwadrat! Zostało Ci ${reflex.data.lives} szans `)
                reflex.render();
                clock.render();
            }
            else{
                stop();
                return alert("Skończyły Ci się szanse! Przegrałeś!")
            }
        }
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

        if(action === 'clickedSquare'){
            onReactiveSquareClick();
        }
    };


// Setup the app
    setup();


// Listen for clicks
    document.addEventListener('click', clickHandler, false);

};