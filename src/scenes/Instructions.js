class Instructions extends Phaser.Scene{
    constructor(){
        super({key: 'instructionsScene'})
    }

    create(){
        //background color
        this.cameras.main.setBackgroundColor(0x82b0fa)
        if (this.level == 1){
            //subheading
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 240, 'good_neighbors', "Level 1", 60).setOrigin(0.5).setTint(0xff0000)
            //Description
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 190, 'good_neighbors', "You are playing the role of private investigator,", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 150, 'good_neighbors', "Jake Gittes. You have been hired to investigate", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2, game.config.height/2 -110,  'good_neighbors', "Hollis Mulwray, chief engineer of the Water and Energy", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2- 250, game.config.height/2 -70, 'good_neighbors', "department.", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2 + 60, game.config.height/2 -70, 'good_neighbors', "Find Hollis. If you collide with him, you lose.", 28).setOrigin(0.5).setTint(0xff0000)
            //display controls, highlight keys
            this.add.bitmapText(game.config.width/2 - 20, game.config.height/2 - 20 , 'good_neighbors', "Take photographs using               . The camera only has", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2 - 5 , game.config.height/2 - 20, 'good_neighbors', "[SPACE]", 28).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2 - 20, game.config.height/2 + 20 , 'good_neighbors', "      snapshots available.  ", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2 - 150, game.config.height/2 + 20 , 'good_neighbors', "50", 28).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2 , game.config.height/2 + 60, 'good_neighbors', "Photographs are worth more points the closer they are.", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2 , game.config.height/2 + 90, 'good_neighbors', "taken to Hollis.", 28).setOrigin(0.5).setTint(0xffffff)
        }else if (this.level == 2){
            //subheading
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 230, 'good_neighbors', "Level 2", 60).setOrigin(0.5).setTint(0xff0000)
            //Description
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 160, 'good_neighbors', "Hollis has been found dead in the freshwater reservoir !", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 120, 'good_neighbors', "You are now investigating hollis's death as a possible murder.", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 60, 'good_neighbors', "Most of the farm land in town has recently been sold, all except.", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2 , game.config.height/2 - 20 , 'good_neighbors', "the orange grove. This may be related to the death of Hollis.", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2 , game.config.height/2 + 50, 'good_neighbors', "Head down to the orange grove farm and investigate.",30).setOrigin(0.5).setTint(0xff0000)
        }else if (this.level == 3){
            //subheading
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 230, 'good_neighbors', "Level 3", 60).setOrigin(0.5).setTint(0xff0000)
            //Description
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 160, 'good_neighbors', "The farmers were shooting at you, thinking you worked for the", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 120, 'good_neighbors', "water department. The water department has been sabotaging", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2, game.config.height/2 - 80, 'good_neighbors', "the water supply in order to drive prices down and buy", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2 , game.config.height/2 - 40 , 'good_neighbors', "land cheaply. Hollis was murdered when he uncovered the plan.", 28).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2 , game.config.height/2 + 20, 'good_neighbors', "Hollis's business parter, Noah, is responsible.",30).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2 , game.config.height/2 + 60, 'good_neighbors', "Find Noah and stop him from getting away.",30).setOrigin(0.5).setTint(0xff0000)
        }

        //player controls
        this.add.bitmapText(game.config.width/2 - 40, game.config.height/2 + 130, 'good_neighbors', "/             arrow keys                   /", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 130, 'good_neighbors', "  [UP]    [DOWN]                    accelerate    deccelerate", 30).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(game.config.width/2 - 50, game.config.height/2 + 170, 'good_neighbors', "/              arrow keys                 / ", 30).setOrigin(0.5).setTint(0xffffff)
        this.add.bitmapText(game.config.width/2 - 35, game.config.height/2 + 170, 'good_neighbors', "  [LEFT]    [RIGHT]                    turn left    turn right", 30).setOrigin(0.5).setTint(0xff0000)
        //prompt user to start game
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 230, 'good_neighbors', "Press [SPACE] to start.", 30).setOrigin(0.5).setTint(0xffffff)
        //input
        this.cursors= this.input.keyboard.createCursorKeys()
        //UI SFX
        this.UIsfx= this.sound.add('click')
    }

    update(){
        //start next scene when space is pressed
        if (this.cursors.space.isDown){
            this.UIsfx.play()
            if (this.level == 1){
                this.scene.start('playScene1', {bgm: this.bgm, died: false})
            }else if (this.level == 2){
                this.scene.start('playScene2', {bgm: this.bgm, lost: false})
            }else{
                this.scene.start('playScene3', {bgm: this.bgm, lost: false})
            }
        }
    }

    //sets level instructions pertain to and bgm
    init(data){
        this.level= data.level
        this.bgm= data.bgm
        if (!this.bgm.isPlaying) this.bgm.play()
    }
}