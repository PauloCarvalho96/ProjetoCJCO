import Arrow from "./Arrow.js";

export default class Archer extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 40);
        this.setOffset(48,35);

        this.totalLifes = 3;

        // hp archer
        this.archerHP = 100;
        this.archerMaxHP = 100;
        this.archerDamage = 25;
        
        this.velocityY = -350;
        this.velocity = 150;
        this.velocityY = -350;

        this.bulletsMaxsize = 5;
        this.archerBullets = this.scene.physics.add.group({
            classType: Arrow,
            maxSize: this.bulletsMaxsize,
            allowGravity: false,
        });
        this.timeToShoot = 0;
        this.fireRate = 350;    

        // animations
        this.scene.anims.create({
            key: 'archer', 
            frames: this.scene.anims.generateFrameNumbers('archer', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: 0,
        });

        this.scene.anims.create({
            key: 'archer_run', 
            frames: this.scene.anims.generateFrameNumbers('archer_run', { start: 0, end: 7 }),
            frameRate: 30,
            repeat: 0,
        });

        this.scene.anims.create({
            key: 'archer_shoot', 
            frames: this.scene.anims.generateFrameNumbers('archer_shoot', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: 0,
        });

        this.scene.anims.create({
            key: 'archer_jump', 
            frames: this.scene.anims.generateFrameNumbers('archer_jump', { start: 0, end: 11 }),
            frameRate: 7,
            repeat: 0,
        });

        this.scene.anims.create({
            key: 'archer_death', 
            frames: this.scene.anims.generateFrameNumbers('archer_death', { start: 0, end: 23 }),
            frameRate: 10,
            repeat: 0,
        });

        this.scene.anims.create({
            key: 'archer_arrow', 
            frames: this.scene.anims.generateFrameNumbers('archer_arrow', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0,
        });

        this.play('archer',true);

    }

    update(cursors,time){

        this.setVelocityX(0);

        // pos da seta
        this.checkbulletpos();
        
        if (cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(this.velocityY);	  
            this.play('archer_jump',true);
            this.jumpSound.play();
        }
        else if (cursors.right.isDown) {
            this.setVelocityX(this.velocity);
            this.play('archer_run',true);
            this.flipX = false;
        } else if (cursors.left.isDown && this.x > 0) {
            this.setVelocityX(-this.velocity);
            this.play('archer_run',true);
            this.flipX = true;
        }else if (cursors.space.isDown) {
            this.play('archer_shoot',true);
            if(this.timeToShoot < time){
                this.shoot(time);
            }
        }

        this.on("animationcomplete", ()=>{
            this.play('archer',true);
        }); 
    }

    isDeath(){
        this.archerHP = 0;
        this.play('archer_death',true);
    }

    // verifica pos da seta
    checkbulletpos(){
        this.archerBullets.children.iterate(function (bullet) {
            if(bullet.x < 0){
                this.archerBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
        },this);
    }

    shoot(time){
        // verifica pos do jogador para disparar a seta
        if(this.flipX){
            this.direction = 1;
        } else {
            this.direction = 3;
        }
        let bullet = this.archerBullets.getFirstDead(true, this.x, this.y-10,"archer_arrow",this.direction);
        if(bullet){ 
            this.fireSound.play();
            //velocidade da bala
            if(this.flipX){
                bullet.setVelocityX(-bullet.baseVelocity);
            } else {
                bullet.setVelocityX(bullet.baseVelocity);
            }
            bullet.active = true;
            bullet.visible = true;
            this.timeToShoot = time + this.fireRate;
        }
    }

    takeDamage(){

        this.hitSound.play();
        
        let i = 0;
        let repetition = 100
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
