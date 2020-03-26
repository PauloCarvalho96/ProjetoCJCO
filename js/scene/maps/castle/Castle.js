import Archer from "../../../models/characters/main/archer/Archer.js";
import Knight from "../../../models/characters/main/knight/Knight.js";

export default class Castle extends Phaser.Scene {
  
  constructor() {
    super("Castle");
  }

  preload() {
    // Mapa
    this.load.image("back1", "assets/maps/castle/tiles/background1.png");
    this.load.image("back2", "assets/maps/castle/tiles/background2.png");
    this.load.image("back3", "assets/maps/castle/tiles/background3_A.png");
    this.load.image("back3_b", "assets/maps/castle/tiles/background3_B.png");
    this.load.image("back4", "assets/maps/castle/tiles/background4.png");
    this.load.image("back5", "assets/maps/castle/tiles/background5.png");
    this.load.image("tiles", "assets/maps/castle/tiles/main_lev_build.png");

    this.load.tilemapTiledJSON("map", "assets/maps/castle/map2_v3.json");

    // spritesheet (Archer)
    this.load.spritesheet("archer", "assets/characters/main/archer/ArcherIdle.png", {
      frameWidth: 128,
      frameHeight: 128
    });

    this.load.spritesheet("archer_run", "assets/characters/main/archer/ArcherRun.png", {
      frameWidth: 128,
      frameHeight: 128
    });

    }

    create() {
      this.map = this.make.tilemap({ key: "map" }); // crio o mapa 

      // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
      // Phaser's cache (i.e. the name you used in preload)
      const back1 = this.map.addTilesetImage("01 background", "back1");
      const back2 = this.map.addTilesetImage("02 background", "back2");
      const back3 = this.map.addTilesetImage("03 background A", "back3");
      const back3_b = this.map.addTilesetImage("03 background B", "back3_b");
      const back4 = this.map.addTilesetImage("04 background", "back4");
      const back5 = this.map.addTilesetImage("05 background", "back5");
      const tileset = this.map.addTilesetImage("main_lev_build", "tiles");

      //const tileset1 = this.map.addTilesetImage("mario-tiles", "tiles1");

      // Parameters: layer name (or index) from Tiled, tileset, x, y
      this.map.createStaticLayer("background1", back1, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background2", back2, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background3_a", back3, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background3_b", back3_b, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background4", back4, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      this.map.createStaticLayer("background5", back5, 0, 0); // tem que ter o mesmo nome do cenas do tiler 
      const front = this.map.createStaticLayer("piso", tileset, 0, 0);
    
      this.archer = new Archer(this, 50, 360);

      //get the scene camera
      const camera = this.cameras.main;
      //make camera follow mario
      camera.startFollow(this.archer); // para a camara seguir sempre o boneco
      //camera is not allowed to go out bounds
      camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

      this.cursors = this.input.keyboard.createCursorKeys();

      //set tiles from front tilemap that have collides property true as collidable
      front.setCollisionByProperty({ "colides": true }, true);
      //set collision between collidable tiles from front and mario
      this.physics.add.collider(this.archer, front);

      //set the callback function killMario to be called when something collides with the tile 124 (axe)     
      //this.map.setTileIndexCallback(124, this.killArcher, this); // todos os elementos da label front tem de colidir com as cenas
      //set collidion between mario and the tilemap kill
      //this.physics.add.overlap(this.archer, kill);

  }

    update() {
      this.archer.update(this.cursors);
    }
    killArcher() {
      this.scene.restart();
    }
}
