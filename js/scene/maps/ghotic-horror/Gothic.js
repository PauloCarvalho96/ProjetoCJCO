import Archer from "../../../models/characters/main/archer/Archer.js";

export default class Gothic extends Phaser.Scene {
    
    constructor(){
        super("Gothic-Horror");
    }

    preload(){
        
        //tiles do mapa
        this.load.image("clouds","assets/maps/gothic-horror/tiles/clouds.png");
        this.load.image("tiles","assets/maps/gothic-horror/tiles/tiles.png");
        this.load.image("town","assets/maps/gothic-horror/tiles/town.png");
        this.load.image("tree_bck","assets/maps/gothic-horror/tiles/tree_bck.png");
        this.load.image("water","assets/maps/gothic-horror/tiles/water.png");

        // carregamento do mapa
        this.load.tilemapTiledJSON("gothic","assets/maps/gothic-horror/gothic-horror.json");

        // spritesheet (archer)
        this.load.spritesheet("archer", "assets/characters/main/archer/ArcherIdle.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet("archer_run", "assets/characters/main/archer/ArcherRun.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet("archer_shoot", "assets/characters/main/archer/ArcherAttack.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet("archer_arrow", "assets/characters/main/archer/arrow.png", {
            frameWidth: 128,
            frameHeight: 128
        });

    }

    create(){

        // carregamento do mapa
        this.map = this.make.tilemap({ key: "gothic" });

        //nome da tiles
        const clouds = this.map.addTilesetImage("clouds","clouds");
        const tiles = this.map.addTilesetImage("tiles","tiles");
        const town = this.map.addTilesetImage("town","town");
        const tree_bck = this.map.addTilesetImage("tree_bck","tree_bck");
        const water = this.map.addTilesetImage("water","water");

        //layers
        this.map.createStaticLayer("clouds",clouds,0,0);
        this.map.createStaticLayer("cityback",town,0,0);
        this.map.createStaticLayer("tree_bck",tree_bck,0,0);
        this.plataforms = this.map.createStaticLayer("cityfront",tiles,0,0);
        this.map.createStaticLayer("water",water,0,0);
        this.ground = this.map.createStaticLayer("ground",tiles,0,0);
        this.map.createStaticLayer("ground_dec",tiles,0,0);

        // criação da personagem
        this.archer = new Archer(this, 100, 400);

        // camera
        const camera = this.cameras.main;
        camera.startFollow(this.archer);
        camera.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

        // cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        // collides
        this.ground.setCollisionByProperty({"collides":true},true);
        this.plataforms.setCollisionByProperty({"collides":true},true);
        this.physics.add.collider(this.archer,this.ground);
        this.physics.add.collider(this.archer,this.plataforms);
        
    }

    update(time,delta){

        this.archer.update(this.cursors,time);
        
    }

}