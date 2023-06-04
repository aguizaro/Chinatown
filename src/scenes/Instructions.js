class Instructions extends Phaser.Scene{
    constructor(){
        super({key: 'instructionsScene'})
    }

    create(){
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 220, 'good_neighbors', "Instructions", 60).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 140, 'good_neighbors', "You are playing the role of private investigator,", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 90, 'good_neighbors', "Jake Gittes. You have been hired to investigate", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 -40,  'good_neighbors', "Hollis Mulwray, chief engineer of the Water and Energy", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 - 210, game.config.height/2 + 10, 'good_neighbors', "department.", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 + 55, game.config.height/2 + 10, 'good_neighbors', "Find Hollis without being seen.", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 80, 'good_neighbors', "[UP] and [DOWN] arrow keys accelerate and decceletate.", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 130, 'good_neighbors', "[LEFT] and [RIGHT] arrow keys turn the vehicle.", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, 'good_neighbors', "Press [SPACE] to start.", 30).setOrigin(0.5).setTint(0xffffff)
        this.cameras.main.setBackgroundColor(0x82b0fa)

        this.cursors= this.input.keyboard.createCursorKeys()
    }

    update(){
        if (this.cursors.space.isDown){
            this.scene.start('playScene')
        }
    }
}