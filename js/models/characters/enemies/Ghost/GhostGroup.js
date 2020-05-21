import Ghost from "./Ghost.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class EnemiesGroup extends Phaser.Physics.Arcade.Group {
    
    constructor(world,scene) {
        super(world,scene);

        let child1 = new Ghost(scene,445,270,12);    
        let child2 = new Ghost(scene,665,95,60);
        let child3 = new Ghost(scene,1587,160,30);
        let child4 = new Ghost(scene,2011,350,40);
        let child5 = new Ghost(scene,3906,485,50);


        this.add(child1,true);
        this.add(child2);
        this.add(child3);
        this.add(child4);
        this.add(child5);

        
        
        console.log(child1);
        console.log(this);
    }
}