
export default class Mushroom extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 38);
        this.setOffset(60,60);

        // animations
        this.scene.anims.create({
            key: 'mushroom_idle', 
            frames: this.scene.anims.generateFrameNumbers('mushroom_idle', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1,
        });

    }

    update(){
        this.play('mushroom_idle',true);
    }

}