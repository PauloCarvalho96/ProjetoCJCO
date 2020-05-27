import DemonBullet from "./DemonBullet.js";
import Skeleton from "../Skeleton/skeleton.js";
import Fireball from "../FireBall/Fireball.js";

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

        this.demonHP = 3500;
        this.demonDamage = 5;
        this.bulletsOnShoot = 5;
        this.fireRate = 6000;
        this.enemiesToSpawn = 3;
        this.spawnRate = 10000;
        this.timeToSpawn = 0;
        this.timeToShoot = 0;
        this.bulletsMaxsize = 10;

        this.demonfireball = this.scene.physics.add.group({
            classType: Fireball,
            maxSize: this.bulletsMaxsize,
        });
       
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

        this.shoot(space,time);

        this.spawn(time);
    }

   // para definir para que lado virar 
   side(space,time){
        if(space > 0){
            this.setVelocityX(-50);
            this.flipX = false;
        }

        if(space < 0) {
            this.setVelocityX(50);
            this.flipX = true;
        }

        this.on("animationcomplete", ()=>{
            this.play('walk',true);
        });
    }

    // para disparar
    shoot(space,time){
        if(this.timeToShoot < time){
            for(let i=0;i<this.bulletsOnShoot;i++){
                let px = Math.floor(Math.random() * (4700 - 4050 + 1) + 4050);
                let fireBall = this.demonfireball.getFirstDead(true, px, 20);
                if(fireBall){
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
                    fireBall.setVelocity(0,0);
                    fireBall.active = true;
                    fireBall.visible = true;
                    this.timeToShoot = time + this.fireRate;
                }
            }  
        }

    }

    
    spawn(time){
        if(this.timeToSpawn < time){
            for(let i=0;i<this.enemiesToSpawn;i++){
                let px = Math.floor(Math.random() * (4700 - 4050 + 1) + 4050);
                let monster = this.demonMonsters.getFirstDead(true,px,550);
                if(monster){
                    this.secondShoot();
                    monster.setVelocity(-monster.velocity,0);
                    monster.flipX = true;
                    monster.active = true;
                    monster.visible = true;
                    this.timeToSpawn = time + this.spawnRate;
                }
            }  
        }
    }

    // 2 ataque
    secondShoot(){
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