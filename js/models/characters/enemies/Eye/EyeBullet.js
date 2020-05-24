export default class EyeBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "eye_bullet");

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.baseVelocity = 350;

        // pos de criaçao
        this.pos = this.x;

    }

    isOutsideCanvas() {
        return this.x > 100 || this.y > 100 || this.x < 0 || this.y < 0;
    }


    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }

}