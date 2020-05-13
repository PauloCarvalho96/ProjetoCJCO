
export default class DemonBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.baseVelocity = 350;
        this.setVelocity(this.baseVelocity);
        // pos de criaçao
        this.pos = this.x;
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }

}