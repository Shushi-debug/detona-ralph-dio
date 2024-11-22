const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        resetButton: document.querySelector("#reset-button"),
    },

    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.1;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        ShowPopUp();
        //playSound("death.mp3");
        //alert("Game Over! O seu resultado foi: " + state.values.result + "!" + "Aperte reset para voltar a jogar!");
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(state.values.lives <= 0) {
                return;
            }            
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            } else {
                state.values.lives--;
                state.view.lives.textContent = state.values.lives;
                playSound("damage.mp3");
                if (state.values.lives <= 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    ShowPopUp();
                    //playSound("death.mp3");
                    //alert("Game Over! O seu resultado foi: " + state.values.result + "!" + " Aperte reset para voltar a jogar!");
                }
            }
        })
    });
}

function addListenerResetButton() {
    state.view.resetButton.addEventListener("click", () => {
        console.log("clicou")
        window.location.reload();
    })
}

function initialize() {
    addListenerHitbox();
    addListenerResetButton();
}

initialize();

// pop-up //

var buttonPopup = document.querySelector("#button-popup");
var modal = document.querySelector(".dialog-over");
var scoreDisplay = document.querySelector("#score-display");

    function ShowPopUp() {
        scoreDisplay.textContent = `Sua pontuação foi: \n${state.values.result}`;
        modal.style.display = "flex";
        modal.showModal();
        playSound("death.mp3");
        buttonPopup.addEventListener("click", () => {
        window.location.reload();
        })
    }