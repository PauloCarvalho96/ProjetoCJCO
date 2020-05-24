import Forest from '/js/scene/maps/forest/Forest.js';
export default class CharSelect extends Phaser.Scene{
    constructor(){
        super({ key: "charselect" });
    }

    preload() {
        /// carrega imagens para o menu


        this.scene.add('Forest',Forest);
        this.load.image("back", "./assets/back.png");
        this.load.image("charselect","./assets/charselect.png");
        this.load.image("ArcherLetters","./assets/characters/main/archer/ArcherLetters.png");
        //CARREGAR TODAS AS ANIMAÇOES DO ARQUEIRO

    this.load.spritesheet('ArcherDash', './assets/characters/main/archer/ArcherDash.png',
        { frameWidth: 128, frameHeight: 128 }
    );

 

    }


    create(){
        
        this.add.image(0,0,"back").setOrigin(0).setDepth(0);
        this.add.image(this.game.renderer.width / 2 ,this.game.renderer.height * 0.20,"charselect").setDepth(1).setScale(0.8,0.8);
        let archerLetter =  this.add.image(this.game.renderer.width /4 ,this.game.renderer.height * 0.40,"ArcherLetters").setDepth(1).setScale(0.4,0.4);
        let knightLetter = this.add.image(580 ,this.game.renderer.height * 0.40,"KnightLetters").setDepth(1).setScale(0.4,0.4);
     
    

    this.anims.create({
        key: 'ADash',
        frames: this.anims.generateFrameNumbers('ArcherDash'),
        frameRate: 10,
        repeat: -1
    });
    
    

    this.anims.create({
        key: 'KAttack',
        frames: this.anims.generateFrameNumbers('KnightAttack'),
        frameRate: 10,
        repeat: -1
    });
     
        
        let archer = this.add.sprite(200  ,400,"ArcherDash").setDepth(1).setScale(4,4);
        archer.play("ADash");
        let knight = this.add.sprite(600  ,400,"KnightAttack").setDepth(1).setScale(4,4);
        knight.play("KAttack");
    
        archerLetter.setInteractive();
        archerLetter.on("pointerover",()=>{
            archerLetter.setTint(0xbfbfbf);
            archerLetter.on('pointerdown', function(){
                this.scene.start('Forest',{char: 0});
            },this);
        })

        archerLetter.on("pointerout",()=>{
            archerLetter.clearTint();
        })
        
        knightLetter.setInteractive();
        knightLetter.on("pointerover",()=>{
            knightLetter.setTint(0xbfbfbf);
            knightLetter.on('pointerdown', function(){
                this.scene.start('Forest',{char: 1});
            },this);
        })

        knightLetter.on("pointerout",()=>{
            knightLetter.clearTint();
        })
    

    }
 
     

}