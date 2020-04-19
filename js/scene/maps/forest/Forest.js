import Archer from "../../../models/characters/main/archer/Archer.js";
import Knight from "../../../models/characters/main/knight/Knight.js";


export default class forest extends Phaser.Scene{
    
    constructor(){
        super("Forest");
    }
    init(data){
        this.char = data.char;
    }
    preload(){
        
        // tiles para mapa
        this.load.image("main_background","assets/maps/forest/tiles/main_background.png");
        this.load.image("bgrd_tree1","assets/maps/forest/tiles/bgrd_tree1.png");
        this.load.image("bgrd_tree2","assets/maps/forest/tiles/bgrd_tree2.png");
        this.load.image("bgrd_tree3","assets/maps/forest/tiles/bgrd_tree3.png");
        this.load.image("bgrd_tree4","assets/maps/forest/tiles/bgrd_tree4.png");
        this.load.image("bgrd_tree5","assets/maps/forest/tiles/bgrd_tree5.png");
        this.load.image("env_ground","assets/maps/forest/tiles/env_ground.png");
        this.load.image("env_trees","assets/maps/forest/tiles/env_trees.png");
        this.load.image("castle_env","assets/maps/forest/tiles/castle_env.png");

        // mapa (forest)
        this.load.tilemapTiledJSON("forest","assets/maps/forest/forest.json");


        // spritesheet (Archer)
        this.load.spritesheet("archer", "assets/characters/main/archer/ArcherIdle.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet("archer_run", "assets/characters/main/archer/ArcherRun.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet("archer_jump", "assets/characters/main/archer/ArcherJump.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        // spritesheet (Knight)
        this.load.spritesheet("knight", "assets/characters/main/knight/KnightIdle.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet("knight_run", "assets/characters/main/knight/KnightRun.png", {
            frameWidth: 96,
            frameHeight: 64
        });
        

        

    }

    create(){
        console.log("Starting game");

        // mapa (forest)
        this.map = this.make.tilemap({ key: "forest" });
        
        //nome da tiles
        const main_background = this.map.addTilesetImage("main_background","main_background");
        const bgrd_tree1 = this.map.addTilesetImage("bgrd_tree1","bgrd_tree1");
        const bgrd_tree2 = this.map.addTilesetImage("bgrd_tree2","bgrd_tree2");
        const bgrd_tree3 = this.map.addTilesetImage("bgrd_tree3","bgrd_tree3");
        const bgrd_tree4 = this.map.addTilesetImage("bgrd_tree4","bgrd_tree4");
        const bgrd_tree5 = this.map.addTilesetImage("bgrd_tree5","bgrd_tree5");
        const env_ground = this.map.addTilesetImage("env_ground","env_ground");
        const env_trees = this.map.addTilesetImage("env_trees","env_trees");
        const castle_env = this.map.addTilesetImage("castle_env","castle_env");

        // layers
        this.map.createStaticLayer("main_background",main_background,0,0);
        this.map.createStaticLayer("bgrd_tree1",bgrd_tree1,0,0);
        this.map.createStaticLayer("bgrd_tree2",bgrd_tree2,0,0);
        this.map.createStaticLayer("bgrd_tree3",bgrd_tree3,0,0);
        this.map.createStaticLayer("bgrd_tree4",bgrd_tree4,0,0);
        this.map.createStaticLayer("bgrd_tree5",bgrd_tree5,0,0);
        this.map.createStaticLayer("trees",env_trees,0,0);
        this.map.createStaticLayer("castle",castle_env,0,0);
        this.map.createStaticLayer("castle_acessories",castle_env,0,0);
        const ground = this.map.createStaticLayer("ground",env_ground,0,0);

        ground.setCollisionByProperty({"collides":true},true);
        

        if(this.char == 0){
            this.player = new Archer(this, 50, 200);
        }else{
            this.player = new Knight(this, 50, 200);
        }
        

        //this.knight = new Knight(this,100,400);

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();

        // collider
        this.physics.add.collider(this.player,ground);

    }

    update(){

        this.player.update(this.cursors);
        //this.knight.update(this.cursors);

    }

}