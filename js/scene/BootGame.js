
export default class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload() {
        /// carrega imagens para o menu
        this.load.image("back", "./assets/menu/back.png");
        this.load.image("title", "./assets/menu/ArcherLetters.png");
        this.load.image("play", "./assets/menu/play.png");
        this.load.image("controls", "./assets/menu/controls.png");

        this.load.audio('menu_song','assets/menu/menu_song.wav');

    }

    create(){   
        this.add.image(0,0,"back").setOrigin(0).setDepth(0);

        this.sound.play('menu_song', {
            volume:0.5,
            loop: true
          });
        //setDepth -> valor 1 vai sempre estar acima do valor 0 , valor 2 vai sempre estar em cima do valor 1;
        //setOrigin -> defina o ponto de origem
        this.add.image(this.game.renderer.width / 2 ,this.game.renderer.height * 0.20,"title").setDepth(1);
        let playButton = this.add.image(this.game.renderer.width / 2 ,300,"play").setDepth(1).setScale(0.35,0.35);
        let controlbtn = this.add.image(this.game.renderer.width / 2 ,400 ,"controls").setDepth(1).setScale(0.5,0.5);
        

        controlbtn.setInteractive();

        controlbtn.on("pointerover",()=>{
            controlbtn.setTint(0xbfbfbf);
            controlbtn.on('pointerdown', function(){
                this.sound.stopAll();
                this.scene.start('Controls');
            },this);
        })

        controlbtn.on("pointerout",()=>{
            controlbtn.clearTint();
        })

        playButton.setInteractive();

        playButton.on("pointerover",()=>{
            playButton.setTint(0xbfbfbf);
            playButton.on('pointerdown', function(){
                this.sound.stopAll();
                this.scene.stop();
                this.scene.start('Intro');
            },this);
        })

        playButton.on("pointerout",()=>{
            playButton.clearTint();
        })
   
        
    }
}