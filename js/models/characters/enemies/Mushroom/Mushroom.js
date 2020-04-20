import MushroomBullet from "./MushroomBullet.js";

export default class Mushroom extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 38);
        this.setOffset(60,60);

        this.bulletsMaxsize = 5;
        this.mushroomBullets = this.scene.physics.add.group({
            maxSize: this.bulletsMaxsize,
            allowGravity: false,
            classType: MushroomBullet
        });
        this.timeToShoot = 0;
        this.fireRate = 1000;

        // animations
        this.scene.anims.create({
            key: 'mushroom_idle', 
            frames: this.scene.anims.generateFrameNumbers('mushroom_idle', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1,
        });
/* 
        this.scene.anims.create({
            key: 'mushroom_run', 
            frames: this.scene.anims.generateFrameNumbers('mushroom_run', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1,
        });
 */
    }

    update(time){
        this.play('mushroom_idle',true);

        if(this.timeToShoot < time){
            let bullet = this.mushroomBullets.getFirstDead(true, this.x, this.y);
            if(bullet){
                bullet.setVelocityX(350);
                bullet.active = true;
                bullet.visible = true;
    
                this.timeToShoot = time + this.fireRate;
            }
        }              
    } 

}