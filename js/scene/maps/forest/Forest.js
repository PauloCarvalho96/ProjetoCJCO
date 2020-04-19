import Archer from "../../../models/characters/main/archer/Archer.js";
import Knight from "../../../models/characters/main/knight/Knight.js";
import Goblin from "../../../models/characters/enemies/Goblin/Goblin.js";
import GoblinGroup from "../../../models/characters/enemies/Goblin/GoblinGroup.js";
import Wizard from "../../../models/characters/enemies/Wizard/Wizard.js";


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
        this.load.image("env_rock","assets/maps/forest/tiles/env_rock.png");
        this.load.image("wood_env","assets/maps/forest/tiles/wood_env.png");
        this.load.image("torch1","assets/maps/forest/tiles/torch1.png");
        this.load.image("torch2","assets/maps/forest/tiles/torch2.png");

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
        

        // spritesheet inimigos
        this.load.spritesheet("goblin_run", "assets/characters/enemies/Goblin/Run.png", {
            frameWidth: 150,
            frameHeight: 150
        });

        // spritesheet boss
        this.load.spritesheet("wizard_idle", "assets/characters/enemies/Wizard/Idle.png", {
            frameWidth: 231,
            frameHeight: 190
        });

        // se conseguir chegar ao final do nivel entra no modo de BOSS
        this.boss = false;

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
        const env_rock = this.map.addTilesetImage("env_rock","env_rock");
        const wood_env = this.map.addTilesetImage("wood_env","wood_env");
        const torch1 = this.map.addTilesetImage("torch1","torch1");
        const torch2 = this.map.addTilesetImage("torch2","torch2");

        // layers (atras da personagem)
        this.map.createStaticLayer("main_background",main_background,0,0);
        const wall = this.map.createStaticLayer("wall",env_ground,0,0);
        this.map.createStaticLayer("boss_bck",castle_env,0,0);
        this.map.createStaticLayer("bgrd_tree1",bgrd_tree1,0,0);
        this.map.createStaticLayer("bgrd_tree2",bgrd_tree2,0,0);
        this.map.createStaticLayer("bgrd_tree3",bgrd_tree3,0,0);
        this.map.createStaticLayer("bgrd_tree4",bgrd_tree4,0,0);
        this.map.createStaticLayer("bgrd_tree5",bgrd_tree5,0,0);
        this.map.createStaticLayer("trees",env_trees,0,0);
        this.map.createStaticLayer("castle",castle_env,0,0);
        this.map.createStaticLayer("acessories",castle_env,0,0);
        this.map.createStaticLayer("post",castle_env,0,0);
        this.map.createStaticLayer("torch1",torch1,0,0);
        this.map.createStaticLayer("torch2",torch2,0,0);
        const rocks = this.map.createStaticLayer("rocks",env_rock,0,0);
        const ground = this.map.createStaticLayer("ground",env_ground,0,0);  
        const spikes = this.map.createStaticLayer("spikes",castle_env,0,0);
        
        // personagens
        this.archer = new Archer(this, 1000, 500);
        //this.knight = new Knight(this,75,500);

        // inimigos

        // criação do grupo de goblins
        this.goblinGroup = new GoblinGroup(this.physics.world, this);
        this.goblinGroup.setVelocityX(50);

        // BOSS
        this.wizard = new Wizard(this,4500,500);
        
        // layers para a frente da personagem (especiais)  
        const plataforms = this.map.createStaticLayer("plataforms",wood_env,0,0);
        this.map.createStaticLayer("decoration_weed",env_ground,0,0);
        this.map.createStaticLayer("front_chr",castle_env,0,0);
        this.map.createStaticLayer("boss_bck_ac",torch2,0,0);

        ground.setCollisionByProperty({"collides":true},true);
        wall.setCollisionByProperty({"collides":true},true);
        rocks.setCollisionByProperty({"collides":true},true);
        plataforms.setCollisionByProperty({"collides":true},true);
        spikes.setCollisionByProperty({"collides":true},true);

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();

        // collider
        this.physics.add.collider(this.archer,ground);
        this.physics.add.collider(this.archer,wall);
        this.physics.add.collider(this.archer,rocks);
        this.physics.add.collider(this.archer,plataforms);
        this.physics.add.collider(this.archer,spikes,() => {
            // se cair nos spikes morre
            this.scene.restart();
        });

        //inimigos (propriedades) ***EM TESTES!***
        this.physics.add.collider(this.goblinGroup,rocks);
        this.physics.add.collider(this.goblinGroup,ground);
        this.physics.add.collider(this.goblinGroup,plataforms);

        this.physics.add.collider(this.wizard,plataforms);
        this.physics.add.collider(this.wizard,ground);
        this.physics.add.collider(this.wizard,rocks);

        // caso a personagem toque num goblin
        this.physics.add.overlap(this.archer, this.goblinGroup, () => {
            this.scene.restart();
        }); 

        // caso a personagem toque no boss
        this.physics.add.overlap(this.archer, this.wizard, () => {
            this.scene.restart();
        });

    }

    update(){

        //console.log(this.archer.x);

        this.archer.update(this.cursors);
        //this.knight.update(this.cursors);

        this.goblinGroup.children.iterate(function (goblin) {
            goblin.update()
        },this);

        this.wizard.update();

        // quando chegar ao fim do nivel para defrontar o boss
        if(this.archer.x > 3900){
            this.cameras.main.stopFollow(this.archer);
            this.cameras.main.setBounds(3860,0,4660,this.map.heightInPixels);
            this.boss = true;
        } 

        if(this.boss == true && this.archer.x < 3880){
            this.archer.x = 3880;
        }

    }

}