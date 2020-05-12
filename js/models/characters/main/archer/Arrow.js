export default class Arrow extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,x,y){
     super(scene,x,y,"arrow");
       
       this.scene.add.existing(this);
       this.baseVelocity = 350;
       this.scene.physics.world.enable(this);
   } 

fire(enemy) {
   const dx = enemy.x-this.x;
   const dy = enemy.y-this.y;
   const alpha = Math.atan2(dy,dx);

   const vx = this.baseVelocity * Math.cos(alpha);
   const vy = this.baseVelocity * Math.sin(alpha);

   this.setVelocityX(vx);
   this.setVelocityY(vy);
   this.active = true;
   this.visible = true;
   
}
isOutsideCanvas(){
   const width = this.scene.game.config.width;
           const height = this.scene.game.config.height;
           return this.x > width || this.y > height || this.x < 0 || this.y < 0;
       }

}