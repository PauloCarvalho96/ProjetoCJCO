export default class Ghost extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, offset) {
        super(scene, x, y);
        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 50);
        this.setOffset(15,20);
        this.ghostHP = 100;
        this.ghostDamage = 5;
        this.count=0;
        this.velocity = 60;
        this.positionx = this.x;
        this.positiony = this.y;
        this.offset = offset;

        this.setVisible(true);
        // pos de criaçao
        this.pos = this.x;

        // animations
        this.scene.anims.create({
            key: 'ghost_idle', 
            frames: this.scene.anims.generateFrameNumbers('ghost_idle', { start: 0, end: 6 }),
            frameRate: 6,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'ghost_appears', 
            frames: this.scene.anims.generateFrameNumbers('ghost_appears', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0,
        });
        this.scene.anims.create({
            key: 'ghost_vanish', 
            frames: this.scene.anims.generateFrameNumbers('ghost_vanish', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0,
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
       this.play('ghost_idle',true);
    }

    removeFromScreen() {
        this.y = 1000;
        this.velocity = 0;
    }

    update(){
        if(this.x >= this.pos + this.offset){
            this.setVelocityX(-this.velocity);
            this.flipX = false;
        } else  if(this.x <= this.pos - this.offset){
            this.setVelocityX(this.velocity);
            this.flipX = true;
        }
        
        this.checkGhostpos();
    }
   
    checkGhostpos(){  
        if(this.x >= this.positionx +30){
            this.play('ghost_vanish',true);
           // this.setVisible(false);
        }else if(this.x <= this.positionx -30){
            //this.setVisible(true);
            this.play('ghost_appears',true);
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



}