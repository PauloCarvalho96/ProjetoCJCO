import Goblin from "../Goblin/Goblin.js";
import Fireball from "../FireBall/Fireball.js";

export default class Wizard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(60, 90);
        this.setOffset(90,50);

        this.flipX = true;
        this.wizardHP = 500;
        this.wizardDamage= 10;

        this.bulletsMaxsize = 10;
        this.wizardBullets = this.scene.physics.add.group({
            classType: Fireball,
            maxSize: this.bulletsMaxsize,
        });
        this.bulletsOnShoot = 5;
        this.fireRate = 6000;
        this.timeToShoot = 0;

        this.monstersMaxsize = 10;
        this.wizardMonsters = this.scene.physics.add.group({
            classType: Goblin,
            maxSize: this.monstersMaxsize,
        });
        this.enemiesToSpawn = 6;
        this.spawnRate = 10000;
        this.timeToSpawn = 0;

        // animations
        this.scene.anims.create({
            key: 'wizard_idle', 
            frames: this.scene.anims.generateFrameNumbers('wizard_idle', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'wizard_run', 
            frames: this.scene.anims.generateFrameNumbers('wizard_run', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1,
        });

        // disparar bala
        this.scene.anims.create({
            key: 'wizard_attack1', 
            frames: this.scene.anims.generateFrameNumbers('wizard_attack1', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: 0,
        });

        // spawn de inimigos
        this.scene.anims.create({
            key: 'wizard_attack2', 
            frames: this.scene.anims.generateFrameNumbers('wizard_attack2', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: 0,
        });

        this.play('wizard_run',true);
        this.setVelocityX(0);
    }

    update(time){
        //check wizard pos
        this.pos();
        //spawn enemies
        this.spawn(time);
        //check monster pos
        this.checkMonsters();
        //shoot
        this.shoot(time);  

        this.on("animationcomplete", ()=>{
            this.play('wizard_run',true);
        });
    }

    pos(){
        if(this.x < 3850){
            this.setVelocityX(50);
            this.flipX = false;
        } else if(this.x > 4500){
            this.setVelocityX(-50);
            this.flipX = true;
        }
    }

    checkMonsters(){
        // itera os monstros do wizard
        this.wizardMonsters.children.iterate(function(monster) {
            if(monster.x < 3900){
                monster.setVelocityX(monster.velocity);
                monster.flipX = false;
            }
            if(monster.x > 4550){
                monster.setVelocityX(-monster.velocity);
                monster.flipX = true;
            }
        },this);
    }

    shoot(time){
        if(this.timeToShoot < time){
            for(let i=0;i<this.bulletsOnShoot;i++){
                let px = Math.floor(Math.random() * (4500 - 4000 + 1) + 4000);
                let bullet = this.wizardBullets.getFirstDead(true, px, 20);
                if(bullet){
                    this.play('wizard_attack1',true);
                    bullet.setVelocity(0,0);
                    bullet.active = true;
                    bullet.visible = true;
                    this.timeToShoot = time + this.fireRate;
                }
            }  
        }
    }

    spawn(time){
        if(this.timeToSpawn < time){
            for(let i=0;i<this.enemiesToSpawn;i++){
                let px = Math.floor(Math.random() * (4500 - 4000 + 1) + 4000);
                let monster = this.wizardMonsters.getFirstDead(true, px, 550);
                if(monster){
                    this.play('wizard_attack2',true);
                    monster.setVelocity(-monster.velocity,0);
                    monster.flipX = true;
                    monster.active = true;
                    monster.visible = true;
                    this.timeToSpawn = time + this.spawnRate;
                }
            }  
        }
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }

}