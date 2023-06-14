class Title extends Phaser.Scene{
    constructor(){
        super({key: "titleScene"})
        this.level= 1
    }

    create(){
        //tile
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'good_neighbors', "Chinatown 1974", 100).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 160, 'good_neighbors', "Press [SHIFT] for credits", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, 'good_neighbors', "Press [SPACE] to start game", 30).setOrigin(0.5).setTint(0xff0000)
        this.cameras.main.setBackgroundColor(0x82b0fa) //background color
        //input
        this.cursors= this.input.keyboard.createCursorKeys()

        //UI SFX
        this.UIsfx= this.sound.add('click')
        //create and start background music
        this.bgm = this.sound.add('bgMusic', { 
            mute: false,
            volume: 0.3,
            rate: 1,
            loop: true 
        });
    }

    update(){
        if (this.cursors.space.isDown){
            this.UIsfx.play()
            this.scene.start('instructionsScene', this)
        }else if (this.cursors.shift.isDown){
            this.UIsfx.play()
            this.bgm.play()
            this.scene.start('creditsScene', this.bgm)
        }
    }
}