
export default class GameOver extends Phaser.Scene {
  
    constructor() {
      super("GameOver");
    }

    preload(){
      this.load.spritesheet("gameover_anim", "assets/gameover/gameover.png", {
        frameWidth: 640,
        frameHeight: 360
      });

      this.load.audio('gameover_song','assets/gameover/gameover_song.mp3');

    }

    create(){

      this.anims.create({
        key: 'gameover_anim', 
        frames: this.anims.generateFrameNumbers('gameover_anim', { start: 0, end: 68 }),
        frameRate: 10,
        repeat: 0 
      }); 

      this.sound.play('gameover_song', {
        loop: true
      });
 
      this.gameover_anim = this.add.sprite(this.game.config.width / 2, (this.game.config.height / 2)-50, 'gameover_anim');
      this.add.text(this.game.config.height/2,(this.game.config.width/2)+100 , 'GAMEOVER', {fontSize:'20px', fill:'#ffffff'});
      this.add.text(this.game.config.height/2,(this.game.config.width/2)+120 , 'Press Enter to Continue...', {fontSize:'10px', fill:'#ffffff'});
      this.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update(){
      this.gameover_anim.anims.play('gameover_anim',true);
      if (Phaser.Input.Keyboard.JustDown(this.Enter)) {
        this.sound.stopAll();
        this.scene.stop();
        this.scene.start('Bootgame');
      }
    }

}