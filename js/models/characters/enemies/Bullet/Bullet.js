import Explosion from "../Explosion/Explosion.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "monsterbullet");

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.baseVelocity = 350;

        // pos de criaçao
        this.pos = this.x;

    }

    removeFromScreen() {
        this.y = 900;
        this.setVelocity(0, 0);
    }

    explosion(){
        new Explosion(this.scene,this.x,this.y);
    }

}