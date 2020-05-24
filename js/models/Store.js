export default class Store extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y,texture,frame) {
        super(scene, x, y,texture,frame);

        scene.add.existing(this); 
        //this.setVisible(false);
        this.scene.anims.create({
            key: 'potions', 
            frames: this.scene.anims.generateFrameNumbers('potions', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1,
        });
        this.scene.load.image("heart","assets/heart.png");

        this.coins = [20,20,20];
        this.hp_label = scene.add.text(550, scene.map.heightInPixels-105, 'health:', {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.price_hp = scene.add.text(642, scene.map.heightInPixels-105, 'x'+this.coins[0], {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.hp_label1 = scene.add.text(700, scene.map.heightInPixels-105, 'press(1)', {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.velocity = scene.add.text(540, scene.map.heightInPixels-75, 'velocity:', {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.price_hp1 = scene.add.text(642, scene.map.heightInPixels-75, 'x'+this.coins[1], {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.velocity1 = scene.add.text(699, scene.map.heightInPixels-75, 'press(2)', {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.power = scene.add.text(550, scene.map.heightInPixels-50, 'power:', {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.price_hp2 = scene.add.text(642, scene.map.heightInPixels-50, 'x'+this.coins[2], {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.power1 = scene.add.text(699, scene.map.heightInPixels-50, 'press(3)', {fontSize:'15px', fill:'#ffffff'}).setVisible(false).setScrollFactor(0);
        this.scene.add.image(100,300,"heart");
    }

    potions_text(boolean){
        if(boolean == true){
            this.hp_label.setVisible(true);
            this.hp_label1.setVisible(true);
            this.velocity.setVisible(true);
            this.velocity1.setVisible(true);
            this.power.setVisible(true);
            this.power1.setVisible(true);
            this.price_hp.setVisible(true);
            this.price_hp1.setVisible(true);
            this.price_hp2.setVisible(true);
        }else{
            this.hp_label.setVisible(false);
            this.hp_label1.setVisible(false);
            this.velocity.setVisible(false);
            this.velocity1.setVisible(false);
            this.power.setVisible(false);
            this.power1.setVisible(false);
            this.price_hp.setVisible(false);
            this.price_hp1.setVisible(false);
            this.price_hp2.setVisible(false);
        }
    }
}