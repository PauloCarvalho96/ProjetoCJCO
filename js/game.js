import config from './config.js';
import Forest from '/js/scene/maps/forest/Forest.js';
import Castle from './scene/maps/castle/Castle.js';
import Test from './scene/maps/Test.js';

class Game extends Phaser.Game{
    constructor(){
        super(config);

        // Descomentar para abrir o mapa correspondente!

        //Mapa Forest 
        //this.scene.add('Forest',Forest);
        //this.scene.start('Forest');

        this.scene.add('Test',Test);
        this.scene.start('Test');

        //Mapa Castle
        //this.scene.add('Castle',Castle);
        //this.scene.start('Castle');

    }
}
new Game();