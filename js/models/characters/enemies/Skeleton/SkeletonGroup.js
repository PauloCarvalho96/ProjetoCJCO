import Skeleton from "./Skeleton.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class EnemiesGroup extends Phaser.Physics.Arcade.Group {
    
    constructor(world,scene) {
        super(world,scene);

        let child1 = new Skeleton(scene,440,277,8);    
        let child2 = new Skeleton(scene,665,101,60);
        let child3 = new Skeleton(scene,1587,165,20);
        let child4 = new Skeleton(scene,2011,357,40);
        let child5 = new Skeleton(scene,3906,501,50);


        this.add(child1,true);
        this.add(child2);
        this.add(child3);
        this.add(child4);
        this.add(child5);

        
        
        console.log(child1);
        console.log(this);
    }
}