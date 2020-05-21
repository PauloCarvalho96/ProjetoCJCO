import config from './config.js';
import Forest from '/js/scene/maps/forest/Forest.js';
import Castle from './scene/maps/castle/Castle.js';
import bootGame from './scene/BootGame.js';
import Ghotic from './scene/maps/ghotic-horror/Gothic.js'

class Game extends Phaser.Game{
    constructor(){
        super(config);

        // Descomentar para abrir o mapa correspondente!
        //this.scene.add('BootGame', bootGame);
        //this.scene.start('BootGame');
        
        //Mapa Forest 
        //this.scene.add('Forest',Forest);
        //this.scene.start('Forest');

        //Mapa Castle
        this.scene.add('Castle',Castle);
        this.scene.start('Castle');

        //Mapa Ghost-Horror
        //this.scene.add('Gothic-Horror',Ghotic);
        //this.scene.start('Gothic-Horror');

    }
}
new Game();