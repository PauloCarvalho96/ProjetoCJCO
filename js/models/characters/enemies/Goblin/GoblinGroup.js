
import Goblin from "./Goblin.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class GoblinGroup extends Phaser.Physics.Arcade.Group {
    constructor(world, scene) {
        super(world, scene);

        /*
        let goblinInformation=[
            {x:1060,y:-100,offset:300},
        ]

        goblinInformation.forEach(information => {
            let goblin=new Goblin(information.x,information.y,information.offset);
            goblin.setActive(false);
            this.add(goblin);
        });*/

        let child1 = new Goblin(scene,100,400,300);       
        let child2 = new Goblin(scene,1060,-100,200);
        let child3 = new Goblin(scene,1790,-100,130);
        let child4 = new Goblin(scene,1770,-100,160);
        let child5 = new Goblin(scene,2356,-100,80);
        let child6 = new Goblin(scene,2660,-100,125);
        let child7 = new Goblin(scene,2690,-100,115);
        let child8 = new Goblin(scene,3445,-100,95);

        //child1.active = false;
        child1.setGravity(0);
        this.add(child1,true);
        //child2.active = false;
        this.add(child2);
        //child3.active = false;
        this.add(child3);
        //child4.active = false;
        this.add(child4);
      //  child5.active = false;
        this.add(child5);
    //    child6.active = false;
        this.add(child6);
  //      child7.active = false;
        this.add(child7);
//        child8.active = false;
        this.add(child8);

        console.log(child1);
        console.log(this);

    }
}