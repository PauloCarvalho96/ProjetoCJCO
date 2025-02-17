import config from './config.js';
import Forest from './scene/maps/forest/Forest.js';
import Castle from './scene/maps/castle/Castle.js';
import Ghotic from './scene/maps/ghotic-horror/Gothic.js'
import GameOver from './scene/gameover/GameOver.js';
import Winning from './scene/winning/Winning.js';
import Intro from './scene/Intro/Intro.js';
import Controls from './scene/Controls.js';
import bootGame from './scene/BootGame.js';
import Paused from './scene/pause/Pause.js';

class Game extends Phaser.Game{
    constructor(){
        super(config);

        this.scene.add('Paused',Paused);
        this.scene.add('BootGame', bootGame);  
        this.scene.add('Controls',Controls);  
        this.scene.add('Intro',Intro);
        this.scene.add('Gothic-Horror',Ghotic);
        this.scene.add('Forest',Forest);
        this.scene.add('Castle',Castle);
        this.scene.add('GameOver',GameOver);
        this.scene.add('Winning',Winning);

        this.scene.start('BootGame');

    }
}
new Game();