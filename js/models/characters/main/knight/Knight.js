
export default class Knight extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "knight");

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        scene.physics.world.enable(this);
       
      this.scene = scene;
      this.alive = true; // Variável para indicar se o Rambo está vivo
      this.lives = 3; // Vidas do Knight
      this.health = 100; // Vida do knight
      this.defense = 100; // defesa do personagem , afeta o dano sofrido pela personagem
      this.damage = 100; // variavel que influencia o dano dado pelo knight
      this.nextTick = 0; // Variável utilizada no disparo do Rambo para criar um "temporizador" sobre cada disparo
      this.direction = "right"; // Posição/Direção Inicial do Rambo
       

        this.setOffset(20,15);
        this.setSize(20,40);
        
        this.velocity = 100;

        // animations
        this.scene.anims.create({
            key: 'run', 
            frames: this.scene.anims.generateFrameNumbers('knight_run', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'steady', 
            frames: this.scene.anims.generateFrameNumbers('knight', { start: 0, end: 14 }),
            frameRate: 15,
            repeat: -1,
        });

    }

    update(cursors){

        this.setVelocityX(0);

        if (cursors.down.isDown) {
            // baixar

        } else if (cursors.up.isDown) {
            // saltar
            
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.velocity);
            this.play('run',true);
            this.flipX = false;
        } else if (cursors.left.isDown) {
            this.setVelocityX(-this.velocity);
            this.play('run',true);
            this.flipX = true;
        } else {
            this.play('steady',true);
        }
    }

}