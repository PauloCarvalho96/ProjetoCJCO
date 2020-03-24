
export default class Archer extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "archer");

        this.scene.add.existing(this);

        //enable physics to sprite
        this.scene.physics.world.enable(this);

        this.velocity = 100;
        this.setGravityY(10);

        // animations
        this.scene.anims.create({
            key: 'run', 
            frames: this.scene.anims.generateFrameNumbers('archer_run', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'steady', 
            frames: this.scene.anims.generateFrameNumbers('archer', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

    }

    update(cursors){

        this.setVelocity(0);

        if (cursors.down.isDown) {
            // abaixar

        } else if (cursors.up.isDown) {
            // saltar
            
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.velocity);
            this.play('run',true);
            this.flipX = false;
        } else if (cursors.left.isDown) {
            this.setVelocityX(-this.velocity);
            this.play('run',true);
            this.flipX = true;
        } else {
            this.play('steady',true);
        }
    }

}