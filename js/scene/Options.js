export default class Options extends Phaser.Scene{
    constructor(){
        super({ key: "options" });
    }


    preload() {
        /// carrega imagens para o menu


        
        this.load.image("back", "./assets/back.png");
        

    }


    create(){

        this.add.image(0,0,"back").setOrigin(0).setDepth(0);
        


    }
}