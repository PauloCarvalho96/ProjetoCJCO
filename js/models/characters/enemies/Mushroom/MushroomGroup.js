
import Mushroom from "./Mushroom.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class MushroomGroup extends Phaser.Physics.Arcade.Group {
    constructor(world, scene) {
        super(world, scene);

        let child1 = new Mushroom(scene,1060,400);      
        let child2 = new Mushroom(scene,1060,100);
        let child3 = new Mushroom(scene,1790,100);
        let child4 = new Mushroom(scene,1770,400);
        let child5 = new Mushroom(scene,2356,400);
        let child6 = new Mushroom(scene,2700,400);
        let child7 = new Mushroom(scene,2650,100);
        let child8 = new Mushroom(scene,3130,100);
 
        this.add(child1);
        this.add(child2);
        this.add(child3);
        this.add(child4);
        this.add(child5);
        this.add(child6);
        this.add(child7);
        this.add(child8);
         
    }

}