
export default class Goblin extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, offset) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 38);
        this.setOffset(60,60);
        
        this.gobHP=100;
        this.gobDamage = 5;

        this.velocity = 100;
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

        this.play('goblin_run',true);

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
    takeDamage(){
        let i = 0;
        let repetition = 100;
        let changeTint = true;

        this.scene.time.addEvent({
            repeat: repetition,
            loop: false,
            callback: () => {
                //in the last repetition replace the normal color (tint) and re-enables collision
                if (i >= repetition) {
                    this.tint = 0xFFFFFF
                } else {

                    if (changeTint) {
                        this.tint = 0xFF0000
                    } else {
                        this.tint = 0xFFFFFF
                    }
                    if (i % 20 == 0) {
                        changeTint = !changeTint;
                    }
                }
                i++
            }
        });

    }
    
    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }
    
}