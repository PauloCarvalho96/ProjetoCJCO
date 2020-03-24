import Archer from "../models/characters/main/archer/Archer.js";

export default class playGame extends Phaser.Scene{
    
    constructor(){
        super("PlayGame");
    }

    preload(){

        // spritesheet
        this.load.spritesheet("archer", "assets/characters/main/archer/static.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet("archer_run", "assets/characters/main/archer/run.png", {
            frameWidth: 128,
            frameHeight: 128
        });

    }

    create(){
        console.log("Starting game");

        
        this.archer = new Archer(this, 100, 400);
        this.archer.setSize(45, 40);
        this.archer.setOffset(40,35);

        this.cursors = this.input.keyboard.createCursorKeys();

        
    }

    update(){

        this.archer.update(this.cursors);

    }

}