
export default class Controls extends Phaser.Scene{
    constructor() {
        super("Controls");
      }

    preload() {
        this.load.image("back", "./assets/menu/back.png");
        this.load.image("back_btn", "./assets/menu/backbtn.png");
        this.load.image("arrows", "./assets/menu/arrows.png");
        this.load.image("qkey", "./assets/menu/Qkey.png");
        this.load.image("spacebar", "./assets/menu/spacebar.png");
    }

    create(){
        this.add.image(0,0,"back").setOrigin(0).setDepth(0);
        this.backbtn = this.add.image(100,100,"back_btn");
        this.backbtn.setScale(0.05);

        /** Buttons */
        this.backbtn.setInteractive();

        this.backbtn.on("pointerover",()=>{
            this.backbtn.setTint(0xbfbfbf);
            this.backbtn.on('pointerdown', function(){
                this.scene.start('BootGame');
            },this);
        })

        this.backbtn.on("pointerout",()=>{
            this.backbtn.clearTint();
        })

        this.arrows = this.add.image(200,350,"arrows");
        this.arrows.setScale(0.5);
        this.add.text(175,200 ,'Jump', {fontSize:'20px', fill:'#ffffff'});
        this.add.text(280,470 ,'Right', {fontSize:'20px', fill:'#ffffff'});
        this.add.text(70,470 ,'Left', {fontSize:'20px', fill:'#ffffff'});

        this.qkey = this.add.image(600,250,"qkey");
        this.add.text(510,320 ,'Open/Close Store', {fontSize:'20px', fill:'#ffffff'});
        
        this.spacebar = this.add.image(600,420,"spacebar");
        this.add.text(560,480 ,'Shoot', {fontSize:'20px', fill:'#ffffff'});
        
    }

}