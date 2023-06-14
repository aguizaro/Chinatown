class ScoreDisplay extends Phaser.Scene{
    constructor(scene){
        super('scoreDisplayScene')
        this.parentScene= scene
    }

    create(){
        this.cameras.main.setBackgroundColor(0x82b0fa)
        if (this.level == 1){
            this.add.bitmapText(game.config.width/2, game.config.height/2 -200, 'good_neighbors', "Level 1 Complete ", 88).setOrigin(0.5).setTint(0xff0000)
            //display photos taken
            let str= Phaser.Utils.String.Format('   %1', [this.photos])
            this.add.bitmapText(game.config.width/2 + 170, game.config.height/2 -50, 'good_neighbors', str, 40).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2 - 70, game.config.height/2 -50, 'good_neighbors', 'pictures taken: .  .  .  .  .  .', 40).setOrigin(0.5).setTint(0xffffff)
            //display score
            str= Phaser.Utils.String.Format('   %1', [this.score])
            this.add.bitmapText(game.config.width/2 + 170, game.config.height/2, 'good_neighbors', str, 40).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2 - 70, game.config.height/2, 'good_neighbors', 'total score: .  .  .  .  .  .  .  .', 40).setOrigin(0.5).setTint(0xffffff)
            //prompt user to continue
            this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, 'good_neighbors', "Press [SPACE] to start next level.", 30).setOrigin(0.5).setTint(0xffffff)
        }else if (this.level == 2){
            this.add.bitmapText(game.config.width/2, game.config.height/2 -200, 'good_neighbors', "Level 2 Complete ", 88).setOrigin(0.5).setTint(0xff0000)
            //display photos taken
            let str= Phaser.Utils.String.Format('%1 / 5', [5])
            this.add.bitmapText(game.config.width/2 + 170, game.config.height/2 -50, 'good_neighbors', str, 40).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2 - 70, game.config.height/2 -50, 'good_neighbors', 'evidence found: .  .  .  .  .   ', 40).setOrigin(0.5).setTint(0xffffff)
            //display score
            str= Phaser.Utils.String.Format('%1 / 8', [this.lifePoints])
            this.add.bitmapText(game.config.width/2 + 170, game.config.height/2, 'good_neighbors', str, 40).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2 - 70, game.config.height/2, 'good_neighbors', 'life points: .  .  .  .  .  .', 40).setOrigin(0.5).setTint(0xffffff)
            //prompt user to continue
            this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, 'good_neighbors', "Press [SPACE] to start next level.", 30).setOrigin(0.5).setTint(0xffffff)
        }else{
            this.add.bitmapText(game.config.width/2, game.config.height/2 -200, 'good_neighbors', "Level 3 Complete ", 88).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2, game.config.height/2 -40, 'good_neighbors', "You stopped Noah from getting away.", 40).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2, game.config.height/2, 'good_neighbors', "Congratulations! Thanks for playing.", 40).setOrigin(0.5).setTint(0xffffff)
            //controls
            this.add.bitmapText(game.config.width/2, game.config.height/2 + 160, 'good_neighbors', "Press [SHIFT] to play again", 30).setOrigin(0.5).setTint(0xffffff)
            this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, 'good_neighbors', "Press [SPACE] for credits", 30).setOrigin(0.5).setTint(0xff0000)
        }

        //input
        this.cursors= this.input.keyboard.createCursorKeys();
        //UI SFX
        this.UIsfx= this.sound.add('click')
        this.promptSFX= this.sound.add('prompt')
        this.promptSFX.play()
    }

    update(){
        if (this.cursors.space.isDown){
            this.UIsfx.play()
            this.bgm.stop()
            if (this.level == 1){
                this.level= 2
                this.scene.start('instructionsScene', this)
            }
            else if (this.level == 2){
                this.level= 3
                this.scene.start('instructionsScene', this)
            }
            else{
                this.scene.start('creditsScene', this.bgm)
            }   
        }
        if ((this.level == 3) && (this.cursors.shift.isDown)){
            this.bgm.stop()
            this.scene.start('titleScene') //start game over again
        }
    }

    //collect data passed to this scene from parent scene
    init(data){
        this.score= Math.floor(data.points)
        this.photos= data.numPhotos
        this.bgm= data.bgm
        this.level= data.level
        this.lifePoints= data.lifePoints
    }
}