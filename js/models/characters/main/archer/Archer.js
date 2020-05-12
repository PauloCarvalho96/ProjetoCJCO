import Arrow from "../../../models/characters/main/archer/Arrow.js";
export default class Archer extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 40);
        this.setOffset(48,35);
        this.Arrow = this.scene.physics.add.group({
            maxSize:5,
            classType: Bullet
        });
        this.velocity = 100;

        // animations
        this.scene.anims.create({
            key: 'run', 
            frames: this.scene.anims.generateFrameNumbers('archer_run', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'steady', 
            frames: this.scene.anims.generateFrameNumbers('archer', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });
       // this.arrow = new Arrow(this,this.x,this.y);
        /*
        //Não funciona
        this.scene.anims.create({
            key: 'jump', 
            frames: this.scene.anims.generateFrameNumbers('archer_jump', { start: 0, end: 11 }),
            frameRate: 15,
            repeat: 1,
        });
        */
    }

    update(cursors){

        this.setVelocityX(0);
        
        if (cursors.down.isDown) {
            // baixar

        } else if (cursors.up.isDown && this.body.blocked.down) {
            // saltar
            this.setVelocityY(-250);	  
  
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.velocity);
            this.play('run',true);
            this.flipX = false;
        } else if (cursors.left.isDown) {
            this.setVelocityX(-this.velocity);
            this.play('run',true);
            this.flipX = true;
        } else {
            this.play('steady',true);
        }

        if (cursors.space.isDown & this.timeToShoot<time){
            let bullet = this.bullets.getFirstDead(true, this.x , this.y , "bullet");
            if(bullet){
                //bullet.setVelocityX(400);
                
               bullet.fire(this.scene.enemy);
            }
           

            this.timeToShoot = time + this.fireRate;
            }
        
    this.bullets.children.iterate(function(bullet){
        
        if(bullet.isOutsideCanvas()){
            this.bullets.killAndHide(bullet);
        }
    }, this);
    }

}