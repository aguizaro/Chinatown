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
        this.load.tilemapTiledJSON('tilemapJSON', 'img/world_map.json')
        this.load.bitmapFont('good_neighbors', 'fonts/good_neighbors_starling.png', 'fonts/good_neighbors_starling.xml')
        // load sound
        //this.load.audio('groove', 'audio/groove.mp3');      
    }

    create() {
        // go to Title scene
        this.scene.start('titleScene');
    }
}