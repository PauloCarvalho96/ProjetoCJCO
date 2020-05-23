import Fireball from "../FireBall/Fireball.js";
import FireSkull from "../FireSkull/FireSkull.js";

export default class Nightmare extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(95, 70);
        this.setOffset(15,25);
        
        this.nightmareHP = 100;
        this.nightmareDamage = 20;
        this.velocity = 100;

        // grupo de balas
        this.bulletsMaxsize = 10;
        this.nightmarebullets = this.scene.physics.add.group({
            classType: Fireball,
            maxSize: this.bulletsMaxsize,
        });
        this.timeToShoot = 0;
        this.fireRate = 5000;
        this.bulletsOnShoot = 5;

        // grupo de monstros
        this.monstersMaxsize = 3;
        this.nightmaremonsters = this.scene.physics.add.group({
            classType: FireSkull,
            maxSize: this.monstersMaxsize,
        });
        this.timeToSpawn = 0;
        this.spawnRate = 6000;
        this.enemiesToSpawn = 3;

        // animations
        this.scene.anims.create({
            key: 'nightmare_idle', 
            frames: this.scene.anims.generateFrameNumbers('nightmare_idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'nightmare_run', 
            frames: this.scene.anims.generateFrameNumbers('nightmare_run', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1,
        });

        this.play('nightmare_run');

    }

    update(time){
        //pos
        this.checkPos();
        //shoot
        this.shoot(time);
        //spawn enemies
        this.spawn(time);
        //verify monsters pos
        this.checkMonsters();
    }

    checkPos(){
        if(this.x < 5010){
            this.setVelocityX(this.velocity);
            this.flipX = true;
        } else if(this.x > 5790){
            this.setVelocityX(-this.velocity);
            this.flipX = false;
        }
    }
    takeDamage(){
        let i = 0;
        let repetition = 100;
        let changeTint = true;

        this.scene.time.addEvent({
            repeat: repetition,
            loop: false,
            callback: () => {
                //in the last repetition replace the normal color (tint) and re-enables collision
                if (i >= repetition) {
                    this.tint = 0xFFFFFF
                } else {

                    if (changeTint) {
                        this.tint = 0xFF0000
                    } else {
                        this.tint = 0xFFFFFF
                    }
                    if (i % 20 == 0) {
                        changeTint = !changeTint;
                    }
                }
                i++
            }
        });

    }
    shoot(time){
        if(this.timeToShoot < time){
            for(let i=0;i<this.bulletsOnShoot;i++){
                let px = Math.floor(Math.random() * (5700 - 5100 + 1) + 5100);
                let bullet = this.nightmarebullets.getFirstDead(true, px, 20);
                if(bullet){
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
                let px = Math.floor(Math.random() * (5700 - 5100 + 1) + 5100);
                let monster = this.nightmaremonsters.getFirstDead(true, px, 500);
                if(monster){
                    monster.setVelocity(monster.velocity,0);
                    monster.setScale(0.5);
                    monster.active = true;
                    monster.visible = true;
                    this.timeToSpawn = time + this.spawnRate;
                }
            }  
        }
    }

    checkMonsters(){
        // itera os monstros do wizard
        this.nightmaremonsters.children.iterate(function(monster) {
            if(monster.x < 5000){
                monster.setVelocityX(monster.velocity);
                monster.flipX = true;
            }
            if(monster.x > 5800){
                monster.setVelocityX(-monster.velocity);
                monster.flipX = false;
            }
        },this);
    }

}