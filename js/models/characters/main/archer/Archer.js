export default class Archer extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 40);
        this.setOffset(48,35);

        this.velocity = 200;

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

        /*
        //Não funciona
        this.scene.anims.create({
            key: 'jump', 
            frames: this.scene.anims.generateFrameNumbers('archer_jump', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: 1,
        });
        */
    }

    update(cursors){

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
        } else {
            this.play('archer',true);
        }
    }

}