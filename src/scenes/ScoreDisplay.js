class ScoreDisplay extends Phaser.Scene{
    constructor(scene){
        super('scoreDisplayScene')
        this.parentScene= scene
    }

    create(){
        this.cameras.main.setBackgroundColor(0x82b0fa)
        //subhead
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
            this.scene.start('playScene', {bgm: this.bgm, level: 2})
        }
    }
    //collect data passed to this scene from parent scene
    init(data){
        console.log(data)
        this.score= Math.floor(data.score)
        this.photos= data.photos
        }
}