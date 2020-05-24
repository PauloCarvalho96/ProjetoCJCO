

export default class FireSkull extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, offset) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(70, 90);
        this.setOffset(10,30);

        this.offset = offset;

        // pos de criaçao
        this.pos = this.x;

        this.fireskullHP = 100;

        // animations
        this.scene.anims.create({
            key: 'fireskull', 
            frames: this.scene.anims.generateFrameNumbers('fireskull', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });

        this.play('fireskull',true);

        this.flipX = true;
        this.velocity = 100;

    }

    update(){
        if(this.x >= this.pos + this.offset){
            this.setVelocityX(-this.velocity);
            this.flipX = false;
        } else  if(this.x <= this.pos - this.offset){
            this.setVelocityX(this.velocity);
            this.flipX = true;
        }
    }

    removeFromScreen() {
        this.y = 1000;
        this.setVelocity(0, 0);
    }

}