import Bullet from "../Bullet/Bullet.js";
import Goblin from "../Goblin/Goblin.js";

export default class Wizard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);

        this.setSize(60, 90);
        this.setOffset(90,50);
        this.flipX = true;
        this.wizardHP = 500;
        this.wizardDamage= 10;
        this.bulletsMaxsize = 10;
        this.wizardBullets = this.scene.physics.add.group({
            classType: Bullet,
            maxSize: this.bulletsMaxsize,
            allowGravity: false,
        });

        this.monstersMaxsize = 10;
        this.wizardMonsters = this.scene.physics.add.group({
            classType: Goblin,
            maxSize: this.monstersMaxsize,
        });

        // animations
        this.scene.anims.create({
            key: 'wizard_idle', 
            frames: this.scene.anims.generateFrameNumbers('wizard_idle', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'wizard_run', 
            frames: this.scene.anims.generateFrameNumbers('wizard_run', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1,
        });

        // disparar bala
        this.scene.anims.create({
            key: 'wizard_attack1', 
            frames: this.scene.anims.generateFrameNumbers('wizard_attack1', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: 0,
        });

        // spawn de inimigos
        this.scene.anims.create({
            key: 'wizard_attack2', 
            frames: this.scene.anims.generateFrameNumbers('wizard_attack2', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: 0,
        });

        this.play('wizard_run',true);
        this.setVelocityX(0);
    }

    update(){
        //check bullet pos
        this.checkBullets();
        //check wizard pos
        this.pos();
        //check monster pos
        this.checkMonsters();
    }

    pos(){
        if(this.x < 3850){
            this.setVelocityX(50);
            this.flipX = false;
        } else if(this.x > 4500){
            this.setVelocityX(-50);
            this.flipX = true;
        }
    }

    checkMonsters(){
        // itera os monstros do wizard
        this.wizardMonsters.children.iterate(function(monster) {
            if(monster.x < 3900){
                monster.setVelocityX(monster.velocity);
                monster.flipX = false;
            }
            if(monster.x > 4500){
                monster.setVelocityX(-monster.velocity);
                monster.flipX = true;
            }
        },this);
    }

    checkBullets(){
        // itera as balas do wizard
        this.wizardBullets.children.iterate(function (bullet) {
            if(bullet.x < 3900 || bullet.y < 100){
                this.wizardBullets.killAndHide(bullet);
                bullet.removeFromScreen();
            }
        },this);
    }

    shoot(){
        let bullet = this.wizardBullets.getFirstDead(true,this.x,this.y);
        if(bullet){
            //direção da bala (random)
            let vx = Math.floor(Math.random() * (800 - 100 + 1) - 100);
            let vy = Math.floor(Math.random() * (800 - 100 + 1) - 100);
            
            bullet.setVelocityX(-vx);
            bullet.setVelocityY(-vy);
            bullet.active = true;
            bullet.visible = true;
        }
    }

    spawn(){
        let px = Math.floor(Math.random() * (4500 - 4400 + 1) + 4400);

        let monster = this.wizardMonsters.getFirstDead(true,px,200);
        if(monster){
            monster.setVelocity(-100,0);
            monster.flipX = true;
            monster.wizardHP = 100;
            monster.active = true;
            monster.visible = true;
        }
    }

    removeFromScreen() {
        this.y = 700;
        this.setVelocity(0, 0);
    }

}