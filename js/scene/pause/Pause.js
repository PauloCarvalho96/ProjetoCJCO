
var map;

export default class Paused extends Phaser.Scene {
  
    constructor() {
      super("Paused");
    }

    init(data){
        map = data.map;
    }

    create(){
        this.P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.P)) {
            this.scene.resume(map);
            this.scene.stop();
        }
    }

}