import './phaser.js';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
};