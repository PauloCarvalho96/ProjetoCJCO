
export default class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y,texture,frame) {
        super(scene, x, y,texture,frame);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setScale(0.5)
        this.setSize(60, 10);
        this.setOffset(35,60);

        this.baseVelocity = 300;

        this.scene.anims.create({
            key: 'archer_arrow', 
            frames: this.scene.anims.generateFrameNumbers('archer_arrow', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1,
        });
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }
}