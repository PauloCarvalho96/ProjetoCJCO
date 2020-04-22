import Bullet from "../Bullet/Bullet.js";

export default class Wizard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(60, 90);
        this.setOffset(90,50);
        this.flipX = true;

        this.bulletsMaxsize = 6;
        this.wizardBullets = this.scene.physics.add.group({
            classType: Bullet,
            maxSize: this.bulletsMaxsize,
            allowGravity: false,
        });

        // animations
        this.scene.anims.create({
            key: 'wizard_idle', 
            frames: this.scene.anims.generateFrameNumbers('wizard_idle', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1,
        });

        // disparar bala
        this.scene.anims.create({
            key: 'wizard_attack1', 
            frames: this.scene.anims.generateFrameNumbers('wizard_attack1', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: 2,
        });

        // spawn de inimigos
        this.scene.anims.create({
            key: 'wizard_attack2', 
            frames: this.scene.anims.generateFrameNumbers('wizard_attack2', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

        this.play('wizard_idle');
    }

    shoot(){
        let bullet = this.wizardBullets.getFirstDead(true,this.x,this.y);
        if(bullet){

            //direção da bala (random)
            const vx = Math.floor((Math.random() * 400) + 300);
            const vy = Math.floor((Math.random() * 200) + 100);
            
            bullet.setVelocityX(-vx);
            bullet.setVelocityY(-vy);
            bullet.active = true;
            bullet.visible = true;
            
        }
    }

}