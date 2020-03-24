import Archer from "../models/characters/main/archer/Archer.js";
import Knight from "../models/characters/main/knight/Knight.js";

export default class playGame extends Phaser.Scene{
    
    constructor(){
        super("PlayGame");
    }

    preload(){

        // spritesheet (Archer)
        this.load.spritesheet("archer", "assets/characters/main/archer/steady.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet("archer_run", "assets/characters/main/archer/run.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        // spritesheet (Knight)
        this.load.spritesheet("knight", "assets/characters/main/knight/steady.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet("knight_run", "assets/characters/main/knight/run.png", {
            frameWidth: 96,
            frameHeight: 64
        });


    }

    create(){
        console.log("Starting game");

        //this.archer = new Archer(this, 100, 400);
        //this.archer.setSize(45, 40);
        //this.archer.setOffset(40,35);

        this.knight = new Knight(this,100,400);
        this.knight.setSize(40,35);
        this.knight.setOffset(20,10);


        this.cursors = this.input.keyboard.createCursorKeys();


    }

    update(){

        //this.archer.update(this.cursors);
        this.knight.update(this.cursors);
    }

}