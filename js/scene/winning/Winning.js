
export default class Winning extends Phaser.Scene {
  
    constructor() {
      super("Winning");
    }

    preload(){
        this.load.spritesheet("archer", "assets/characters/main/archer/ArcherIdle.png", {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.image('princess',"assets/characters/main/princess/princess.png");
        this.load.image('winning_bck','assets/winning/winning_bck.png');

        this.load.audio('winning_sound','assets/winning/winning_sound.mp3');
    }

    create(){
        this.anims.create({
            key: 'archer', 
            frames: this.anims.generateFrameNumbers('archer', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: 0 
          }); 

        this.sound.play('winning_sound', {
            volume:0.5,
            loop: true
        });

        /** Data */
        this.bck = this.add.image(0, 0, 'winning_bck');
        this.bck.setDisplayOrigin(0,-100).setDisplaySize(800,400);
        this.anim = this.add.sprite(this.game.config.width/2-15,this.game.config.height/2+115, 'archer');
        this.princess = this.add.image(this.game.config.width/2+30, this.game.config.height/2+105, 'princess');
        this.princess.setScale(0.1);
        this.princess.flipX = true;

        this.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.text(50,(this.game.config.width/2)+100 , 'Congratulations! You save the princess!', {fontSize:'20px', fill:'#ffffff'});
        this.add.text(50,(this.game.config.width/2)+120 , 'Press Enter to Continue...', {fontSize:'10px', fill:'#ffffff'});
    }

    update(){
        this.anim.anims.play('archer',true);
        if (Phaser.Input.Keyboard.JustDown(this.Enter)) {
            this.sound.stopAll();
            this.scene.stop();
            this.scene.start('BootGame');
        }
    }

}