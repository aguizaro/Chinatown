class ScoreDisplay extends Phaser.Scene{
    constructor(scene){
        super('scoreDisplayScene')
        this.parentScene= scene
    }

    create(){
        this.cameras.main.setBackgroundColor(0x82b0fa)
        //subhead
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
            this.add.bitmapText(game.config.width/2 - 70, game.config.height/2 -50, 'good_neighbors', 'evidence found: .  .  .  .  .  .', 40).setOrigin(0.5).setTint(0xffffff)
            //display score
            str= Phaser.Utils.String.Format('%1 / 7', [this.lifePoints])
            this.add.bitmapText(game.config.width/2 + 170, game.config.height/2, 'good_neighbors', str, 40).setOrigin(0.5).setTint(0xff0000)
            this.add.bitmapText(game.config.width/2 - 70, game.config.height/2, 'good_neighbors', 'life points: .  .  .  .  .  .', 40).setOrigin(0.5).setTint(0xffffff)
            //prompt user to continue
            this.add.bitmapText(game.config.width/2, game.config.height/2 + 200, 'good_neighbors', "Press [SPACE] to start next level.", 30).setOrigin(0.5).setTint(0xffffff)
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
            if (this.level == 1)
                this.scene.start('instructionsScene', 2)
            else if (this.level == 2)
                this.scene.start('instructionsScene', 3)
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