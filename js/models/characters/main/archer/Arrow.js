// import Archer from "./Archer";

// export default class Arrow extends Phaser.Physics.Arcade.Sprite {

//     constructor(scene) {
//         super(scene, 0, 0, "arrow");
//       }

//          create() {
 
//             // Create the group using the group factory
//             arrow = game.add.group();
//             // To move the sprites later on, we have to enable the body
//             arrow.enableBody = true;
//             // We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
//             arrow.physicsBodyType = Phaser.Physics.ARCADE;
//             /*
         
//                 This will create 20 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
//                 We only have 20 laser bullets available, and will 'clean' and reset they're off the screen.
//                 This way we save on precious resources by not constantly adding & removing new sprites to the stage
         
//             */
//            arrow.createMultiple(20, 'arrow');
         
//             /*
         
//                 Behind the scenes, this will call the following function on all lasers:
//                     - events.onOutOfBounds.add(resetLaser)
//                 Every sprite has an 'events' property, where you can add callbacks to specific events.
//                 Instead of looping over every sprite in the group manually, this function will do it for us.
         
//             */
//            arrow.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
//             // Same as above, set the anchor of every sprite to 0.5, 1.0
//             arrow.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
         
//             // This will set 'checkWorldBounds' to true on all sprites in the group
//             arrow.setAll('checkWorldBounds', true);
         
//             // ...
         
//         }
         
//          resetLaser(laser) {
//             // Destroy the laser
//             arrow.kill();
//         }



//         fireLaser() {
//             // Get the first laser that's inactive, by passing 'false' as a parameter
//             var arrow = arrow.getFirstExists(false);
//             if (arrow) {
//                 // If we have a laser, set it to the starting position
//                 arrow.reset(Archer.x, Archer.y - 20);
//                 // Give it a velocity of -500 so it starts shooting
//                 arrow.body.velocity.y = -500;
//             }
// }

// }

