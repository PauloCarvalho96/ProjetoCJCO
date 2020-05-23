import DemonBullet from "./DemonBullet.js";
import Skeleton from "../Skeleton/skeleton.js";

export default class Demon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.body.setAllowGravity(false);
        this.setSize(60, 120);
        this.setOffset(40,30);
        this.flipX = true;

        this.timeToShoot = 5000;
        this.fireRate = 5000;
        this.demonHP = 500;
        this.demonDamage = 5;

        this.bulletsMaxsize = 2;
        this.DemonBullets = this.scene.physics.add.group({
            classType: DemonBullet,
            maxSize: this.bulletsMaxsize,
            allowGravity: false,
        });

        this.monstersMaxsize = 10;
        this.demonMonsters = this.scene.physics.add.group({
            classType: Skeleton,
            maxSize: this.monstersMaxsize,
        });

        this.hitboxes = this.scene.physics.add.group({
            maxSize: 9
        });

        // animations
        this.scene.anims.create({
            key: 'walk', 
            frames: this.scene.anims.generateFrameNumbers('walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });
        // attack
        this.scene.anims.create({
            key: 'demon_attack', 
            frames: this.scene.anims.generateFrameNumbers('demon_attack', { start: 0, end: 10 }),
            frameRate: 15,
            repeat: 0,
        });

        // 2attack
        this.scene.anims.create({
            key: 'demon_2attack', 
            frames: this.scene.anims.generateFrameNumbers('demon_2attack', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: 0,
        });

        // idle
        this.scene.anims.create({
            key: 'demon_idle', 
            frames: this.scene.anims.generateFrameNumbers('demon_idle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        this.play('walk',true);
    }

    update(space,time){
        // verificar para que lado o inimigo vira
        this.side(space);
    }

   // para definir para que lado virar 
   side(space){
        if(space > 0){
            this.setVelocityX(-50);
            this.flipX = false;
        }

        if(space < 0) {
            this.setVelocityX(50);
            this.flipX = true;
        }

        // se a distancia ao arqueiro for maior entao nao dispara
        if(space > this.spaceToShoot || space < -this.spaceToShoot){
            this.play('walk',true);      
        }
    }

    // para disparar
    shoot(space){
        this.play('demon_attack',true);
        let bullet = this.DemonBullets.getFirstDead(true, this.x, this.y);
        if(space > 0 && bullet){ // lado esquerdo
            bullet.setVelocityX(-125);
            bullet.setVelocityY(125);
            bullet.active = true;
            bullet.visible = true;
        }

        if(space < 0 && bullet) { // lado direito
            bullet.setVelocity(125);
            bullet.active = true;
            bullet.visible = true;
        }
    }
    // 2 ataque
    secondShoot(space){
        this.play('demon_2attack',true);
        this.shootLeft();
        this.shootRight();
        this.shootDown();
    }

    shootLeft(){
        var hitbox = this.hitboxes.getFirstDead(true, 0, 0);
        if (hitbox) {
            hitbox.setActive(true);
            hitbox.setVisible(false);
            hitbox.body.enable = true;
            hitbox.setPosition(this.x - hitbox.frame.width*2 + 5, this.y); //left
        }
    }

    shootRight(){
        var hitbox = this.hitboxes.getFirstDead(true, 0, 0);
        if (hitbox) {
            hitbox.setActive(true);
            hitbox.setVisible(false);
            hitbox.body.enable = true;
            hitbox.setPosition(this.x + hitbox.frame.width*2 + 5, this.y); //right
        }
    }

    shootDown(){
        var hitbox = this.hitboxes.getFirstDead(true, 0, 0);
        if (hitbox) {
            hitbox.setActive(true);
            hitbox.setVisible(false);
            hitbox.body.enable = true;
            hitbox.setPosition(this.x, this.y + hitbox.frame.height + 5); //down
        }
    }

    removeHitFromScreen(hit){
        hit.x = 700;
        hit.setVelocity(0,0);
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }

    spawn(){
        let px = Math.floor(Math.random() * (4700 - 4050 + 1) + 4050);
        let monster = this.demonMonsters.getFirstDead(true,px,100);
        if(monster){
            monster.setVelocity(-60,0);
            monster.flipX = true;
            monster.active = true;
            monster.visible = true;
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