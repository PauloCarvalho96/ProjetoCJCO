
export default class Intro extends Phaser.Scene {
  
    constructor() {
      super("Intro");
    }

    preload(){
        this.load.image('princess_help',"assets/characters/main/princess/princess_help.png");
        this.load.image('bck',"assets/characters/main/princess/white.jpg");
        this.load.audio('scream',"assets/characters/main/princess/screaming.mp3");
    }

    create(){
        this.bck = this.add.image(0, 0, 'bck');
        this.bck.setDisplayOrigin(0,0).setDisplaySize(800,600);
        this.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.text(this.game.config.height/2-50,(this.game.config.width/2)+120 , 'Press Enter to Continue...', {fontSize:'20px', fill:'#000000'});
        this.princess = this.add.image(this.game.config.width/2+40, this.game.config.height/2 -50, 'princess_help');
        this.princess.setScale(0.8);

        this.sound.play('scream', {
            volume:0.5,
        });
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.Enter)) {
            this.sound.stopAll();
            this.scene.stop();
            this.scene.start('Gothic-Horror');
        }
    }

}