
export default class Goblin extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, offset) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 38);
        this.setOffset(60,60);

        this.velocity = 50;
        // valor recebido para quanto o inimigo pode andar de um lado para o outro
        this.offset = offset;

        // pos de criaçao
        this.pos = this.x;

        // animations
        this.scene.anims.create({
            key: 'goblin_run', 
            frames: this.scene.anims.generateFrameNumbers('goblin_run', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

        this.setVelocityX(this.velocity);
    }

    update(){

        this.play('goblin_run',true);

        if(this.x >= this.pos + this.offset){
            this.setVelocityX(-this.velocity);
            this.flipX = true;
        } else  if(this.x <= this.pos - this.offset){
            this.setVelocityX(this.velocity);
            this.flipX = false;
        }

    }
}