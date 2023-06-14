class Play3 extends Phaser.Scene{
    constructor(){
        super({key: "playScene3"})
        this.VEL= 100
        this.level= 3
    }

    create(){
        //game vars
        this.targetActive= false
        this.level3_done= false
        //tilemap game world
        this.map= this.add.tilemap('tilemapJSON')
        this.tileset= this.map.addTilesetImage('tileset', 'tilesetImage')
        //create SFX
        this.UIprompt= this.sound.add('prompt')
        this.cameraSFX= this.sound.add('shutter')
        this.crash1SFX= this.sound.add('crash1')
        this.crash2SFX= this.sound.add('crash2')

        //add game map layers
        this.bgLayer= this.map.createLayer('Background', this.tileset, 0, 0)
        this.roadLayer= this.map.createLayer('Roads', this.tileset, 0, 0)
        this.vehicleBuildingLayer= this.map.createLayer('Vehicles/Buildings', this.tileset, 0, 0).setDepth(10)
        this.treeInfraLayer= this.map.createLayer('Trees/Infra', this.tileset, 0, 0).setDepth(10)
        this.rockLayer= this.map.createLayer('Rocks', this.tileset, 0, 0)
        this.flowerLayer= this.map.createLayer('Flowers', this.tileset, 0, 0)

        //adds player
        this.player= this.physics.add.sprite(1021, 298, 'player', 0).setOrigin(0.5).setScale(0.5).setImmovable(true)
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setCircle(this.player.width/1.7)
        this.player.body.offset.y=20

        //if player previously lost, display text that dissapears
        this.tempText= this.add.bitmapText(this.player.x, this.player.y, 'good_neighbors', 'TRY AGAIN', 100 ).setOrigin(0.5).setTint(0xffffff).setAlpha(0).setDepth(200)
        if (this.lost){
            this.tempText.setAlpha(0.8)
            this.time.addEvent({
                delay: 2000,
                callback: ()=>{
                    this.tempText.alpha= 0
                }
            })
        }

        //create follower and add temporary target to be destroyed when the follower starts
        this.targetFollower= this.add.follower()
        this.targetFollower.setPosition(-100, -100) //out of minimap bounds
        this.tempTarget= this.add.image(137,223, 'target').setOrigin(0.5).setScale(0.5)
        this.tempTarget.flipX= true;

        //Icons on MiniMap
        this.HQ= this.add.bitmapText(1043, 360, 'good_neighbors', 'HQ', 100 ).setOrigin(0.5).setTint(0xffffff)
        this.playerIcon= this.add.bitmapText(1021, 298, 'good_neighbors', 'o', 100 ).setOrigin(0.5).setTint(0xff0000)
        this.farmIcon= this.add.bitmapText(650, 1610, 'good_neighbors', 'FARM', 100 ).setOrigin(0.5).setTint(0xffffff)
        this.targetIcon= this.add.bitmapText(776, 880, 'good_neighbors', 'o', 100 ).setOrigin(0.5).setTint(0xffffff)

        //enable collision
        this.roadLayer.setCollisionByProperty({collides: true})
        this.vehicleBuildingLayer.setCollisionByProperty({collides: true})
        this.treeInfraLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, this.roadLayer, ()=>{
            if (!this.crash2SFX.isPlaying) this.crash2SFX.play()
        })
        this.physics.add.collider(this.player, this.vehicleBuildingLayer, ()=>{
            if (!this.crash2SFX.isPlaying) this.crash2SFX.play()
        })
        this.physics.add.collider(this.player, this.treeInfraLayer, ()=>{
            if (!this.crash2SFX.isPlaying) this.crash2SFX.play()
        })
    
        //camera movment
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.cameras.main.ignore([this.HQ, this.playerIcon, this.farmIcon, this.targetIcon])
        this.cameras.main.setZoom(1)
        //world bounds
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)
       
        //Instructions prompt
        this.instructions= this.add.bitmapText(game.config.width/2 + 40, 20 , 'good_neighbors', 'Look for Noah.  Hold [SPACE] for a speed boost.', 18).setOrigin(0.5).setTint(0xffffff).setScrollFactor(0,0).setDepth(100)
        this.instructions_bg= this.add.rectangle(this.instructions.x, this.instructions.y, this.instructions.width + 20, this.instructions.height + 5, 0x000000, 0.75).setScrollFactor(0,0).setDepth(99)
        
        //Minimap
        this.minimap= this.cameras.add(0, 0, this.map.widthInPixels/6, this.map.heightInPixels/10, false, 'minimap').setZoom(0.16).setRoundPixels(true).setScroll(0,0)
        this.minimap.setBounds(-100, 0, this.map.widthInPixels + 240, this.map.heightInPixels + 500)
        this.minimap.startFollow(this.player, true, 0.25,  0.25)
        this.minimap.ignore([this.treeInfraLayer, this.vehicleBuildingLayer, this.roadLayer, this.rockLayer, this.flowerLayer, this.instructions, this.instructions_bg, this.player, this.targetFollower, this.tempText, this.tempTarget, this.targetFollower])
      
        //create mask for minimap
        const maskShape = this.make.graphics();
        maskShape.fillCircle(93,93, this.minimap.width/2.3)
        const shape= maskShape.createGeometryMask()
        this.minimap.setMask(shape)

        //input
        this.cursors= this.input.keyboard.createCursorKeys();
    }

    update(){
        this.updateCar_withSteering(this.player)//update steering/ player movment
        this.updateMiniMap()//update minimap  

        //check distance and start target movement if close enough during level1
        if( (!this.targetActive) && !this.level3_done){
            if(this.checkDistance(this.player, this.tempTarget, 200)){
                this.instructions.setText('There he is. Stop him.  Hold [SPACE] for a speed boost')
                this.instructions_bg.setDisplaySize(this.instructions.width + 20, this.instructions.height + 5)
                this.UIprompt.play()
                this.startTargetPath()
            }
        }

        //Speed Boost if space is held
        if (this.cursors.space.isDown) this.VEL= 300
        else this.VEL= 100

        //console.log(this.player.x, this.player.y);
    }

    //reduce alpha of minimap if player drives over it and update minimap icons
    updateMiniMap(){
        if (this.player.x < 230 && this.player.y < 200){
            this.minimap.setAlpha(0.2)
        }else{
            this.minimap.setAlpha(1)
        }
        //update position of minimap icons
         this.playerIcon.setPosition(this.player.x, this.player.y)
         this.targetIcon.setPosition(this.targetFollower.x, this.targetFollower.y)
         this.minimap.ignore(this.targetFollower)
    }

    //if distance between object A and object B is less than value, return true, false otherwise
    checkDistance(A, B, value){
        return ( this.calcDistance(A, B) < value)
    }
    
    //calculates the distance between two objects A and B
    calcDistance(A,B){
        return Math.sqrt((Math.abs(A.x -B.x)*Math.abs(A.x -B.x)) + (Math.abs(A.y -B.y)*Math.abs(A.y -B.y)))
    }

     //target will travel around the game map and end up at the reservoir then wait for a few secs and start path 2
     startTargetPath(){
        //destroy temp target 
        this.tempTarget.destroy()
        //add target's path
        this.targetPath= this.add.path(137,223) //top left corner
        this.targetPath.lineTo(61, 223)
        this.targetPath.lineTo(62, 928)  //drive down left neightborhood
        this.targetPath.lineTo(292, 928) //exit neighborhood
        this.targetPath.lineTo(190, 1444)
        this.targetPath.lineTo(250, 1644) 
        this.targetPath.lineTo(292, 1888) 
        this.targetPath.lineTo(100, this.map.heightInPixels + 400) //drive down
        
        //add path follower
        let s= this.targetPath.getStartPoint();
        this.targetFollower= this.add.follower(this.targetPath, s.x, s.y, 'target').setScale(0.5). setOrigin(0.5)
        this.targetFollower.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: 11000,
            hold: 0,
            repeat: 0,
            yoyo: false,
            rotateToPath: true,
            
        });
        //this will run if the player does not stop the tatget in time
        this.time.addEvent({
            delay: 9400,
            callback: ()=>{
                this.minimap.ignore(this.targetIcon)
                this.instructions.setText('Noah got away. You have failed.')
                this.instructions_bg.setDisplaySize(this.instructions.width + 20, this.instructions.height + 5)
                this.UIprompt.play()
                this.targetStopped= true
                //wait then continue moving target again
                this.time.addEvent({
                    delay: 3000,
                    callback: ()=>{
                        this.bgm.stop()
                        this.UIprompt.play()
                        this.lost= true
                        this.scene.start('playScene3', {bgm: this.bgm, lost: this.lost})
                    }
                })
            }
        })
        //add physics body to target
        this.physics.add.existing(this.targetFollower)
        this.targetFollower.body.setCircle(this.targetFollower.height/1.7)
        this.targetFollower.body.offset.x= 20
        //enable collision
        this.physics.add.collider(this.targetFollower, this.roadLayer)
        this.physics.add.collider(this.targetFollower, this.vehicleBuildingLayer)
        this.physics.add.collider(this.targetFollower, this.treeInfraLayer)
        this.physics.add.collider(this.player, this.targetFollower, ()=>{
            this.carCollision()
        })
        //set active since target started movment
        this.targetActive= true;
    }

    //steering for player vehicle
    updateCar_withSteering(car){
        if (this.cursors.up.isDown){
            if (this.cursors.left.isDown){
                car.rotation -= 0.06
            }else if(this.cursors.right.isDown){
                car.rotation += 0.06
            }
            car.setVelocity(Math.sin(car.rotation ) * this.VEL, -Math.cos(car.rotation ) * this.VEL)
        }else if(this.cursors.down.isDown){
            if (this.cursors.left.isDown){
                car.rotation += 0.06
            }else if(this.cursors.right.isDown){
                car.rotation -= 0.06
            }
            car.setVelocity(-Math.sin(car.rotation ) * this.VEL, Math.cos(car.rotation ) * this.VEL)
        }else{
            car.setVelocity(0)
        }
    }

    //handles car collision
    carCollision(){
        this.cameras.main.shake()
        this.targetFollower.stop()
        if (!this.crash1SFX.isPlaying) this.crash1SFX.play()
        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.UIprompt.play()
                this.scene.start('scoreDisplayScene', this)
            }
        })
    }

    //recive data from parent scene
    init(data){
        this.bgm= data.bgm;
        this.lost= data.lost
        if (!this.bgm.isPlaying) this.bgm.play()
    }
    
}