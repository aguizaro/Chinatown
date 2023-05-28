class Title extends Phaser.Scene{
    constructor(){
        super({key: "titleScene"})
    }

    create(){
        this.add.text(game.config.width/2, game.config.height/2, "Chinatown 1974")
        //input
        this.cursors= this.input.keyboard.createCursorKeys()
    }

    update(){
        if (this.cursors.left.isDown){
            //this.direction.x= -1
            this.scene.start('playScene')
        }else if(this.cursors.right.isDown){
            //this.direction.x=1
            this.scene.start('playScene')
        }
        if (this.cursors.up.isDown){
            //this.direction.y= -1
        }else if(this.cursors.down.isDown){
            //this.direction.y=1
        }
    }
}