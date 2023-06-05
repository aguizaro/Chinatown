class Instructions extends Phaser.Scene{
    constructor(){
        super({key: 'instructionsScene'})
    }

    create(){
        this.cameras.main.setBackgroundColor(0x82b0fa)
        //subheading
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 240, 'good_neighbors', "Instructions", 60).setOrigin(0.5).setTint(0xff0000)
        //Description
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 180, 'good_neighbors', "You are playing the role of private investigator,", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 140, 'good_neighbors', "Jake Gittes. You have been hired to investigate", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 -100,  'good_neighbors', "Hollis Mulwray, chief engineer of the Water and Energy", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 - 210, game.config.height/2 -60, 'good_neighbors', "department.", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 + 55, game.config.height/2 -60, 'good_neighbors', "Find Hollis without being seen.", 30).setOrigin(0.5).setTint(0xff0000)
        //display controls, highlight keys
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 10, 'good_neighbors', "Take photographs using               when stationary.", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 + 40, game.config.height/2 + 10, 'good_neighbors', "[SPACE]", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2 , game.config.height/2 + 50, 'good_neighbors', "Photographs are worth more the closer you get to Hollis.", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 - 40, game.config.height/2 + 120, 'good_neighbors', "/             arrow keys                   /", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 120, 'good_neighbors', "  [UP]    [DOWN]                    accelerate    deccelerate", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2 - 50, game.config.height/2 + 160, 'good_neighbors', "/              arrow keys                 / ", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 - 35, game.config.height/2 + 160, 'good_neighbors', "  [LEFT]    [RIGHT]                    turn left    turn right", 30).setOrigin(0.5).setTint(0xff0000)
        //prompt user to start game
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 220, 'good_neighbors', "Press [SPACE] to start.", 30).setOrigin(0.5).setTint(0xffffff)
        //input
        this.cursors= this.input.keyboard.createCursorKeys()

        this.bgm = this.sound.add('bgMusic', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play()
        //UI SFX
        this.UIsfx= this.sound.add('click')
    }

    update(){
        if (this.cursors.space.isDown){
            this.UIsfx.play()
            this.scene.start('playScene', this.bgm)
        }
    }
}