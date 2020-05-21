export default class Skeleton extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 50);
        this.setOffset(50,50);

        this.velocity = 60;

        this.setVisible(true);

        // animations
        this.scene.anims.create({
            key: 'skeleton_run', 
            frames: this.scene.anims.generateFrameNumbers('skeleton_run', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1,
        });
       
       this.setVelocityX(this.velocity);
       this.play('skeleton_run',true);
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }
   
}