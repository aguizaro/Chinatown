/* 
    Antonio Guizar Orozco
    Chinatown 1974

    Phaser components used:
    - Cameras
    - Physics systems
    - Bitmap Text
    - Tileset/Tilemap
    - Time Events
    - Random
    - Paths Follower
    
    Creative Tilt:
    - I think my world building went beyond what was expected for this project as well as the various game systems/mechanics I
      included work well with the game theme/feel:
        - Vehicle steering
        - Photography
        - Life points / score
        - Speed boost
*/


'use strict';

// define and configure main Phaser game object
let config = {
    type: Phaser.Canvas,
    render: {
        pixelArt: true
    },
    width: 720,
    height: 540,
    physics:{
        default: 'arcade',
        arcade: {
            debug: false,
            pixelArt: true
        }
    }, 
    zoom: 1.45,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [Load, Title, Credits, Instructions, Play1, ScoreDisplay, Play2, Play3]
}

const game= new Phaser.Game(config)
let space_key