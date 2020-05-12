import config from './config.js';
import Forest from '/js/scene/maps/forest/Forest.js';
import Castle from './scene/maps/castle/Castle.js';
import bootGame from './scene/BootGame.js';

class Game extends Phaser.Game{
    constructor(){
        super(config);

        // Descomentar para abrir o mapa correspondente!
        //this.scene.add('BootGame', bootGame);
        //this.scene.start('BootGame');
        
        //Mapa Forest 
        this.scene.add('Forest',Forest);
        this.scene.start('Forest');

        //Mapa Castle
        //this.scene.add('Castle',Castle);
        //this.scene.start('Castle');

    }
}
new Game();