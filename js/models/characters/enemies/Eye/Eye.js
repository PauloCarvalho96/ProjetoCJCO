import Bullet from "../Bullet/Bullet.js";
export default class Eye extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, offset) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 40);
        this.setOffset(66,56);

        this.eyeHP = 100;
        this.eyeDamage = 5;

        this.velocity = 10;
        this.position = this.x;
        this.offset = offset;

        this.timeToShoot = 0;
        this.fireRate = 1000;
        this.spaceToShoot = 400;
        this.bulletSpaceDestroy = 500;

        // pos de criaçao
        this.pos = this.x;

        this.bulletsMaxsize = 5;

        this.bullets = this.scene.physics.add.group({
           maxSize: this.bulletsMaxsize,
           allowGravity: false,
           classType: Bullet
        });

        // animations
        this.scene.anims.create({
            key: 'eye_fly', 
            frames: this.scene.anims.generateFrameNumbers('eye_fly', { start: 0, end: 3 }),
            frameRate: 1,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'eye_fire', 
            frames: this.scene.anims.generateFrameNumbers('eye_fire', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 1,
        });
        this.play('eye_fly',true);

        this.setVelocityX(this.velocity);
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }
    
    update(time,space){

        // verificar para que lado o inimigo vira
        this.side(space);

        // disparar
        this.shoot(time,space);
        
        // verificar pos da bala
        this.checkBulletpos();

        // para andar dentro dos limites
        if(this.x >= this.pos + this.offset){
            this.setVelocityX(-this.velocity);
            this.flipX = true;
        } else  if(this.x <= this.pos - this.offset){
            this.setVelocityX(this.velocity);
            this.flipX = false;
        }

    }

    // para disparar
    shoot(time,space){
        if(this.timeToShoot < time && space < this.spaceToShoot && space > -this.spaceToShoot){
            let bullet = this.bullets.getFirstDead(true, this.x, this.y);
            this.play('eye_fire',true);
            if(bullet){
                bullet.setVelocityX(this.bulletVelocity);
                bullet.active = true;
                bullet.visible = true;

                this.timeToShoot = time + this.fireRate;
            }
        }
    }

    checkBulletpos(){
        // verifica pos das balas
        this.bullets.children.iterate(function (bullet) {
            if(bullet.x > bullet.pos + this.bulletSpaceDestroy || bullet.x < bullet.pos - this.bulletSpaceDestroy){
                this.bullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
        },this);
    }

    // para definir para que lado virar e disparar
    side(space){
        if(space > 0){
            this.bulletVelocity = -350;
            this.flipX = true;
        }

        if(space < 0) {
            this.bulletVelocity = 350;
            this.flipX = false;
        }

        // se a distancia ao arqueiro for maior entao nao dispara
        if(space > this.spaceToShoot || space < -this.spaceToShoot){
            this.play('eye_fly',true);      
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