import Bullet from "../Bullet/Bullet.js";

export default class Mushroom extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(30, 38);
        this.setOffset(60,60);

        this.bulletsMaxsize = 5;
        this.mushroomBullets = this.scene.physics.add.group({
            classType: Bullet,
            maxSize: this.bulletsMaxsize,
            allowGravity: false,
        });
        this.timeToShoot = 0;
        this.fireRate = 1500;
        this.spaceToShoot = 400;
        this.bulletSpaceDestroy = 500;

        // animations
        this.scene.anims.create({
            key: 'mushroom_idle', 
            frames: this.scene.anims.generateFrameNumbers('mushroom_idle', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'mushroom_fire', 
            frames: this.scene.anims.generateFrameNumbers('mushroom_fire', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1,
        });
        this.play('mushroom_idle',true);

        this.bulletVelocity = 0;

    }

    update(time,space){

        // verificar para que lado o inimigo vira
        this.side(space);

        // disparar
        this.shoot(time,space);
        
        // verificar pos da bala
        this.checkBulletpos();
          
    } 

    // para disparar
    shoot(time,space){
        if(this.timeToShoot < time && space < this.spaceToShoot && space > -this.spaceToShoot){
            let bullet = this.mushroomBullets.getFirstDead(true, this.x, this.y);
            if(bullet){
                this.play('mushroom_fire',true);
                bullet.setVelocityX(this.bulletVelocity);
                bullet.active = true;
                bullet.visible = true;
    
                this.timeToShoot = time + this.fireRate;
            }
        }
    }

    checkBulletpos(){
        // verifica pos das balas
        this.mushroomBullets.children.iterate(function (bullet) {
            if(bullet.x > bullet.pos + this.bulletSpaceDestroy || bullet.x < bullet.pos - this.bulletSpaceDestroy){
                this.mushroomBullets.killAndHide(bullet);
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
            this.play('mushroom_idle',true);         
        }
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }

}