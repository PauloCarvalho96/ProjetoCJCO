
export default class Explosion extends Phaser.Physics.Arcade.Sprite {

    constructor(scene,x,y){
        super(scene,x,y,"explosion");
        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.explosion=this.scene.anims.create({
            key: 'explosion', 
            frames: this.scene.anims.generateFrameNumbers('explosion', { start: 0, end: 31 }),
            frameRate: 60,
            repeat: 0 
        });

        this.body.allowGravity = false;
        this.play("explosion");
    }

    removeFromScreen() {
        this.on("animationcomplete", ()=>{
            this.y = 700;
            this.setVelocity(0, 0);
        });     
    }
}