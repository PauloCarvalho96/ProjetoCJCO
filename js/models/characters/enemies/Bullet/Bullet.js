
export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "mushroom_bullet");

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.baseVelocity = 350;

        // pos de criaçao
        this.pos = this.x;

    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }

}