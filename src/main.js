// Antonio Guizar Orozco
// Chinatown 1974

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
    scene: [Load, Title, Instructions, ScoreDisplay, Play]
}

const game= new Phaser.Game(config)
let space_key