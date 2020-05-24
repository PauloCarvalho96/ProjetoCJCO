import GhostGroup from "../../../models/characters/enemies/Ghost/GhostGroup.js";
import EyeGroup from "../../../models/characters/enemies/Eye/EyeGroup.js";
import Archer from "../../../models/characters/main/archer/Archer.js";
import Demon from "../../../models/characters/enemies/Demon/Demon.js";
import Store from "../../../models/Store.js";

var count = 0;
var archerLifes;
var velocity;
var damage;
var coins = 0;
var upgrades;
var alreadyPass = false;
export default class Castle extends Phaser.Scene {
  
  constructor() {
    super("Castle");
  }

  init(data){
    if(alreadyPass == false){
      archerLifes = data.archerLifes;
      velocity = data.archer.velocity;
      damage = data.archer.archerDamage;
      coins = data.coins;
      upgrades = data.upgrades;
      alreadyPass = true;
    }
    
  }

  preload() {
    //loading
    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    var progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
    var progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    var loadingText = this.add.text(250,260,"Loading: ", { fontSize: '32px', fill: '#FFF' });

    // Mapa
    this.load.image("back1", "assets/maps/castle/tiles/background1.png");
    this.load.image("back2", "assets/maps/castle/tiles/background2.png");
    this.load.image("back3", "assets/maps/castle/tiles/background3_A.png");
    this.load.image("back3_b", "assets/maps/castle/tiles/background3_B.png");
    this.load.image("back4", "assets/maps/castle/tiles/background4.png");
    this.load.image("back5", "assets/maps/castle/tiles/background5.png");
    this.load.image("tiles", "assets/maps/castle/tiles/main_lev_build.png");
    this.load.image("decorative", "assets/maps/castle/tiles/other_and_decorative.png");
    //this.load.image("tocha", "assets/maps/castle/tiles/torch-C-03.png");
    this.load.image("lava", "assets/maps/castle/tiles/lava.png");
    this.load.image("coin","assets/faceon_gold_coin.png");

    this.load.tilemapTiledJSON("map", "assets/maps/castle/map2_v3.json");

    // carregar as imagens da vida;
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


    // spritesheet inimigos
    this.load.spritesheet("skeleton_run", "assets/characters/enemies/Skeleton/Walk.png", {
    frameWidth: 150,
    frameHeight: 150
    }); 

    // spritesheet inimigos
    this.load.spritesheet("ghost_idle", "assets/characters/enemies/Ghost/ghost_idle.png", {
    frameWidth: 64,
    frameHeight: 80
    });


    // spritesheet inimigos
    this.load.spritesheet("ghost_appears", "assets/characters/enemies/Ghost/ghost_appears.png", {
    frameWidth: 64,
    frameHeight: 48
    });

    // spritesheet inimigos
    this.load.spritesheet("ghost_vanish", "assets/characters/enemies/Ghost/ghost_vanish.png", {
    frameWidth: 64,
    frameHeight: 64
    });

    // spritesheet inimigos
    this.load.spritesheet("eye_fly", "assets/characters/enemies/Flying_eye/Flight.png", {
    frameWidth: 150,
    frameHeight: 150
    });

    // disparo eye
    this.load.spritesheet("eye_fire", "assets/characters/enemies/Flying_eye/Attack.png", {
    frameHeight: 150,
    frameWidth: 150,
    });

    // BOSS
    this.load.spritesheet("walk", "assets/characters/enemies/Demon/walk.png", {
    frameHeight: 144,
    frameWidth: 160,
    });

    this.load.spritesheet("demon_attack", "assets/characters/enemies/Demon/demon_attack.png", {
    frameHeight: 192,
    frameWidth: 240,
    });

    this.load.spritesheet("demon_2attack", "assets/characters/enemies/Demon/demon_2attack.png", {
    frameHeight: 176,
    frameWidth: 192,
    });

    this.load.spritesheet("demon_idle", "assets/characters/enemies/Demon/demon_idle.png", {
    frameHeight: 144,
    frameWidth: 160,
    });

    // bullet
    this.load.spritesheet("monsterbullet", "assets/characters/enemies/Bullet/bullet.png", {
    frameHeight: 11,
    frameWidth: 11,
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
    this.load.audio('castle_song_level','assets/maps/castle/castle_song_level.wav');
    this.load.audio('castle_song_boss','assets/maps/castle/castle_song_boss.wav');

    // se conseguir chegar ao final do nivel entra no modo de BOSS
    this.boss = false;
    this.bossConfigs = false;

    // archer death
    this.archerDeath = false;
    this.archerDeathConfigs = false;

    // loading
    this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText});
    this.load.on('complete', this.complete, {scene:this.scene});
  }

  create() {
    console.log(archerLifes);

      this.map = this.make.tilemap({ key: "map" }); // crio o mapa 

      // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
      // Phaser's cache (i.e. the name you used in preload)
      const back1 = this.map.addTilesetImage("01 background", "back1");
      const back2 = this.map.addTilesetImage("02 background", "back2");
      const back3 = this.map.addTilesetImage("03 background A", "back3");
      const back3_b = this.map.addTilesetImage("03 background B", "back3_b");
      const back4 = this.map.addTilesetImage("04 background", "back4");
      const back5 = this.map.addTilesetImage("05 background", "back5");
      const tileset = this.map.addTilesetImage("main_lev_build", "tiles");
      const castle = this.map.addTilesetImage("main_lev_build", "tiles");
      const windows = this.map.addTilesetImage("main_lev_build", "tiles");
      const boss_map = this.map.addTilesetImage("main_lev_build", "tiles");
      //const tochas = this.map.addTilesetImage("torch-C-03", "tocha");
      const dec = this.map.addTilesetImage("other_and_decorative", "decorative");
      const dec1 = this.map.addTilesetImage("lava", "lava");


      // Parameters: layer name (or index) from Tiled, tileset, x, y
      this.map.createStaticLayer("background1", back1, 0, 0);
      this.map.createStaticLayer("background2", back2, 0, 0);  
      this.map.createStaticLayer("background3_a", back3, 0, 0); 
      this.map.createStaticLayer("background3_b", back3_b, 0, 0); 
      this.map.createStaticLayer("background4", back4, 0, 0);  
      this.map.createStaticLayer("background5", back5, 0, 0); 
      this.map.createStaticLayer("fundo_castelo", castle, 0, 0);
      this.map.createStaticLayer("decoracao", dec, 0, 0);
      //this.map.createStaticLayer("tochas", tochas, 0, 0);
      this.map.createStaticLayer("janelas", windows, 0, 0);

      const front = this.map.createStaticLayer("piso", tileset, 0, 0);
      const front1 = this.map.createStaticLayer("lava", dec1, 0, 0);
      const boss_m = this.map.createStaticLayer("piso_boss",boss_map, 0, 0);

      this.archer = new Archer(this, 100, 300);
      this.archer.velocity = velocity;
      this.archer.archerDamage = damage;
      this.show_shop = true;

      this.potion_hp = new Store(this,this.archer.x + 525,this.map.heightInPixels-100,"potions",0).setScrollFactor(0).setVisible(false);
      this.potion_hp.coins = upgrades[0];
      this.potion_velocity = new Store(this,this.archer.x + 530,this.map.heightInPixels-65,"potions",2).setScrollFactor(0).setVisible(false);
      this.potion_velocity.coins = upgrades[1];
      this.potion_damage = new Store(this,this.archer.x + 525,this.map.heightInPixels-50,"potions",4).setScrollFactor(0).setVisible(false);
      this.potion_damage.coins = upgrades[2];
      this.image_coin=this.add.image(this.archer.x + 585,this.map.heightInPixels-100,"coin").setScale(0.04,0.04).setVisible(false).setScrollFactor(0); // coin
      this.image_coin1=this.add.image(this.archer.x + 585,this.map.heightInPixels-70,"coin").setScale(0.04,0.04).setVisible(false).setScrollFactor(0); // coin
      this.image_coin2=this.add.image(this.archer.x + 585,this.map.heightInPixels-40,"coin").setScale(0.04,0.04).setVisible(false).setScrollFactor(0); // coin
      this.heart_image1 = this.add.image(30,50,"heart").setScale(0.05,0.05).setVisible(true).setScrollFactor(0);
      this.heart_image2 = this.add.image(55,50,"heart").setScale(0.05,0.05).setVisible(true).setScrollFactor(0);
      this.heart_image3 = this.add.image(80,50,"heart").setScale(0.05,0.05).setVisible(true).setScrollFactor(0);
      this.archer_coins = this.add.image(this.archer.x + 670,20,"coin").setScale(0.06,0.06).setVisible(true).setScrollFactor(0);  
      this.coin_text = this.add.text(this.archer.x + 610, 10,"x" +coins, {fontSize:'20px', fill:'#ffffff'}).setScrollFactor(0); 
      
      //health bars
      var backgroundBar = this.add.image(this.archer.x-105, 10, 'red-bar');
      backgroundBar.setScrollFactor(0);
      backgroundBar.setOrigin(0,0);
      this.healthBar = this.add.image(this.archer.x-90, 10, 'green-bar');
      this.healthBar.setOrigin(0,0);
      this.healthBar.setScrollFactor(0);
      // add text label to left of bar
      var healthLabel = this.add.text(this.archer.x-50, 10, 'Health', {fontSize:'20px', fill:'#ffffff'});
      healthLabel.setScrollFactor(0);

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

      this.castle_song_level = this.sound.add('castle_song_level',{
          loop:true,
          volume:0.5,
      });
      this.castle_song_level.play();

      this.castle_song_boss = this.sound.add('castle_song_boss',{
          loop:true,
          volume:0.5,
      });
       /** 
         * create a new EnemiesGroup 
        */
      this.ghosts = new GhostGroup(this.physics.world,this);

      this.eyes = new EyeGroup(this.physics.world,this);

      // BOSS
      this.demon = new Demon(this,4412,480);
      //get the scene camera
      const camera = this.cameras.main;
      //make camera follow mario
      camera.startFollow(this.archer); // para a camara seguir sempre o boneco
      //camera is not allowed to go out bounds
      camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

      this.cursors = this.input.keyboard.createCursorKeys();
      this.press1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
      this.press2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
      this.press3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
      this.pressQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      this.pressP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
      this.potion_hp.setVisible(false);
      this.potion_velocity.setVisible(false);
      this.potion_damage.setVisible(false);
		
      //set tiles from front tilemap that have collides property true as collidable
      front.setCollisionByProperty({ "colides": true }, true); // escrevi mal eu sei mas agora fica assim !!!
      front1.setCollisionByProperty({ "colides": true }, true);
      boss_m.setCollisionByProperty({ "colides": true }, true);
      //set collision between collidable tiles from front and mario
      this.physics.add.collider(this.archer, front);
      this.physics.add.collider(this.archer, boss_m);
      this.physics.add.collider(this.ghosts,front);
      this.physics.add.collider(this.eyes,front);
      this.physics.add.collider(this.demon,front);
      this.physics.add.collider(this.demon.demonMonsters,front);
      this.physics.add.collider(this.demon.demonMonsters,boss_m);

      this.physics.add.collider(this.archer,front1,() => {
        this.archer.archerHP--;
        this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
        this.archer.takeDamage();
      });

      // caso a personagem toque num goblin
      this.physics.add.overlap(this.archer, this.ghosts, (archer,ghost) => {
        this.archer.archerHP = this.archer.archerHP - ghost.ghostDamage;
        this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
        this.archer.takeDamage(); 
      }); 

      this.eyes.children.iterate(function (eye) {

        this.physics.add.collider(front, eye.bullets,(bullet) =>{
          bullet.explosion();
          this.explosion.play();
          eye.bullets.killAndHide(bullet);
          bullet.removeFromScreen();
        });

         // adiciona collider da bala com personagem
         this.physics.add.collider(this.archer, eye.bullets,(archer,bullet) => {      
          this.archer.archerHP = this.archer.archerHP - eye.eyeDamage;
          this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
          bullet.explosion();
          this.explosion.play();
          this.archer.takeDamage();  
          eye.bullets.killAndHide(bullet);  
          bullet.removeFromScreen();
         });

        this.physics.add.overlap(this.archer, eye, (bullet) => { 
          this.archer.archerHP = this.archer.archerHP - eye.eyeDamage;
          this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
          this.archer.takeDamage();  
        });

      },this);

        // demon (BOSS) monstros/propriedades
        this.physics.add.overlap(this.archer, this.demon.demonMonsters, (archer,monsterBullet) => {
          this.archer.archerHP--;
          this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
          this.archer.takeDamage();  
       });

        // Collider dos ataques do Boss com o arqueiro
        // adiciona collider da bala com personagem
        this.physics.add.collider(this.archer, this.demon.DemonBullets, (bullet) => {
          this.archer.archerHP--;
          this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
        this.archer.takeDamage();
         });

         // adiciona collider da bala com personagem
         this.physics.add.overlap(this.archer, this.demon.hitboxes, (bullet) => { 
            this.archer.archerHP= this.archer.archerHP - this.demon.demonDamage;
            this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
            this.archer.takeDamage();
         });

        this.physics.add.overlap(this.archer, this.demon, (bullet) => {
          
        this.archer.archerHP= this.archer.archerHP - this.demon.demonDamage;
        this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
        this.archer.takeDamage();
        });

        // archer arrow (propriedades)
        this.physics.add.overlap(this.archer.archerBullets, this.ghosts, (bullet,ghost) => {
          ghost.ghostHP = ghost.ghostHP - this.archer.archerDamage;
          if(ghost.ghostHP <= 0){
            coins += 2;
            this.ghosts.killAndHide(ghost);
            ghost.removeFromScreen();
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
          }  
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
          ghost.takeDamage();
        });
        // caso a personagem toque num goblin
        this.physics.add.overlap(this.archer, this.ghosts, (bullet,ghost) => {
          
          this.archer.archerHP = this.archer.archerHP - ghost.ghostDamage;
          this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
          this.archer.takeDamage();
          
        }); 
        this.physics.add.collider(this.archer.archerBullets, this.demon.demonMonsters, (bullet,demon) => {
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
          this.demon.demonMonsters.killAndHide(demon);
          demon.removeFromScreen();
      });

      this.physics.add.collider(this.archer.archerBullets, this.demon, (archer,bullet) => {
        this.demon.demonHP = this.demon.demonHP - this.archer.archerDamage;
        if(this.demon.demonHP <= 0){
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen(); 
          /** Venceu o jogo! */
          this.sound.stopAll();
          this.scene.stop();
          this.scene.start('Winning');
        }
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
          this.demon.takeDamage();
      });


        this.physics.add.overlap(this.archer.archerBullets, this.eyes, (bullet,eye) => {
          eye.eyeHP = eye.eyeHP - this.archer.archerDamage;
          if(eye.eyeHP <= 0){
            coins += 3;
            this.eyes.killAndHide(eye);
            eye.removeFromScreen();
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
          }  
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
          eye.takeDamage();
        });   

        this.physics.add.collider(this.archer.archerBullets, front, (bullet) => {
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
        });

        this.physics.add.collider(this.archer.archerBullets, front, (bullet) => {
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
        });
        
        // ataques do Boss
         this.physics.add.collider(this.demon.DemonBullets, front, (bullet) => {
          this.demon.DemonBullets.killAndHide(bullet);
          bullet.removeFromScreen();
        }); 

         this.physics.add.collider(this.demon.hitboxes, front, (hit) => {
          this.demon.hitboxes.killAndHide(hit);
          this.demon.removeHitFromScreen(hit);
        }); 
        
      // 1 ataque
      this.enemyShootDelay = 2000;
      this.demonFirstShoot = {
        delay: this.enemyShootDelay,
        repeat: 0,
        callback: () => {
            // dispara
            this.demon.shoot(this.demon.x-this.archer.x); 
            count++;
        }
      };

      // evento para duraçao de cada rajada de disparos
      this.demonFirstDelay = 9000;
      this.eventFirstShoot = {
        delay: this.demonFirstDelay,
        repeat: -1,
        callback: () => {  
            // quando acaba a animaçao de disparo entao volta a idle
            this.demon.on("animationcomplete", ()=>{
              this.demon.play('walk',true);
            });
            this.time.addEvent(this.demonFirstShoot);
        }
    };

    // Segundo ataque 
    this.enemy2ShootDelay = 0;
    this.demonSecondShoot = {
      delay: this.enemy2ShootDelay,
      repeat: 0,
      callback: () => {
          // dispara
        this.demon.spawn();
        this.demon.secondShoot(this.demon.x-this.archer.x);     
      }
    };

    this.demonSecondDelay = 4500;
    this.eventSecondShoot  = {
      delay: this.demonFirstDelay*count + this.demonSecondDelay,
      repeat: -1,
      callback: () => {  
          // quando acaba a animaçao de disparo entao volta a idle
          this.demon.on("animationcomplete", ()=>{
            this.demon.play('walk',true);
          });
          this.time.addEvent(this.demonSecondShoot);
      }
    };

    this.delayDeathRestart = 2000;
        this.deathAnim = {
        delay: this.delayDeathRestart,
        repeat: 0,
        callback: () => {
            archerLifes--;
            if(archerLifes == 0){
              alreadyPass = false;
              this.sound.stopAll();
              this.scene.stop();
              this.scene.start('GameOver');
            } else {
              this.sound.stopAll();
              this.scene.restart();
            } 
        }
    };
  }

  update(time,delta) {
      this.coin_text.setText("x" + coins);
      this.potion_hp.price_hp.setText('x'+this.potion_hp.coins) // atualiza o preco
      this.potion_hp.price_hp1.setText('x'+this.potion_velocity.coins) // atualiza o preco
      this.potion_hp.price_hp2.setText('x'+this.potion_damage.coins) // atualiza o preco
      // verifica HP do archer
      if(this.archer.archerHP > 0){
        this.archer.update(this.cursors,time);
      } else {
        this.archer.isDeath();
        this.archerDeath = true;
      }
  
      if(archerLifes <=  2){
        this.heart_image3.setVisible(false);
      }
      if(archerLifes <= 1){
        this.heart_image2.setVisible(false);
      }
      // gameover
      if(this.archerDeath == true && this.archerDeathConfigs == false){
        this.time.addEvent(this.deathAnim);
        this.archerDeathConfigs = true;
      }

      // pause game
      if(Phaser.Input.Keyboard.JustDown(this.pressP)){
        this.pauseGame();
      }

      if(Phaser.Input.Keyboard.JustDown(this.pressQ)){
        this.store();
      }
    
    if(coins >= this.potion_hp.coins){
      this.potion_hp.hp_label1.setColor("#00ff00"); 
    }else{
        this.potion_hp.hp_label1.setColor("#ff0000"); 
    } 
    if(coins >= this.potion_velocity.coins){ 
        this.potion_hp.velocity1.setColor("#00ff00") 
    }else{
        this.potion_hp.velocity1.setColor("#ff0000");    
    } 
    if(coins >= this.potion_damage.coins){ 
        this.potion_hp.power1.setColor("#00ff00");     
    }else{
        this.potion_hp.power1.setColor("#ff0000"); 
    }

    if(this.show_shop == false){
      if(Phaser.Input.Keyboard.JustDown(this.press1) && coins >= this.potion_hp.coins){
        this.archer.archerMaxHP += this.potion_hp.coins
        this.archer.archerHP = this.archer.archerMaxHP;
        this.healthBar.setScale(this.archer.archerHP/this.archer.archerMaxHP,1);
        coins -= this.potion_hp.coins;
        this.potion_hp.coins  *= 2; // para o preco dos upgrades aumentar sempre que se compra 
        upgrades[0] = this.potion_hp.coins;
        this.potion_hp.price_hp.setText('x'+this.potion_hp.coins) // atualiza o preco
      }else if(Phaser.Input.Keyboard.JustDown(this.press2) && coins >= this.potion_velocity.coins){
        this.archer.velocity += this.potion_velocity.coins;
        coins -= this.potion_velocity.coins;
        this.potion_velocity.coins *= 2; // para o preco dos upgrades aumentar sempre que se compra 
        upgrades[1] = this.potion_velocity.coins;
        this.potion_hp.price_hp1.setText('x'+this.potion_velocity.coins) // atualiza o preco
      }else if(Phaser.Input.Keyboard.JustDown(this.press3)&& coins >= this.potion_damage.coins){
        this.archer.archerDamage += 15;
        coins -= this.potion_damage.coins;
        this.potion_damage.coins *= 2; // para o preco dos upgrades aumentar sempre que se compra 
        upgrades[2] = this.potion_damage.coins;
        this.potion_hp.price_hp2.setText('x'+this.potion_damage.coins) // atualiza o preco
      }
  }

    // Mapa do Boss
    if(this.archer.x >= 4000){
      let espaco = this.demon.x-this.archer.x;
      if( espaco <= 10 && espaco >= -10  ){
        this.demon.setVelocityX(0);
        this.demon.play("demon_idle",true);
      }else{
        this.demon.update(this.demon.x-this.archer.x);
      }
      if(this.boss == false && this.bossConfigs == false){
        this.castle_song_level.stop();
        this.castle_song_boss.play();
        //evento de disparo do boss
        this.time.addEvent(this.eventFirstShoot);
        this.time.addEvent(this.eventSecondShoot);
        this.boss = true;
        this.bossConfigs = true;
      }
     
      if(this.archer.x < 4020 && this.boss == true){
        this.archer.x = 4020;
      }else if(this.archer.x > this.map.widthInPixels-20){
        this.archer.x = this.map.widthInPixels-20;
      }

      // itera os monstros do demon
      this.demon.demonMonsters.children.iterate(function(monster) {
        if(monster.x < 4050){
          monster.setVelocityX(monster.velocity);
          monster.flipX = false;
        }
        if(monster.x > this.map.widthInPixels-20){
          monster.setVelocityX(-monster.velocity);
          monster.flipX = true;
        }
      },this);


     // elimina as balas do arqueiro caso passem os limites da parte do boss
     this.archer.archerBullets.children.iterate(function (bullet) {
        if(bullet.x < 4020 || bullet.x > this.map.widthInPixels){
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
        } 
      },this);

      this.cameras.main.stopFollow(this.archer);
      this.cameras.main.setBounds(4000,0,this.map.widthInPixels,this.map.heightInPixels);

    }else if(this.boss == false){
       // elimina as balas do arqueiro caso passem os limites do mapa
     this.archer.archerBullets.children.iterate(function (bullet) {
      if(bullet.x > 4020 || bullet.x < 0){
        this.archer.archerBullets.killAndHide(bullet);
        bullet.removeFromScreen();
      } 
    },this);

      this.ghosts.children.iterate(function (ghost) {
        ghost.update(time); 
      },this);

      this.eyes.children.iterate(function (eye) {
         eye.update(time,eye.x-this.archer.x);
        },this);
    }
  }

  store(){ // loja
    if(this.show_shop == true){
      this.potion_hp.potions_text(this.show_shop,coins);
      this.potion_hp.setVisible(true);
      this.potion_velocity.setVisible(true);
      this.potion_damage.setVisible(true);
      this.image_coin.setVisible(true);
      this.image_coin1.setVisible(true);
      this.image_coin2.setVisible(true);
      this.show_shop = false;
    }else{
      this.potion_hp.potions_text(this.show_shop,coins);
      this.potion_hp.setVisible(false);
      this.potion_velocity.setVisible(false);
      this.potion_damage.setVisible(false);
      this.image_coin.setVisible(false);
      this.image_coin1.setVisible(false);
      this.image_coin2.setVisible(false);
      this.show_shop = true;
    }
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));
            
    percentage = percentage * 100;
    this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
    console.log("P:" + percentage);
    
  }

  complete() {
      console.log("COMPLETE!");
  }

  // pause game
  pauseGame(){
    this.scene.launch('Paused',{
        map: 'Forest',
    });
    this.scene.pause();
  }

}