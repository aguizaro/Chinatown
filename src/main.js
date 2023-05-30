// Antonio Guizar Orozco
// Tilemap Tutorial

'use strict';

// define and configure main Phaser game object
let config = {
    type: Phaser.Canvas,
    render: {
        pixelArt: true
    },
    width: 820,
    height: 540,
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            pixelArt: true
        }
    }, 
    zoom: 1.45,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [Load, Title, Play]
}

const game= new Phaser.Game(config)