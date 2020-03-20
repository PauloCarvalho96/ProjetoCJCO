import bootGame from './scene/BootGame.js';
import playGame from './scene/PlayGame.js';
import forest from './scene/forest/Forest.js';

var game;
window.onload = function() {
    var gameConfig = {
        width: 800,
        height: 600,        
        backgroundColor: 0x000000,
        scene: [bootGame, playGame, forest],
        physics: {
            default: "arcade",
            arcade: {
              debug: true
            }
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

function resizeGame(){
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
