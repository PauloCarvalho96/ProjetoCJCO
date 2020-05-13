
import FireSkull from "./FireSkull.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class FireSkullGroup extends Phaser.Physics.Arcade.Group {
    constructor(world, scene,offset) {
        super(world, scene);

        let child1 = new FireSkull(scene,400,400,100);      
 
        this.add(child1);
         
        this.setVelocityX(100);
    }

}