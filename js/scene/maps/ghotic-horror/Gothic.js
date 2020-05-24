import Archer from "../../../models/characters/main/archer/Archer.js";
import FireSkull from "../../../models/characters/enemies/FireSkull/FireSkull.js";
import Mushroom from "../../../models/characters/enemies/Mushroom/Mushroom.js";
import FireSkullGroup from "../../../models/characters/enemies/FireSkull/FireSkullGroup.js";
import MushroomGroupGothic from "../../../models/characters/enemies/Mushroom/MushroomGroupGothic.js";
import GhostBoss from "../../../models/characters/enemies/Nightmare/Nightmare.js";
import Nightmare from "../../../models/characters/enemies/Nightmare/Nightmare.js";
import Explosion from "../../../models/characters/enemies/Explosion/Explosion.js";
import Store from "../../../models/Store.js";

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

        // spritesheet (Archer)
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

        this.load.spritesheet("archer_jump", "assets/characters/main/archer/ArcherJump.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet("archer_death", "assets/characters/main/archer/ArcherDeath.png", {
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

        // Poções
        this.load.spritesheet("potions","assets/potions/potions_gradient.png", {
            frameWidth: 16,
            frameHeight: 24,
        });


        // sounds
        this.load.audio('explosion_sound','assets/characters/enemies/Explosion/explosion.mp3');
        this.load.audio('fire_arrow','assets/characters/main/archer/fire_arrow.mp3');
        this.load.audio('jump_sound','assets/characters/main/archer/Jump.wav');
        this.load.audio('hit_sound','assets/characters/main/archer/Hit.wav');
        this.load.audio('gothic_song_level','assets/maps/gothic-horror/gothic_song_level.wav');
        this.load.audio('gothic_song_boss','assets/maps/gothic-horror/gothic_song_boss.wav');

        // se conseguir chegar ao final do nivel entra no modo de BOSS
        this.boss = false;
        this.bossConfigs = false;
        this.bossLevelX = 5000;

        // archer death
        this.archerDeath = false;
        this.archerDeathConfigs = false;
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
        this.archer = new Archer(this, 100, 500);

        this.potion_hp = new Store(this,this.archer.x + 525,this.map.heightInPixels-100,"potions",0).setScrollFactor(0).setVisible(false); 
        this.potion_velocity = new Store(this,this.archer.x + 530,this.map.heightInPixels-65,"potions",2).setScrollFactor(0).setVisible(false);
        this.potion_damage = new Store(this,this.archer.x + 525,this.map.heightInPixels-50,"potions",4).setScrollFactor(0).setVisible(false);
        this.image_coin=this.add.image(this.archer.x + 585,this.map.heightInPixels-100,"coin").setScale(0.04,0.04).setVisible(false).setScrollFactor(0); // coin
        this.image_coin1=this.add.image(this.archer.x + 585,this.map.heightInPixels-70,"coin").setScale(0.04,0.04).setVisible(false).setScrollFactor(0);
        this.image_coin2=this.add.image(this.archer.x + 585,this.map.heightInPixels-40,"coin").setScale(0.04,0.04).setVisible(false).setScrollFactor(0); 

        /** Sounds */
        this.explosion = this.sound.add('explosion_sound',{
            volume:0.1,
        });

        this.fireSound = this.sound.add("fire_arrow",{
            volume:0.1,
        });
        this.archer.fireSound = this.fireSound;
        this.jumpSound = this.sound.add("jump_sound",{
            volume:0.1,
        });
        this.archer.jumpSound = this.jumpSound;
        this.hitSound = this.sound.add("hit_sound",{
            volume:0.1,
        });
        this.archer.hitSound = this.hitSound;

        this.gothic_song_level = this.sound.add('gothic_song_level',{
            loop:true,
            volume:0.5,
        });
        this.gothic_song_level.play();

        this.gothic_song_boss = this.sound.add('gothic_song_boss',{
            loop:true,
            volume:0.5,
        });


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
        this.press1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.press2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.press3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.pressQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

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
            this.explosion.play(); 
            this.nightmare.nightmarebullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.nightmare.nightmarebullets, this.plataforms, (bullet) => {
            bullet.explosion();
            this.explosion.play(); 
            this.nightmare.nightmarebullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.nightmare.nightmarebullets, this.archer, (archer,bullet) => {
            this.archer.takeDamage();
            bullet.explosion();
            this.explosion.play();
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
                this.explosion.play(); 
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

        this.delayDeathRestart = 2000;
        this.deathAnim = {
        delay: this.delayDeathRestart,
        repeat: 0,
        callback: () => {
            this.sound.stopAll();
            this.scene.stop();
            this.scene.start('GameOver');
        }
        };

    }


    update(time,delta){

        console.log(this.archer.x);

        // verifica HP do archer
        if(this.archer.archerHP > 0){
            this.archer.update(this.cursors,time);
        } else {
            this.archer.isDeath();
            this.archerDeath = true;
        }

        // gameover
        if(this.archerDeath == true && this.archerDeathConfigs == false){
            this.time.addEvent(this.deathAnim);
            this.archerDeathConfigs = true;
        }

        if(Phaser.Input.Keyboard.JustDown(this.pressQ)){
            this.store();
        }
        if(this.show_shop == false){
            if(Phaser.Input.Keyboard.JustDown(this.press1)){
              console.log(this.archer.archerHP);
              console.log("hp aumentada");
              this.archer.archerHP = this.archer.archerHP + this.potion_hp.coins[0];
              console.log(this.archer.archerHP);
            }else if(Phaser.Input.Keyboard.JustDown(this.press2)){
              console.log(this.archer.velocity);
              console.log("velocidade aumentada");
              this.archer.velocity = this.archer.velocity + this.potion_velocity.coins[1];
              console.log(this.archer.velocity);
            }else if(Phaser.Input.Keyboard.JustDown(this.press3)){
              console.log(this.archer.archerDamage);
              console.log("ataque aumentado");
              this.archer.archerDamage = this.archer.archerDamage + this.potion_damage.coins[2] ;
              console.log(this.archer.archerDamage);
            }
        }

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
                this.gothic_song_level.stop();
                this.gothic_song_boss.play();
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

    store(){ // loja
        if(this.show_shop == true){
          this.potion_hp.potions_text(this.show_shop);
          this.potion_hp.setVisible(true);
          this.potion_velocity.setVisible(true);
          this.potion_damage.setVisible(true);
          this.image_coin.setVisible(true);
          this.image_coin1.setVisible(true);
          this.image_coin2.setVisible(true);
          this.show_shop = false;
        }else{
          this.potion_hp.potions_text(this.show_shop);
          this.potion_hp.setVisible(false);
          this.potion_velocity.setVisible(false);
          this.potion_damage.setVisible(false);
          this.image_coin.setVisible(false);
          this.image_coin1.setVisible(false);
          this.image_coin2.setVisible(false);
          this.show_shop = true;
        }
      }
}