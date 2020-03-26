
export default class Knight extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "knight");

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        //this.knight.setSize(30,30);
        //this.knight.setOffset(20,15);
        
        this.velocity = 100;

        // animations
        this.scene.anims.create({
            key: 'run', 
            frames: this.scene.anims.generateFrameNumbers('knight_run', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'steady', 
            frames: this.scene.anims.generateFrameNumbers('knight', { start: 0, end: 14 }),
            frameRate: 15,
            repeat: -1,
        });

    }

    update(cursors){

        this.setVelocity(0);

        if (cursors.down.isDown) {
            // baixar

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