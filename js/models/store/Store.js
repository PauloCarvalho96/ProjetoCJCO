export default class Store extends Phaser.Scene {
    constructor(x, y) {
        super("Store",x, y);

        //scene.add.existing(this); 
        //scene.physics.add.existing(this); 
        //scene.physics.world.enable(this);
        console.log("entrei boi ")
    }
     preload() {
        this.load.image("potion_hp","assets/potions/potions_gradient.png");
    }
    create ()
    {
        this.add.image("potion_hp");
        console.log("entrei cao ")
       // this.add.image(400, 300, 'star');
    } 
}