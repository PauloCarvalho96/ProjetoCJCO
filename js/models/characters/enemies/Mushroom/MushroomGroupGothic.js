
import Mushroom from "./Mushroom.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class MushroomGroupGothic extends Phaser.Physics.Arcade.Group {
    constructor(world, scene) {
        super(world, scene);

        let child1 = new Mushroom(scene,400,400,300);      
 
        this.add(child1);
         
    }

}