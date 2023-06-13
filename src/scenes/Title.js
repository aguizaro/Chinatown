class Title extends Phaser.Scene{
    constructor(){
        super({key: "titleScene"})
    }

    create(){
        //tile
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'good_neighbors', "Chinatown 1974", 88).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, 'good_neighbors', "Press [SPACE] to continue", 30).setOrigin(0.5).setTint(0xff0000)
        this.cameras.main.setBackgroundColor(0x82b0fa) //background color
        //input
        this.cursors= this.input.keyboard.createCursorKeys()
        //UI SFX
        this.UIsfx= this.sound.add('click')
    }

    update(){
        if (this.cursors.space.isDown){
            this.UIsfx.play()
            this.scene.start('instructionsScene', 3)
        }
    }
}