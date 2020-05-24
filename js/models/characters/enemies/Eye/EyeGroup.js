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
        let child7 = new Eye(scene,648,101,20);
        let child8 = new Eye(scene,1589,165,20);
        let child9 = new Eye(scene,3940,500,20);
        let child10 = new Eye(scene,1047,165,20);

        this.add(child1,true);
        this.add(child2);
        this.add(child3);
        this.add(child4);
        this.add(child5);
        this.add(child6);
        this.add(child7);
        this.add(child8);
        this.add(child9);
        this.add(child10);

        this.setVelocityX(10);

    }
}