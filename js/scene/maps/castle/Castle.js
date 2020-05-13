import SkeletonGroup from "../../../models/characters/enemies/Skeleton/SkeletonGroup.js";
import EyeGroup from "../../../models/characters/enemies/Eye/EyeGroup.js";
import Archer from "../../../models/characters/main/archer/Archer.js";
import Demon from "../../../models/characters/enemies/Demon/Demon.js";
import Knight from "../../../models/characters/main/knight/Knight.js";
import Skeleton from "../../../models/characters/enemies/Skeleton/Skeleton.js";
import Bullet from "../../../models/bullet/bullet.js";

let count = 0;

export default class Castle extends Phaser.Scene {
  
  constructor() {
    super("Castle");
  }

  preload() {
    // Mapa
    this.load.image("back1", "assets/maps/castle/tiles/background1.png");
    this.load.image("back2", "assets/maps/castle/tiles/background2.png");
    this.load.image("back3", "assets/maps/castle/tiles/background3_A.png");
    this.load.image("back3_b", "assets/maps/castle/tiles/background3_B.png");
    this.load.image("back4", "assets/maps/castle/tiles/background4.png");
    this.load.image("back5", "assets/maps/castle/tiles/background5.png");
    this.load.image("tiles", "assets/maps/castle/tiles/main_lev_build.png");
    this.load.image("decorative", "assets/maps/castle/tiles/other_and_decorative.png");
    this.load.image("tocha", "assets/maps/castle/tiles/torch-C-03.png");
    this.load.image("lava", "assets/maps/castle/tiles/lava.png");

    this.load.tilemapTiledJSON("map", "assets/maps/castle/map2_v3.json");

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

    this.load.spritesheet("archer_shoot", "assets/characters/main/archer/ArcherAttack.png", {
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

    this.load.image("bullet", "assets/bullet/bullet.png");

    // se conseguir chegar ao final do nivel entra no modo de BOSS
    this.boss = false;
    this.bossConfigs = false;

    }

    create() {
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
      const tochas = this.map.addTilesetImage("torch-C-03", "tocha");
      const dec = this.map.addTilesetImage("other_and_decorative", "decorative");
      const dec1 = this.map.addTilesetImage("lava", "lava");


      // Parameters: layer name (or index) from Tiled, tileset, x, y
      this.map.createStaticLayer("background1", back1, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background2", back2, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background3_a", back3, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background3_b", back3_b, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background4", back4, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background5", back5, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("fundo_castelo", castle, 0, 0);
      this.map.createStaticLayer("decoracao", dec, 0, 0);
      this.map.createStaticLayer("tochas", tochas, 0, 0);
      this.map.createStaticLayer("janelas", windows, 0, 0);

      const front = this.map.createStaticLayer("piso", tileset, 0, 0);
      const front1 = this.map.createStaticLayer("lava", dec1, 0, 0);
    
      // this.archer = new Archer(this, 100, 300);
      this.archer = new Archer(this, 3960, 500);
       /** 
         * create a new EnemiesGroup (new class to handle group of Enemy) that can hold 100 enemies
         */
      this.skeletons = new SkeletonGroup(this.physics.world,this);
      this.skeletons.setVelocityX(50);

      this.eyes = new EyeGroup(this.physics.world,this);
      this.eyes.setVelocityX(50);

      // BOSS
      this.demon = new Demon(this,4412,480);
      this.demon.setVelocityX(50);
      //get the scene camera
      const camera = this.cameras.main;
      //make camera follow mario
      camera.startFollow(this.archer); // para a camara seguir sempre o boneco
      //camera is not allowed to go out bounds
      camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

      this.cursors = this.input.keyboard.createCursorKeys();

      //set tiles from front tilemap that have collides property true as collidable
      front.setCollisionByProperty({ "colides": true }, true); // escrevi mal eu sei mas agora fica assim !!!
      front1.setCollisionByProperty({ "colides": true }, true);
      //set collision between collidable tiles from front and mario
      this.physics.add.collider(this.archer, front);
      this.physics.add.collider(this.skeletons,front);
      this.physics.add.collider(this.eyes,front);
      this.physics.add.collider(this.demon,front);

      this.physics.add.collider(this.archer,front1,() => {
        this.scene.restart();
      });

      // caso a personagem toque num goblin
      this.physics.add.overlap(this.archer, this.skeletons, () => {
        this.scene.restart();
      }); 

      this.eyes.children.iterate(function (eye) {
        this.physics.add.collider(front, eye.bullets,(bullet) =>{
          eye.bullets.killAndHide(bullet);
          bullet.removeFromScreen();
        });
         // adiciona collider da bala com personagem
         this.physics.add.collider(this.archer, eye.bullets, (bullet) => {
          this.scene.restart();
         });
      },this);

        // Collider dos ataques do Boss com o arqueiro
        // adiciona collider da bala com personagem
        this.physics.add.collider(this.archer, this.demon.DemonBullets, (bullet) => {
          this.scene.restart();
         });

         // adiciona collider da bala com personagem
         this.physics.add.collider(this.archer, this.demon.hitboxes, (bullet) => {
          this.scene.restart();
         });

        // archer arrow (propriedades)
        this.physics.add.overlap(this.archer.archerBullets, this.skeletons, (bullet,skeleton) => {
            this.skeletons.killAndHide(skeleton);
            skeleton.removeFromScreen();
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        });

        this.physics.add.overlap(this.archer.archerBullets, this.eyes, (bullet,eye) => {
            this.eyes.killAndHide(eye);
            eye.removeFromScreen();
            this.archer.archerBullets.killAndHide(bullet);
            bullet.removeFromScreen();
        }); 

        this.physics.add.collider(this.archer.archerBullets, front, (bullet) => {
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
        });

        this.physics.add.collider(this.archer.archerBullets, front, (bullet) => {
          this.archer.archerBullets.killAndHide(bullet);
          bullet.removeFromScreen();
        });

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
    this.enemy2ShootDelay = 1000;
    this.demonSecondShoot = {
      delay: this.enemy2ShootDelay,
      repeat: 0,
      callback: () => {
          // dispara
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
      // evento para duraçao de cada spawn de inimigos
      /*  this.eventSpawnDelay = 5000;
      this.eventSpawnConfig = {
          delay: this.eventSpawnDelay,
          repeat: -1,
          callback: () => {  
              this.demon.on("animationcomplete", ()=>{
                  this.demon.play('walk',true);
              });
              this.time.addEvent(this.enemySpawnConfig);
          }
      };  */

  }

  update(time,delta) {
    console.log(this.archer.x);
    console.log(this.archer.y);
   // console.log(count);
    this.archer.update(this.cursors,time,this.map.widthInPixels);

    if(this.archer.x >= 4000){
      let espaco = this.demon.x-this.archer.x;
      if( espaco <= 10 && espaco >= -10  ){
        this.demon.setVelocityX(0);
        this.demon.play("demon_idle",true);
      }else{
        this.demon.update(this.demon.x-this.archer.x);
      }
      if(this.boss == false && this.bossConfigs == false){
        //evento de disparo do boss
        this.time.addEvent(this.eventFirstShoot);
        this.time.addEvent(this.eventSecondShoot);
        this.boss = true;
        this.bossConfigs = true;
    }

      this.cameras.main.stopFollow(this.archer);
      this.cameras.main.setBounds(4000,0,this.map.widthInPixels,this.map.heightInPixels);


    }else{
      this.skeletons.children.iterate(function (skeleton) {
        skeleton.update()
      },this);

      this.eyes.children.iterate(function (eye) {
         eye.update(time,eye.x-this.archer.x)
        },this);
    }
  }

}
