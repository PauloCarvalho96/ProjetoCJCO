import Archer from "../../../models/characters/main/archer/Archer.js";
import FireSkull from "../../../models/characters/enemies/FireSkull/FireSkull.js";
import Mushroom from "../../../models/characters/enemies/Mushroom/Mushroom.js";
import FireSkullGroup from "../../../models/characters/enemies/FireSkull/FireSkullGroup.js";
import MushroomGroupGothic from "../../../models/characters/enemies/Mushroom/MushroomGroupGothic.js";

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

        //inimigos
        this.load.spritesheet("fireskull", "assets/characters/enemies/FireSkull/fire-skull.png", {
            frameWidth: 96,
            frameHeight: 112
        });

        // spritesheet mushroom
        this.load.spritesheet("mushroom_idle", "assets/characters/enemies/Mushroom/Idle.png", {
            frameWidth: 150,
            frameHeight: 150
        });

        // bullet
        this.load.spritesheet("mushroom_bullet", "assets/characters/enemies/Bullet/bullet.png", {
            frameHeight: 11,
            frameWidth: 11,
          });

          // disparo mushroom
          this.load.spritesheet("mushroom_fire", "assets/characters/enemies/Mushroom/Attack.png", {
            frameHeight: 150,
            frameWidth: 150,
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
        this.water = this.map.createStaticLayer("water",water,0,0);
        this.ground = this.map.createStaticLayer("ground",tiles,0,0);
        this.map.createStaticLayer("ground_dec",tiles,0,0);

        // criação da personagem
        this.archer = new Archer(this, 3000, 400);

        // grupos de inimigos
        this.fireskullGroup = new FireSkullGroup(this.physics.world, this);
        this.mushroomGroup = new MushroomGroupGothic(this.physics.world, this);

        // camera
        const camera = this.cameras.main;
        camera.startFollow(this.archer);
        camera.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

        // cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        // collides
        this.ground.setCollisionByProperty({"collides":true},true);
        this.plataforms.setCollisionByProperty({"collides":true},true);
        this.water.setCollisionByProperty({"collides":true},true);

        // collider archer
        this.physics.add.collider(this.archer,this.ground);
        this.physics.add.collider(this.archer,this.plataforms);
        this.physics.add.collider(this.archer,this.water,() => {
            this.archer.archerHP--;
            this.archer.takeDamage();
        });

        // collider fireskull
        this.physics.add.collider(this.fireskullGroup,this.ground);
        this.physics.add.collider(this.fireskullGroup,this.plataforms);

        // collider mushroom
        this.physics.add.collider(this.mushroomGroup,this.ground);
        this.physics.add.collider(this.mushroomGroup,this.plataforms);
        
    }

    update(time,delta){

        console.log(this.archer.x);

        this.archer.update(this.cursors,time);
        this.checkArcherHP();

        // inimigos
        this.fireskullGroup.children.iterate(function (fireskull) {
            fireskull.update();
        },this);

        // percorre os inimigos
        this.mushroomGroup.children.iterate(function (mushroom) {
            mushroom.update(time,mushroom.x-this.archer.x);
        },this);

        // itera as balas para as destruir dps de se afastarem do arqueiro
        this.archer.archerBullets.children.iterate(function (bullet) {
            if(bullet.x > this.archer.x + (this.game.config.width/2)){
                this.archer.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
        },this);

    }

    checkArcherHP(){
        if(this.archer.archerHP <= 0){
            this.scene.restart();
        }
    }

}