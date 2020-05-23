import Explosion from "../Explosion/Explosion.js";

export default class Fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(15, 15);
        this.setOffset(0,0);

        this.baseVelocity = 300;

        // pos de criaçao
        this.pos = this.x;

        // animations
        this.scene.anims.create({
            key: 'fireball', 
            frames: this.scene.anims.generateFrameNumbers('fireball', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1,
        });

        this.play('fireball');
        this.angle = 270;
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }
    
    explosion(){
        this.explosion_scene = new Explosion(this.scene,this.x,this.y);
        this.explosion_scene.removeFromScreen();
    }

}