import Archer from "../../../models/characters/main/archer/Archer.js";
import FireSkull from "../../../models/characters/enemies/FireSkull/FireSkull.js";
import Mushroom from "../../../models/characters/enemies/Mushroom/Mushroom.js";
import FireSkullGroup from "../../../models/characters/enemies/FireSkull/FireSkullGroup.js";
import MushroomGroupGothic from "../../../models/characters/enemies/Mushroom/MushroomGroupGothic.js";
import GhostBoss from "../../../models/characters/enemies/Nightmare/Nightmare.js";
import Nightmare from "../../../models/characters/enemies/Nightmare/Nightmare.js";
import Explosion from "../../../models/characters/enemies/Explosion/Explosion.js";

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

        // carregar as imagens da vida
        this.load.image("green-bar","assets/green-bar.png");
        this.load.image("red-bar","assets/red-bar.png");

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
        this.load.spritesheet("monsterbullet", "assets/characters/enemies/Bullet/bullet.png", {
            frameHeight: 11,
            frameWidth: 11,
        });

          // disparo mushroom
        this.load.spritesheet("mushroom_fire", "assets/characters/enemies/Mushroom/Attack.png", {
            frameHeight: 150,
            frameWidth: 150,
        });

        /** Spritesheet Nightmare */
        this.load.spritesheet("nightmare_idle", "assets/characters/enemies/Nightmare/nightmare_idle.png", {
            frameHeight: 96,
            frameWidth: 128,
        });

        this.load.spritesheet("nightmare_run", "assets/characters/enemies/Nightmare/nightmare_run.png", {
            frameHeight: 96,
            frameWidth: 144,
        });

        this.load.spritesheet("fireball", "assets/characters/enemies/Fireball/fireball.png", {
            frameHeight: 16,
            frameWidth: 19,
        });

        //explosion
        this.load.spritesheet("explosion", "assets/characters/enemies/Explosion/explosion.png", {
            frameHeight: 64,
            frameWidth: 64,
        });

        this.load.audio('explosion_sound','assets/characters/enemies/Explosion/explosion.mp3');

        // se conseguir chegar ao final do nivel entra no modo de BOSS
        this.boss = false;
        this.bossConfigs = false;
        this.bossLevelX = 5000;
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
        this.archer = new Archer(this, 3000, 500);

        /** TESTES */
        this.nightmare = new Nightmare(this,5500,400);

        // grupos de inimigos
        this.fireskullGroup = new FireSkullGroup(this.physics.world, this);
        this.mushroomGroup = new MushroomGroupGothic(this.physics.world, this);

        // camera
        const camera = this.cameras.main;
        camera.startFollow(this.archer);
        camera.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

        // cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        /** Health bar */
        var backgroundBar = this.add.image(this.archer.x-90, 10, 'red-bar');
        backgroundBar.setScrollFactor(0);
        backgroundBar.setOrigin(0,0);
        var healthBar = this.add.image(this.archer.x-90, 10, 'green-bar');
        healthBar.setOrigin(0,0);
        healthBar.setScrollFactor(0);
        // add text label to left of bar
        var healthLabel = this.add.text(this.archer.x-50, 10, 'Health', {fontSize:'20px', fill:'#ffffff'});
        healthLabel.setScrollFactor(0);

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

        this.physics.add.collider(this.nightmare,this.ground);

        // collider fireskull
        this.physics.add.collider(this.fireskullGroup,this.ground);
        this.physics.add.collider(this.fireskullGroup,this.plataforms);

        // collider mushroom
        this.physics.add.collider(this.mushroomGroup,this.ground);
        this.physics.add.collider(this.mushroomGroup,this.plataforms);

        // colliders fireball
        this.physics.add.collider(this.nightmare.nightmarebullets, this.ground, (bullet) => {
            bullet.explosion();
            this.sound.play('explosion_sound'); 
            this.nightmare.nightmarebullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.nightmare.nightmarebullets, this.plataforms, (bullet) => {
            bullet.explosion();
            this.sound.play('explosion_sound'); 
            this.nightmare.nightmarebullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.nightmare.nightmarebullets, this.archer, (archer,bullet) => {
            this.archer.takeDamage();
            bullet.explosion();
            this.sound.play('explosion_sound');
            this.nightmare.nightmarebullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        // colliders monsters nightmare
        this.physics.add.collider(this.nightmare.nightmaremonsters, this.ground);

        /** Propriedades (overlap) Monstros -> Archer */
        this.physics.add.overlap(this.archer, this.fireskullGroup, () => {
            this.archer.archerHP--;
            healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
            this.archer.takeDamage();
        }); 

        this.physics.add.overlap(this.archer, this.mushroomGroup, () => {
            this.archer.archerHP--;
            healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
            this.archer.takeDamage();
        }); 

        /** Propriedades balas mushroom -> archer */
        this.mushroomGroup.children.iterate(function (mushroom) {
            this.physics.add.collider(this.archer,mushroom.mushroomBullets, (archer,bullet) => {
                this.archer.archerHP= this.archer.archerHP - mushroom.mushDamage;
                healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
                this.archer.takeDamage();
                bullet.explosion();
                this.sound.play('explosion_sound'); 
                mushroom.mushroomBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            });      
        },this);

        /** Propriedades arrow */
        this.physics.add.overlap(this.archer.archerBullets, this.mushroomGroup, (bullet,mushroom) => {
            mushroom.mushHP = mushroom.mushHP - this.archer.archerDamage;
            if(mushroom.mushHP <= 0){
                this.mushroomGroup.killAndHide(mushroom);
                mushroom.removeFromScreen();
                this.archer.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.overlap(this.archer.archerBullets, this.fireskullGroup, (bullet,fireskull) => {
            fireskull.fireskullHP -= this.archer.archerDamage;
            if(fireskull.fireskullHP <= 0){
                this.fireskullGroup.killAndHide(fireskull);
                fireskull.removeFromScreen();
                this.archer.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.overlap(this.archer.archerBullets, this.nightmare.nightmaremonsters, (bullet,fireskull) => {
            fireskull.fireskullHP -= this.archer.archerDamage;
            if(fireskull.fireskullHP <= 0){
                this.nightmare.nightmaremonsters.killAndHide(fireskull);
                fireskull.removeFromScreen();
                this.archer.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.overlap(this.archer.archerBullets, this.nightmare, (nightmare,bullet) => {
            this.nightmare.nightmareHP = this.nightmare.nightmareHP - this.archer.archerHP;
            console.log(this.nightmare.nightmareHP);
            if(this.nightmare.nightmareHP <= 0){
                this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
            this.scene.pause();
            }
            this.nightmare.takeDamage();
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

    }

    update(time,delta){

        console.log(this.archer.x);

        this.archer.update(this.cursors,time);
        this.checkArcherHP();

        // itera as balas para as destruir dps de se afastarem do arqueiro
        this.archer.archerBullets.children.iterate(function (bullet) {
            if(bullet.x > this.archer.x + (this.game.config.width/2) || bullet.x < this.archer.x - (this.game.config.width/2)){
                this.archer.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
        },this);    

        //boss
        if(this.archer.x > this.bossLevelX){
            
            if(this.boss == false && this.bossConfigs == false){
                this.boss = true;
                this.bossConfigs = true;
                this.nightmare.setVelocityX(-100);
                this.cameras.main.stopFollow(this.archer);
                this.cameras.main.setBounds(5000,0,this.map.widthInPixels,this.map.heightInPixels);
            }

            // limites do arqueiro
            if(this.archer.x < 5010){
                this.archer.x = 5010;
            } else if(this.archer.x > 5790){
                this.archer.x = 5790;
            }

            // update do boss
            this.nightmare.update(time);
        
        // nivel
        } else {    

            // inimigos
            this.fireskullGroup.children.iterate(function (fireskull) {
                fireskull.update();
            },this);

            // percorre os inimigos
            this.mushroomGroup.children.iterate(function (mushroom) {
                mushroom.update(time,mushroom.x-this.archer.x);
            },this);

        }
    }

    checkArcherHP() {
        if(this.archer.archerHP <= 0){
            this.scene.restart();
        }
    }

}