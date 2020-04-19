import Eye from "./Eye.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class EnemiesGroup extends Phaser.Physics.Arcade.Group {
    
    constructor(world,scene) {
        super(world,scene);

        let child1 = new Eye(scene,457,165,8);    
        let child2 = new Eye(scene,1059,53,10);
        let child3 = new Eye(scene,1515,37,20);
        let child4 = new Eye(scene,2348,405,40);
        let child5 = new Eye(scene,2856,453,10);
        let child6 = new Eye(scene,3550,453,10);

        this.add(child1,true);
        this.add(child2);
        this.add(child3);
        this.add(child4);
        this.add(child5);
        this.add(child6);

        
        console.log(child1);
        console.log(this);
    }
}