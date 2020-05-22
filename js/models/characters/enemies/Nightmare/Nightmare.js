
export default class Nightmare extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(95, 70);
        this.setOffset(15,25);

        this.velocity = 100;

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

    update(){
        //pos
        this.checkPos()
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

}