
import Mushroom from "./Mushroom.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class MushroomGroupGothic extends Phaser.Physics.Arcade.Group {
    constructor(world, scene) {
        super(world, scene);

        let child1 = new Mushroom(scene,700,400); 
        let child2 = new Mushroom(scene,1600,100);  
        let child3 = new Mushroom(scene,2350,400);   
        let child4 = new Mushroom(scene,2680,400);      
        let child5 = new Mushroom(scene,2900,100);  
        let child6 = new Mushroom(scene,3650,300);    
        let child7 = new Mushroom(scene,4120,200);         
        let child8 = new Mushroom(scene,4500,300);   

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