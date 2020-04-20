import Bullet from "../../../bullet/bullet.js";
export default class Eye extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, offset) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 40);
        this.setOffset(66,56);

        this.velocity = 25;
        this.position = this.x;
        this.offset = offset;

        this.timeToShoot = 0;
        this.fireRate = 1000;

        // pos de criaçao
        this.pos = this.x;

        //this.bulletsMaxsize = 5;

        this.bullets = this.scene.physics.add.group({
           // maxSize: this.bulletsMaxsize,
           allowGravity: false,
           classType: Bullet
        });

        // animations
        this.scene.anims.create({
            key: 'eye_fly', 
            frames: this.scene.anims.generateFrameNumbers('eye_fly', { start: 0, end: 3 }),
            frameRate: 1,
            repeat: -1,
        });
        /*
        //Não funciona
        this.scene.anims.create({
            key: 'jump', 
            frames: this.scene.anims.generateFrameNumbers('archer_jump', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: 1,
        });
        */
       this.setVelocityX(this.velocity);
    }

    update(time){

        if (this.timeToShoot < time) {
            //let bullet = this.scene.physics.add.image(this.x, this.y, "bullet");
            let bullet = this.bullets.getFirstDead(true, this.x, this.y);

            if (bullet) {
                bullet.setVelocityX(350);
                bullet.active = true;
                bullet.visible = true;
                //bullet.fire(this.scene.enemy);
            }
            //this.bullets.push(bullet);

            this.timeToShoot = time + this.fireRate;
        }

        this.play('eye_fly',true);
        if(this.x >= this.pos + this.offset){
            this.setVelocityX(-this.velocity);
            this.flipX = true;
        } else  if(this.x <= this.pos - this.offset){
            this.setVelocityX(this.velocity);
            this.flipX = false;
        }

        //this.bullets.children.iterate(function (bullet) {
        //    if (bullet.isOutsideCanvas()) {
         //       //bullet.active = false;
        //        this.bullets.killAndHide(bullet);
        //    }
       // }, this);
    }

}