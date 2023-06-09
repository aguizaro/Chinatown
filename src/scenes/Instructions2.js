class Instructions2 extends Phaser.Scene{
    constructor(){
        super({key: 'instructionsScene2'})
    }

    create(){
        //background color
        this.cameras.main.setBackgroundColor(0x82b0fa)
        //subheading
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 245, 'good_neighbors', "Instructions", 60).setOrigin(0.5).setTint(0xff0000)
        //Description
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 190, 'good_neighbors', "You are playing the role of private investigator,", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 150, 'good_neighbors', "Jake Gittes. You have been hired to investigate", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 -110,  'good_neighbors', "Hollis Mulwray, chief engineer of the Water and Energy", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2- 250, game.config.height/2 -70, 'good_neighbors', "department.", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 + 80, game.config.height/2 -70, 'good_neighbors', "Find Hollis. If you collide with him, you lose.", 30).setOrigin(0.5).setTint(0xff0000)
        //display controls, highlight keys
        this.add.bitmapText(game.config.width/2 - 20, game.config.height/2 - 20 , 'good_neighbors', "Take photographs using               . The camera only has", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 , game.config.height/2 - 20, 'good_neighbors', "[SPACE]", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2 - 20, game.config.height/2 + 20 , 'good_neighbors', "      snapshots available.  ", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 - 150, game.config.height/2 + 20 , 'good_neighbors', "50", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2 , game.config.height/2 + 60, 'good_neighbors', "Photographs are worth more points the closer they are.", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 , game.config.height/2 + 90, 'good_neighbors', "taken to Hollis.", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 - 40, game.config.height/2 + 130, 'good_neighbors', "/             arrow keys                   /", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 130, 'good_neighbors', "  [UP]    [DOWN]                    accelerate    deccelerate", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2 - 50, game.config.height/2 + 170, 'good_neighbors', "/              arrow keys                 / ", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 - 35, game.config.height/2 + 170, 'good_neighbors', "  [LEFT]    [RIGHT]                    turn left    turn right", 30).setOrigin(0.5).setTint(0xff0000)
        //prompt user to start game
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 230, 'good_neighbors', "Press [SPACE] to start.", 30).setOrigin(0.5).setTint(0xffffff)
        //input
        this.cursors= this.input.keyboard.createCursorKeys()

        //create and start background music
        this.bgm = this.sound.add('bgMusic', { 
            mute: false,
            volume: 0.3,
            rate: 1,
            loop: true 
        });
        this.bgm.play()
        //UI SFX
        this.UIsfx= this.sound.add('click')
    }

    update(){
        //start next scene when space is pressed
        if (this.cursors.space.isDown){
            this.UIsfx.play()
            this.scene.start('playScene2', {bgm: this.bgm, died: false})
        }
    }

    init(data){
        this.bgm= data
    }
}