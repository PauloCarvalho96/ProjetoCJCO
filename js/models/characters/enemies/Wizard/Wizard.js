
export default class Wizard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(60, 90);
        this.setOffset(90,50);

        // animations
        this.scene.anims.create({
            key: 'wizard_idle', 
            frames: this.scene.anims.generateFrameNumbers('wizard_idle', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1,
        });

    }

    update(){
        this.play('wizard_idle');
        this.flipX = true;
    }

}