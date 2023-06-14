class Credits extends Phaser.Scene{
    constructor(){
        super({key: 'creditsScene'})
    }

    create(){
        //background color
        this.cameras.main.setBackgroundColor(0x82b0fa)
        //subheading
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 220, 'good_neighbors', "Credits", 70).setOrigin(0.5).setTint(0xff0000)
        //Description
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 80, 'good_neighbors', "Sound Design, Art, Writing, and Coode by:", 40).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'good_neighbors', "Antonio Guizar Orozco", 70).setOrigin(0.5).setTint(0xff0000)
        //controls
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 160, 'good_neighbors', "Press [SHIFT] for title menu", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, 'good_neighbors', "Press [SPACE] to start game", 30).setOrigin(0.5).setTint(0xff0000)

        //input
        this.cursors= this.input.keyboard.createCursorKeys()

    }

    update(){
        if(this.cursors.space.isDown){
            this.scene.start('instructionsScene', {level: 1, bgm: this.bgm})
        }else if (this.cursors.shift.isDown){
            this.bgm.stop()
            this.scene.start('titleScene')
        }
    }

    init(data){
        this.bgm= data;
    }

}