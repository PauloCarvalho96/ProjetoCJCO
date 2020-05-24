import Archer from "../../../models/characters/main/archer/Archer.js";
import Goblin from "../../../models/characters/enemies/Goblin/Goblin.js";
import GoblinGroup from "../../../models/characters/enemies/Goblin/GoblinGroup.js";
import Wizard from "../../../models/characters/enemies/Wizard/Wizard.js";
import Mushroom from "../../../models/characters/enemies/Mushroom/Mushroom.js";
import MushroomGroup from "../../../models/characters/enemies/Mushroom/MushroomGroup.js";

var archerLifes;

export default class Forest extends Phaser.Scene{
    
    constructor(){
        super("Forest");
    }

    init(data){
        archerLifes = data.archerLifes;
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

        // spritesheet goblin
        this.load.spritesheet("goblin_run", "assets/characters/enemies/Goblin/Run.png", {
            frameWidth: 150,
            frameHeight: 150
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

        // spritesheet wizard
        this.load.spritesheet("wizard_idle", "assets/characters/enemies/Wizard/Idle.png", {
            frameWidth: 231,
            frameHeight: 190
        });

        this.load.spritesheet("wizard_run", "assets/characters/enemies/Wizard/Run.png", {
            frameWidth: 231,
            frameHeight: 190
        });

        this.load.spritesheet("wizard_attack1", "assets/characters/enemies/Wizard/Attack1.png", {
            frameWidth: 231,
            frameHeight: 190
        });

        this.load.spritesheet("wizard_attack2", "assets/characters/enemies/Wizard/Attack2.png", {
            frameWidth: 231,
            frameHeight: 190
        });

        // fireball
        this.load.spritesheet("fireball", "assets/characters/enemies/Fireball/fireball.png", {
            frameHeight: 16,
            frameWidth: 19,
        });

        //explosion
        this.load.spritesheet("explosion", "assets/characters/enemies/Explosion/explosion.png", {
            frameHeight: 64,
            frameWidth: 64,
        });

        // sounds
        this.load.audio('explosion_sound','assets/characters/enemies/Explosion/explosion.mp3');
        this.load.audio('fire_arrow','assets/characters/main/archer/fire_arrow.mp3');
        this.load.audio('jump_sound','assets/characters/main/archer/Jump.wav');
        this.load.audio('hit_sound','assets/characters/main/archer/Hit.wav');
        this.load.audio('forest_song_level','assets/maps/forest/forest_song_level.wav');
        this.load.audio('forest_song_boss','assets/maps/forest/forest_song_boss.wav');

        // se conseguir chegar ao final do nivel entra no modo de BOSS
        this.boss = false;
        this.bossConfigs = false;
        this.bossLevelX = 3850;

        // archer death
        this.archerDeath = false;
        this.archerDeathConfigs = false;

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
        this.wall = this.map.createStaticLayer("wall",env_ground,0,0);
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
        this.rocks = this.map.createStaticLayer("rocks",env_rock,0,0);
        this.ground = this.map.createStaticLayer("ground",env_ground,0,0);  
        this.spikes = this.map.createStaticLayer("spikes",castle_env,0,0);
        
        // personagens
        this.archer = new Archer(this, 100, 400);

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

        this.forest_song_level = this.sound.add('forest_song_level',{
            loop:true,
            volume:0.5,
        });
        this.forest_song_level.play();

        this.forest_song_boss = this.sound.add('forest_song_boss',{
            loop:true,
            volume:0.5,
        });


        // *inimigos*

        // criação do grupo de goblins
        this.goblinGroup = new GoblinGroup(this.physics.world, this);

        // mushroom group
        this.mushGroup = new MushroomGroup(this.physics.world,this);

        // BOSS
        this.wizard = new Wizard(this,4500,500);
        
        // layers para a frente da personagem (especiais)  
        this.plataforms = this.map.createStaticLayer("plataforms",wood_env,0,0);
        this.map.createStaticLayer("decoration_weed",env_ground,0,0);
        this.map.createStaticLayer("front_chr",castle_env,0,0);
        this.map.createStaticLayer("boss_bck_ac",torch2,0,0);

        this.ground.setCollisionByProperty({"collides":true},true);
        this.wall.setCollisionByProperty({"collides":true},true);
        this.rocks.setCollisionByProperty({"collides":true},true);
        this.plataforms.setCollisionByProperty({"collides":true},true);
        this.spikes.setCollisionByProperty({"collides":true},true);

        const camera = this.cameras.main;
        camera.startFollow(this.archer);
        camera.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);

        //health bars
        var backgroundBar = this.add.image(this.archer.x-90, 10, 'red-bar');
        backgroundBar.setScrollFactor(0);
        backgroundBar.setOrigin(0,0);
        var healthBar = this.add.image(this.archer.x-90, 10, 'green-bar');
        healthBar.setOrigin(0,0);
        healthBar.setScrollFactor(0);
        // add text label to left of bar
        var healthLabel = this.add.text(this.archer.x-50, 10, 'Health', {fontSize:'20px', fill:'#ffffff'});
        healthLabel.setScrollFactor(0);

        this.cursors = this.input.keyboard.createCursorKeys();

        // collider
        this.physics.add.collider(this.archer,this.ground);
        this.physics.add.collider(this.archer,this.wall);
        this.physics.add.collider(this.archer,this.rocks);
        this.physics.add.collider(this.archer,this.plataforms);
        this.physics.add.collider(this.archer,this.spikes,() => {
            // se cair nos spikes morre
            this.archer.archerHP--; 
            healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
            this.archer.takeDamage();
        });

        //inimigos (propriedades) 
        this.physics.add.collider(this.goblinGroup,this.rocks);
        
        this.physics.add.collider(this.goblinGroup,this.ground);
        this.physics.add.collider(this.goblinGroup,this.plataforms);

        this.physics.add.collider(this.mushGroup,this.rocks);
        this.physics.add.collider(this.mushGroup,this.ground);
        this.physics.add.collider(this.mushGroup,this.plataforms);

        this.physics.add.collider(this.wizard,this.ground);

        // caso a personagem toque num enemy
        this.physics.add.overlap(this.archer, this.goblinGroup, () => {
            this.archer.archerHP--;
            healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
            this.archer.takeDamage();
        }); 

        this.physics.add.overlap(this.archer, this.mushGroup, () => {
            this.archer.archerHP--;
            healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
            this.archer.takeDamage();
        });

        // caso a personagem toque no boss
        this.physics.add.overlap(this.archer, this.wizard, () => {
            this.archer.archerHP--;
            healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
            this.archer.takeDamage();
        });

        // propriedas das balas
        this.mushGroup.children.iterate(function (mushroom) {
           
            //percorre as balas de cada inimigo e adiciona collider nas balas
            this.physics.add.collider(this.rocks, mushroom.mushroomBullets, (bullet) => {
                bullet.explosion();
                this.explosion.play(); 
                mushroom.mushroomBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            });

            this.physics.add.collider(this.ground, mushroom.mushroomBullets, (bullet) => {
                bullet.explosion();
                this.explosion.play(); 
                mushroom.mushroomBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            });

            this.physics.add.collider(this.plataforms, mushroom.mushroomBullets, (bullet) => {
                bullet.explosion();
                this.explosion.play(); 
                mushroom.mushroomBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            });

            this.physics.add.collider(this.wall, mushroom.mushroomBullets, (bullet) => {
                bullet.explosion();
                this.explosion.play(); 
                mushroom.mushroomBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            });

            this.physics.add.collider(this.archer,mushroom.mushroomBullets, (archer,bullet) => {
                bullet.explosion();
                this.explosion.play(); 
                this.archer.archerHP= this.archer.archerHP - mushroom.mushDamage;
                healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
                this.archer.takeDamage();
                bullet.removeFromScreen();
            }); 
            
        },this);

        // archer arrow (propriedades)
        this.physics.add.overlap(this.archer.archerBullets, this.goblinGroup, (bullet,goblin) => {
            goblin.gobHP = goblin.gobHP - this.archer.archerDamage;
            goblin.takeDamage();
            if(goblin.gobHP <= 0){
                this.goblinGroup.killAndHide(goblin);
            goblin.removeFromScreen();
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
            }
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.overlap(this.archer.archerBullets, this.mushGroup, (bullet,mushroom) => {
            mushroom.mushHP = mushroom.mushHP - this.archer.archerDamage;
            mushroom.takeDamage();
            if(mushroom.mushHP <= 0){
                this.mushGroup.killAndHide(mushroom);
                mushroom.removeFromScreen();
                this.archer.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.archer.archerBullets, this.rocks, (bullet) => {
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.archer.archerBullets, this.plataforms, (bullet) => {
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.archer.archerBullets, this.wall, (bullet) => {
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.archer.archerBullets, this.ground, (bullet) => {
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.overlap(this.archer.archerBullets, this.wizard.wizardMonsters, (bullet,monster) => {
            monster.gobHP = monster.gobHP - this.archer.archerDamage;
            if(monster.gobHP <= 0){
                this.wizard.wizardMonsters.killAndHide(monster);
                monster.removeFromScreen();
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
            }
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();    
        });

        this.physics.add.overlap(this.archer.archerBullets, this.wizard, (wizard,bullet) => {
            this.wizard.wizardHP = this.wizard.wizardHP - this.archer.archerDamage;
            if(this.wizard.wizardHP <= 0){
                this.archer.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
                this.wizard.removeFromScreen();
                /** Próximo nível */
                this.sound.stopAll();
                this.scene.stop();
                this.scene.start('Castle',{
                    acherLifes: archerLifes,
                });
            }
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
            
        });

        // wizard (BOSS) monstros/propriedades
        this.physics.add.overlap(this.archer, this.wizard.wizardMonsters, (monster) => {
            this.archer.archerHP--;
            healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);       
            this.archer.takeDamage();
        });
        this.physics.add.collider(this.wizard.wizardMonsters,this.rocks);
        this.physics.add.collider(this.wizard.wizardMonsters,this.ground);
        this.physics.add.collider(this.wizard.wizardMonsters,this.plataforms);

        this.physics.add.collider(this.wizard.wizardBullets,this.archer,(archer,bullet) => {
            bullet.explosion();
            this.explosion.play(); 
            this.wizard.wizardBullets.killAndHide(bullet);
            bullet.removeFromScreen();
            this.archer.archerHP--;
            healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
            this.archer.takeDamage();
        });

        // colliders fireball (wizard)
        this.physics.add.collider(this.wizard.wizardBullets, this.ground, (bullet) => {
            bullet.explosion();
            this.explosion.play(); 
            this.wizard.wizardBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.collider(this.wizard.wizardBullets, this.plataforms, (bullet) => {
            bullet.explosion();
            this.explosion.play(); 
            this.wizard.wizardBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.delayDeathRestart = 2000;
        this.deathAnim = {
        delay: this.delayDeathRestart,
        repeat: 0,
        callback: () => {
            archerLifes--;
            if(archerLifes == 0){
                this.sound.stopAll();
                this.scene.stop();
                this.scene.start('GameOver',{
                    map: "Forest",
                });
            } else {
                this.sound.stopAll();
                this.scene.restart();
            }  
        }
        };

    }

    update(time,delta){

        console.log(this.archer.archerHP);
        
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
        
        // itera as balas para as destruir dps de se afastarem do arqueiro
        this.archer.archerBullets.children.iterate(function (bullet) {
            if(bullet.x > this.archer.x + (this.game.config.width/2) || bullet.x < this.archer.x - (this.game.config.width/2)){
                this.archer.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
        },this); 

        // defrontar o boss
        if(this.archer.x > this.bossLevelX){
        
            // faz as configs do boss 1x
            if(this.boss == false && this.bossConfigs == false){
                this.forest_song_level.stop();
                this.forest_song_boss.play();
                //evento de disparo do boss
                this.boss = true;
                this.bossConfigs = true;
                this.wizard.setVelocityX(-50);
                this.cameras.main.stopFollow(this.archer);
                this.cameras.main.setBounds(3860,0,this.map.widthInPixels,this.map.heightInPixels);
            }

            //limites do arqueiro
            if(this.boss == true && this.archer.x < 3880){
                this.archer.x = 3880;
            }   

            // update do boss
            this.wizard.update(time);

        //senao trata se do nivel 
        } else {  
            
            this.goblinGroup.children.iterate(function (goblin) {                 
                goblin.update();
            },this);
    
            // percorre os inimigos
            this.mushGroup.children.iterate(function (mushroom) {
                mushroom.update(time,mushroom.x-this.archer.x);
            },this);

            // destroi balas antes de chegar ao castelo
            this.archer.archerBullets.children.iterate(function (bullet) {
                if(bullet.x > 3850){
                    this.archer.archerBullets.killAndHide(bullet);
                    bullet.removeFromScreen();
                }
            },this);

        }
    }

}