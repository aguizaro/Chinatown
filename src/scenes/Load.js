class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // load graphics assets
        this.load.path = "./assets/";
        this.load.image("player","img/car_red.png")
        this.load.image("target","img/car_black.png")
        this.load.image('tilesetImage', 'img/tileset.png')
        this.load.image('doc', 'img/document.png')
        this.load.image('bullet', 'img/bullet.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'img/world_map.json')
        this.load.bitmapFont('good_neighbors', 'fonts/good_neighbors_starling.png', 'fonts/good_neighbors_starling.xml')
        // load sound
        this.load.audio('bgMusic', 'audio/outcast.mp3')
        this.load.audio('click', 'audio/camera_click.wav')
        this.load.audio('prompt', 'audio/prompt.wav')
        this.load.audio('shutter', 'audio/shutter.wav')
        this.load.audio('crash1', 'audio/crash1.wav')
        this.load.audio('crash2', 'audio/crash2.wav')
        this.load.audio('fire1', 'audio/fire1.wav')
        this.load.audio('fire2', 'audio/fire2.wav')      
    }

    create() {
        // go to Title scene
        this.scene.start('titleScene');
    }
}