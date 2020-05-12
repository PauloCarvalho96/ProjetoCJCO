export default class Eye extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, offset) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 40);
        this.setOffset(66,56);

        this.velocity = 25;
        this.position = this.x;
        this.offset = offset;

        // pos de criaçao
        this.pos = this.x;

        // animations
        this.scene.anims.create({
            key: 'eye_fly', 
            frames: this.scene.anims.generateFrameNumbers('eye_fly', { start: 0, end: 3 }),
            frameRate: 1,
            repeat: -1,
        });
        /*
        //Não funciona
        this.scene.anims.create({
            key: 'jump', 
            frames: this.scene.anims.generateFrameNumbers('archer_jump', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: 1,
        });
        */
       this.setVelocityX(this.velocity);
    }

    update(){
        this.play('eye_fly',true);
        if(this.x >= this.pos + this.offset){
            this.setVelocityX(-this.velocity);
            this.flipX = true;
        } else  if(this.x <= this.pos - this.offset){
            this.setVelocityX(this.velocity);
            this.flipX = false;
        }
    }

}