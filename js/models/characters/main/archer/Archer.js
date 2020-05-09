import Arrow from "./Arrow.js";

//import Arrow from "../../../models/characters/main/archer/Arrow.js";
export default class Archer extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 40);
        this.setOffset(48,35);

        this.velocity = 200;

        this.bulletsMaxsize = 1;
        this.archerBullets = this.scene.physics.add.group({
            classType: Arrow,
            maxSize: this.bulletsMaxsize,
            allowGravity: false,
        });

        // animations
        this.scene.anims.create({
            key: 'archer_run', 
            frames: this.scene.anims.generateFrameNumbers('archer_run', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'archer', 
            frames: this.scene.anims.generateFrameNumbers('archer', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'archer_shoot', 
            frames: this.scene.anims.generateFrameNumbers('archer_shoot', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: 1,
        });

        this.scene.anims.create({
            key: 'archer_arrow', 
            frames: this.scene.anims.generateFrameNumbers('archer_arrow', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1,
        });

    }

    update(cursors,time){

        this.setVelocityX(0);
        
        if (cursors.down.isDown) {
            // baixar

        } else if (cursors.up.isDown && this.body.blocked.down) {
            // saltar
            this.setVelocityY(-350);	  
  
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.velocity);
            this.play('archer_run',true);
            this.flipX = false;
        } else if (cursors.left.isDown && this.x > 0) {
            this.setVelocityX(-this.velocity);
            this.play('archer_run',true);
            this.flipX = true;
        }else if (cursors.space.isDown) {
            this.shoot(time);
        } else {
            this.play('archer',true);
        }
    }

    // falta disparar em 1 click // 
    shoot(time){
        let bullet = this.archerBullets.getFirstDead(true, this.x, this.y-10,"archer_arrow",3);
        this.play('archer_shoot',true);
        if(bullet){
            bullet.setVelocityX(bullet.baseVelocity);
            bullet.active = true;
            bullet.visible = true;
            //this.timeToShoot = time + this.fireRate;
        }
    }

}