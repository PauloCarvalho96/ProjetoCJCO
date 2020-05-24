
export default class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload() {
        /// carrega imagens para o menu
        this.load.image("title", "./assets/menu/ArcherLetters.png");
        this.load.image("play", "./assets/menu/play.png");
        this.load.image("back", "./assets/menu/back.png");
        this.load.image("loadgame", "./assets/menu/loadgame.png");
        this.load.image("options", "./assets/menu/options.png");

        this.load.audio('menu_song','assets/menu/menu_song.wav');

    }

    create(){   
        this.sound.play('menu_song', {
            volume:0.5,
            loop: true
          });
        ///setDepth -> valor 1 vai sempre estar acima do valor 0 , valor 2 vai sempre estar em cima do valor 1;
        //setOrigin -> defina o ponto de origem
        this.add.image(this.game.renderer.width / 2 ,this.game.renderer.height * 0.20,"title").setDepth(1);
        let playButton = this.add.image(this.game.renderer.width / 2 ,300,"play").setDepth(1).setScale(0.35,0.35);
        let optionsButton = this.add.image(this.game.renderer.width / 2 ,500 ,"options").setDepth(1).setScale(0.5,0.5);
        let loadgameButton = this.add.image(this.game.renderer.width / 2 ,400 ,"loadgame").setDepth(1).setScale(0.5,0.5);
        
        this.add.image(0,0,"back").setOrigin(0).setDepth(0);

        // Aqui tornamos as imagens como interativas
        loadgameButton.setInteractive();
         // Quando o rato passa por cima da imagem , alteramos a cor
        loadgameButton.on("pointerover",()=>{
            //Alteramos a cor da imagem para cinzento
            loadgameButton.setTint(0xbfbfbf);
        })

        loadgameButton.on("pointerout",()=>{
            //Repomos a cor original
            loadgameButton.clearTint();

        })

        optionsButton.setInteractive();

        optionsButton.on("pointerover",()=>{
            optionsButton.setTint(0xbfbfbf);
            optionsButton.on('pointerdown', function(){
                this.sound.stopAll();
                this.scene.start('options');
            },this);
        })

        optionsButton.on("pointerout",()=>{
            optionsButton.clearTint();

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