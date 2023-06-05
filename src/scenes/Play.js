class Play extends Phaser.Scene{
    constructor(){
        super({key: "playScene"})
        this.VEL= 100
        this.targetActive= false
        this.targetStopped= false;
        this.caught= false
        this.tookPhoto= false
        this.numPhotos= 0;
        this.points= 0;
        this.level1_done= false;
        this.waitTime= 6000
        //this.lost= false
    }

    create(){
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
        this.player= this.physics.add.sprite(1021, 298, 'player', 0).setOrigin(0.5).setScale(0.5)
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setCircle(this.player.width/1.7)
        this.player.body.offset.y=20

        //create follower and add temporary target to be destroyed when the follower starts
        this.targetFollower= this.add.follower()
        this.targetFollower.setPosition(-100, -100) //out of minimap bounds
        this.tempTarget= this.add.image(776, 880, 'target').setOrigin(0.5).setScale(0.5)
        this.tempTarget.flipX= true;

        //Headquarters Icon on MiniMap
        this.HQ= this.add.bitmapText(1043, 360, 'good_neighbors', 'HQ', 100 ).setOrigin(0.5).setTint(0xffffff)
        //Minimap Icons for player(Jake Gittes) and target(Hollis Mulwray)
        this.playerIcon= this.add.bitmapText(1021, 298, 'good_neighbors', 'o', 100 ).setOrigin(0.5).setTint(0xff0000)
        this.targetIcon= this.add.bitmapText(776, 880, 'good_neighbors', 'o', 100 ).setOrigin(0.5).setTint(0xffffff)

        //enable collision
        this.roadLayer.setCollisionByProperty({collides: true})
        this.vehicleBuildingLayer.setCollisionByProperty({collides: true})
        this.treeInfraLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, this.roadLayer, ()=>{
            if (!this.crash2SFX.isPlaying)this.crash2SFX.play()
        })
        this.physics.add.collider(this.player, this.vehicleBuildingLayer, ()=>{
            if (!this.crash2SFX.isPlaying)this.crash2SFX.play()
        })
        this.physics.add.collider(this.player, this.treeInfraLayer, ()=>{
            if (!this.crash2SFX.isPlaying)this.crash2SFX.play()
        })
        

        //camera movment
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.cameras.main.ignore([this.HQ, this.playerIcon, this.targetIcon])
        this.cameras.main.setZoom(1)
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        //Instructions prompt
        this.instructions= this.add.bitmapText(game.config.width/2 + 50, 20 , 'good_neighbors', 'Find Hollis. Report says he drives a black vehicle.', 18).setOrigin(0.5).setTint(0xffffff).setScrollFactor(0,0).setDepth(100)
        this.instructions_bg= this.add.rectangle(this.instructions.x, this.instructions.y, this.instructions.width + 5, this.instructions.height + 5, 0x000000, 0.75).setScrollFactor(0,0).setDepth(99)
        //Minimap
        this.minimap= this.cameras.add(0, 0, this.map.widthInPixels/6, this.map.heightInPixels/12, false, 'minimap').setZoom(0.14).setRoundPixels(true).setScroll(0,0)
        this.minimap.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.minimap.startFollow(this.player, true, 0.25,  0.25)
        this.minimap.ignore([this.treeInfraLayer, this.vehicleBuildingLayer, this.roadLayer, this.rockLayer, this.flowerLayer, this.tempTarget, this.instructions, this.instructions_bg, this.player, this.targetFollower])
        //create mask for minimap
        const maskShape = this.make.graphics();
        maskShape.fillCircle(90,0, this.minimap.width/1.3)
        const shape= maskShape.createGeometryMask()
        this.minimap.setMask(shape)

        //display warning if player lost previously
        if(this.lost == true)
            console.log('LOST PREVIOUSLY')

        //input
        this.cursors= this.input.keyboard.createCursorKeys();
        //define key
        space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        //update steering/ player movment
        this.updateCar_withSteering(this.player)
        //update minimap
        this.updateMiniMap();
        //check distance and start target movement if close enough
        if (!this.targetActive) 
            if(this.checkDistance(this.player, this.tempTarget, 100)){
                this.instructions.setText('Follow Hollis. Do not get caught.')
                this.UIprompt.play()
                //this.instructions_bg.setX(this.instructions.x)
                //this.instructions_bg.setW(this.instructions.width- 50)
                this.startTargetPath1()
            }

        //if target is not currently moving, allow player to take photo
        if (this.targetStopped){
            if (Phaser.Input.Keyboard.JustDown(space_key)){
                this.takePhoto()
            }
        }
        //if player completes level1, finish level when they arrive at Headquartes
        if (this.level1_done)
            if (this.player.x > 973 && this.player.x < 1110)
                if (this.player.y > 276 && this.player.y < 375){
                    this.finish_level1()
                    this.level1_done= false;
                }

        //console.log(this.calcDistance(this.player, this.targetFollower))
    }

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

    startTargetPath1(){
        //destroy temp target 
        this.tempTarget.destroy()
        //add target's path
        this.targetPath= this.add.path(776, 880) //parking spot
        this.targetPath.lineTo(560, 880) 
        this.targetPath.lineTo(567, 1025)
        this.targetPath.lineTo(292, 1025) //bot left corner intersection
        this.targetPath.lineTo(292, 250)  //top left
        this.targetPath.lineTo(837, 250)  //top right
        this.targetPath.lineTo(837, 626)  //bot right
        this.targetPath.lineTo(292, 626)  //bot left
        this.targetPath.lineTo(292, 250)  //top left
        this.targetPath.lineTo(864, 250)  //top right
        this.targetPath.lineTo(864, 92) 
        this.targetPath.lineTo(1196, 92)
        this.targetPath.lineTo(1196, 201) //exit neightborhood
        this.targetPath.lineTo(1167, 330) //get in lane
        this.targetPath.lineTo(1167, 850) //reservoir entrance
        this.targetPath.lineTo(1026, 850) 
        this.targetPath.lineTo(1026, 821) //park in spit
        
        //add path follower
        let s= this.targetPath.getStartPoint();
        this.targetFollower= this.add.follower(this.targetPath, s.x, s.y, 'target').setScale(0.5). setOrigin(0.5)
        this.targetFollower.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: 50000,
            hold: 0,
            repeat: 0,
            yoyo: false,
            rotateToPath: true,
            
        });
        //change instruction text after target is parked
        this.time.addEvent({
            delay: 50000,
            callback: ()=>{
                this.instructions.setText('Press [SPACE] to take a photograph.')
                this.UIprompt.play()
                this.targetStopped= true
                //wait then continue moving target again
                this.time.addEvent({
                    delay: this.waitTime,
                    callback: ()=>{
                        this.instructions.setText('Follow Hollis. Do not get caught.')
                        this.UIprompt.play()
                        //start target path 2
                        this.targetStopped= false
                        this.startTargetPath2()
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
            this.caught= true;
        })
        //set active since target started movment
        this.targetActive= true;
    }

    startTargetPath2(){
        //make new target path
        this.targetPath.destroy()
        this.targetPath= this.add.path(1026, 821) //parking spot
        this.targetPath.lineTo(1026, 850)
        this.targetPath.lineTo(1174, 850)
        this.targetPath.lineTo(1174, 850)
        this.targetPath.lineTo(1174, 750) 
        this.targetPath.lineTo(1213, 612) //get in lane
        this.targetPath.lineTo(1213, 74)
        this.targetPath.lineTo(512, 74)   //exit neighborhood
        this.targetPath.lineTo(512, 213)
        this.targetPath.lineTo(234, 213)  //top left intersection
        this.targetPath.lineTo(234, 1069) //bottom left 
        this.targetPath.lineTo(615, 1069)
        this.targetPath.lineTo(615, 1188) //parking spot

        //replace existing path with new one and start follow again
        this.targetFollower.setPath(this.targetPath)
        this.targetFollower.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: 40000,
            hold: 0,
            repeat: 0,
            yoyo: false,
            rotateToPath: true,
            
        });
        this.time.addEvent({
            delay: 40000,
            callback: ()=>{
                this.instructions.setText('Press [SPACE] to take a photograph.')
                this.UIprompt.play()
                this.targetStopped= true
                //wait then continue moving target again
                this.time.addEvent({
                    delay: this.waitTime,
                    callback: ()=>{
                        this.instructions.setText('Follow Hollis. Do not get caught.')
                        this.UIprompt.play()
                        //start target path 3
                        this.targetStopped= false
                        this.startTargetPath3()
                    }
                })
            }
        })
    }
    startTargetPath3(){
        //make new target path
        this.targetPath.destroy()
        this.targetPath= this.add.path(615, 1188) //parking spot
        this.targetPath.lineTo(615, 1069)
        this.targetPath.lineTo(817, 1069) //farm driveway
        this.targetPath.lineTo(817, 1690)
        this.targetPath.lineTo(677, 1690) //farm parking spot

        //replace existing path with new one and start follow again
        this.targetFollower.setPath(this.targetPath)
        this.targetFollower.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: 10000,
            hold: 0,
            repeat: 0,
            yoyo: false,
            rotateToPath: true,
            
        });
        this.time.addEvent({
            delay: 10000,
            callback: ()=>{
                this.instructions.setText('Press [SPACE] to take a photograph.')
                this.UIprompt.play()
                this.targetStopped= true
                //wait then continue moving target again
                this.time.addEvent({
                    delay: this.waitTime,
                    callback: ()=>{
                        this.instructions.setText('Go back to Headquarters')
                        this.UIprompt.play()
                        //finish this level
                        this.targetStopped= false
                        this.level1_done= true;
                    }
                })
            }
        })
    }

    //if distance between object A and object B is less than value, return true, false otherwise
    checkDistance(A, B, value){
        return ( this.calcDistance(A, B) < value)
    }
    
    //calculates the distance between two objects A and B
    calcDistance(A,B){
        return Math.sqrt((Math.abs(A.x -B.x)*Math.abs(A.x -B.x)) + (Math.abs(A.y -B.y)*Math.abs(A.y -B.y)))
    }

    //takes photograph
    takePhoto(){
        this.cameras.main.flash(500, 255, 255, 255)
        this.numPhotos++ //count photos taken
        this.points+= 10000/this.calcDistance(this.player, this.targetFollower) //more points the closer you are to the target when taking photo
        this.cameraSFX.play()
    }

    //finish level 1 and launch score display
    finish_level1(){
        this.scene.sleep()
        this.scene.launch('scoreDisplayScene', {score: this.points, photos: this.numPhotos})
    }

    //steering for player vehicle
    updateCar_withSteering(car){
        if (this.cursors.up.isDown){
            if (this.cursors.left.isDown){
                car.rotation -= 0.045
            }else if(this.cursors.right.isDown){
                car.rotation += 0.045
            }
            car.setVelocity(Math.sin(car.rotation ) * this.VEL, -Math.cos(car.rotation ) * this.VEL)
        }else if(this.cursors.down.isDown){
            if (this.cursors.left.isDown){
                car.rotation += 0.045
            }else if(this.cursors.right.isDown){
                car.rotation -= 0.045
            }
            car.setVelocity(-Math.sin(car.rotation ) * this.VEL, Math.cos(car.rotation ) * this.VEL)
        }else{
            car.setVelocity(0)
        }
    }
    
    //handles car collision
    carCollision(){
        this.lost= true
        this.cameras.main.shake()
        this.points= 0;
        if (!this.crash1SFX.isPlaying) this.crash1SFX.play()

    }


    updateCar(car, direction){
        direction= new Phaser.Math.Vector2(0);
        if (this.cursors.left.isDown){
            car.setOrigin(0.4, 0.57)
            car.body.offset.x= 0;
            car.angle= 180
            car.flipY= true;
            direction.x= -1
        }else if(this.cursors.right.isDown){
            car.setOrigin(0.5)
            car.body.offset.x= 10
            car.angle= 0;
            car.flipY= false;
            direction.x=1
        }
        if (this.cursors.up.isDown){
            car.setOrigin(0.4, 0.7)
            car.body.offset.x= 0;
            car.flipY= true
            car.angle= -90
            direction.y= -1
        }else if(this.cursors.down.isDown){
            car.setOrigin(0.4, 0.4)
            car.body.offset.x= 0;
            car.flipY= true
            car.angle= 90
            direction.y=1
        }
        direction.normalize();
        car.setVelocity(this.VEL * direction.x, this.VEL * direction.y)
    }
    
    //recive data from parent scene (could be this scene)
    init(data){
        this.bgm= data
    }
}