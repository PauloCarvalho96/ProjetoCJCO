import Fireball from "../FireBall/Fireball.js";

export default class Nightmare extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(95, 70);
        this.setOffset(15,25);

        this.velocity = 100;

        this.bulletsMaxsize = 10;
        this.nightmarebullets = this.scene.physics.add.group({
            classType: Fireball,
            maxSize: this.bulletsMaxsize,
        });
        this.timeToShoot = 0;
        this.fireRate = 5000;
        this.bulletsOnShoot = 5;

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

    // para disparar
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

}