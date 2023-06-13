class Play3 extends Phaser.Scene{
    constructor(){
        super({key: "playScene3"})
        this.VEL= 100
        this.level= 2
    }

    create(){
        //game vars
        this.caught= false
        this.points= 0;
        this.lockedMovment= false
        this.evidence_collected= 0
        this.lifePoints= 7

        //sfx
        this.fire1= this.sound.add('fire1')
        this.fire2= this.sound.add('fire2')
        this.load_rifle= this.sound.add('load_rifle')

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
        this.player= this.physics.add.sprite(572, 1187, 'player', 0).setOrigin(0.5).setScale(0.5).setImmovable(true)
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setCircle(this.player.width/1.7)
        this.player.body.offset.y=20



        //create evidence on the map to be collected by player
        this.evidence= this.physics.add.sprite(546, 1990, 'doc').setScale(0.3)
        this.evidenceIcon= this.physics.add.sprite(546, 1990, 'doc')
        //handle collision with evidence
        this.physics.add.collider(this.player, this.evidence, ()=>{
            this.collect_evidence()
            this.UIprompt.play()
        })


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

        //Icons on MiniMap
        this.HQ= this.add.bitmapText(1043, 360, 'good_neighbors', 'HQ', 100 ).setOrigin(0.5).setTint(0xffffff)
        this.playerIcon= this.add.bitmapText(1021, 298, 'good_neighbors', 'o', 100 ).setOrigin(0.5).setTint(0xff0000)
        this.farmIcon= this.add.bitmapText(650, 1610, 'good_neighbors', 'FARM', 100 ).setOrigin(0.5).setTint(0xffffff)

        //enable collision
        this.roadLayer.setCollisionByProperty({collides: true})
        this.vehicleBuildingLayer.setCollisionByProperty({collides: true})
        this.treeInfraLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, this.roadLayer, ()=>{
            if (!this.crash2SFX.isPlaying) this.worldObjCollision()
        })
        this.physics.add.collider(this.player, this.vehicleBuildingLayer, ()=>{
            if (!this.crash2SFX.isPlaying) this.worldObjCollision()
        })
        this.physics.add.collider(this.player, this.treeInfraLayer, ()=>{
            if (!this.crash2SFX.isPlaying) this.worldObjCollision()
        })
    
        //camera movment
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.cameras.main.ignore([this.HQ, this.playerIcon, this.farmIcon, this.evidenceIcon])
        this.cameras.main.setZoom(1)
        //world bounds
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)
       
        //Instructions prompt
        this.instructions= this.add.bitmapText(game.config.width/2 + 40, 20 , 'good_neighbors', 'Head down to the farm and investigate around the orange grove.', 18).setOrigin(0.5).setTint(0xffffff).setScrollFactor(0,0).setDepth(100)
        this.instructions_bg= this.add.rectangle(this.instructions.x, this.instructions.y, this.instructions.width + 20, this.instructions.height + 5, 0x000000, 0.75).setScrollFactor(0,0).setDepth(99)
     
        //Displays evidence and life points
        this.lifeText= this.add.bitmapText(game.config.width/2 + 310, 8   , 'good_neighbors', 'LIFE', 15).setOrigin(0.5).setTint(0xffffff).setScrollFactor(0,0).setDepth(100)
        this.lifeDisplay= this.add.bitmapText(game.config.width/2 + 310, this.lifeText.y + 22  , 'good_neighbors', "||||||||||||||", 18).setOrigin(0.5).setTint(0xff0000).setScrollFactor(0,0).setDepth(100)
        this.lifeDisplay_bg= this.add.rectangle(this.lifeDisplay.x,  this.lifeDisplay.y, this.lifeDisplay.width + 5, this.lifeDisplay.height + 5, 0x000000, 0.75).setScrollFactor(0,0).setDepth(99)
        this.str= Phaser.Utils.String.Format('%1 / %2', [this.evidence_collected, 5])
        this.evidenceText= this.add.bitmapText(game.config.width/2 + 310, 58   , 'good_neighbors', 'EVIDENCE', 15).setOrigin(0.5).setTint(0xffffff).setScrollFactor(0,0).setDepth(100)
        this.evidenceDisplay= this.add.bitmapText(game.config.width/2 + 310, this.evidenceText.y + 22  , 'good_neighbors', this.str, 18).setOrigin(0.5).setTint(0xffffff).setScrollFactor(0,0).setDepth(100)
        this.evidenceDisplay_bg= this.add.rectangle(this.evidenceDisplay.x,  this.evidenceDisplay.y, this.evidenceDisplay.width + 20, this.evidenceDisplay.height + 5, 0x000000, 0.75).setScrollFactor(0,0).setDepth(99)
 
        
     
        //Minimap
        this.minimap= this.cameras.add(0, 0, this.map.widthInPixels/6, this.map.heightInPixels/10, false, 'minimap').setZoom(0.16).setRoundPixels(true).setScroll(0,0)
        this.minimap.setBounds(0, 0, this.map.widthInPixels + 240, this.map.heightInPixels + 500)
        this.minimap.startFollow(this.player, true, 0.25,  0.25)
        this.minimap.ignore([this.treeInfraLayer, this.vehicleBuildingLayer, this.roadLayer, this.rockLayer, this.flowerLayer, this.instructions, this.instructions_bg, this.player, this.evidenceDisplay, this.evidenceText, this.evidenceDisplay_bg, this.tempText, this.evidence, this.lifeText, this.lifeDisplay, this.lifeDisplay_bg])
      
        //create mask for minimap
        const maskShape = this.make.graphics();
        maskShape.fillCircle(93,93, this.minimap.width/2.3)
        const shape= maskShape.createGeometryMask()
        this.minimap.setMask(shape) 

        //input
        this.cursors= this.input.keyboard.createCursorKeys();
        //define key
        space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        this.updateCar_withSteering(this.player)//update steering/ player movment
        this.updateMiniMap()//update minimap  
        this.updateUIDisplay()//update UI stats

        if (!this.lockedMovment && (this.player.y > 1390)){
            //change world bounds so player stays in farm area
            this.physics.world.bounds.setTo(0, 1356, this.map.widthInPixels, this.map.heightInPixels - 1356)
            this.instructions.setText("Find all pieces of evidence around the orange grove.")
            this.instructions_bg.setDisplaySize(this.instructions.width + 20, this.instructions.height + 5)
            this.UIprompt.play()
            this.lockedMovment= true;
        }

        if(this.lifePoints < 1){
            this.UIprompt.play()
            this.bgm.stop()
            this.lost= true;
            this.scene.start('playScene2', this)
        }

        //if player completes level 2, finish level when they arrive at Headquartes
        if (this.evidence_collected == 5){
            if (this.player.x > 973 && this.player.x < 1110){
                if (this.player.y > 276 && this.player.y < 375){
                    //finish level 2 and launch score display
                    this.scene.start('scoreDisplayScene', this)
                    this.level1_done= false;
                }
            }
        }

        //console.log(this.player.x, this.player.y);
    }

    //move evidence sprite around when collected and update score/evidence collected
    collect_evidence(){
        if(this.evidence_collected == 0){
            this.evidence.setPosition(820, 1737).setVelocity(0)
            this.evidenceIcon.setPosition(820, 1737)
            this.evidence_collected++
            this.instructions.setText('Farmers are shooting at you ! Collect evidence without being hit.')
            this.instructions_bg.setDisplaySize(this.instructions.width + 20, this.instructions.height + 5)
            this.startShooting()
        }
        else if(this.evidence_collected == 1){
            this.evidence.setPosition(77, 1600).setVelocity(0)
            this.evidenceIcon.setPosition(77, 1600)
            this.evidence_collected++
        }
        else if(this.evidence_collected == 2){
            this.evidence.setPosition(510, 1410).setVelocity(0)
            this.evidenceIcon.setPosition(510, 1410)
            this.evidence_collected++
        }
        else if(this.evidence_collected == 3){
            this.evidence.setPosition(137, 1937).setVelocity(0)
            this.evidenceIcon.setPosition(137, 1937)
            this.evidence_collected++
        }
        else{
            this.evidence.destroy()
            this.evidenceIcon.destroy()
            this.evidence_collected++
            this.instructions.setText('Head back to HQ.')
            this.instructions_bg.setDisplaySize(this.instructions.width + 20, this.instructions.height + 5)
            //set world bounds back to whole game world
            this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        }
    }

    startShooting(){
        this.bulletGroup= this.add.group()
        this.direction= new Phaser.Math.Vector2(0);
        //array of bullet positions + directions.    ex: [x, y, direction.x, direction.y]
        this.bullet_positions= [{x: 0, y: 2000, x_dir: 1, y_dir: 0, flipx: true, flipy: false, rotation: 0}, {x: 0, y: 1920, x_dir: 1, y_dir: 0, flipx: true, flipy: false, rotation: 0}, {x: 0, y: 1820, x_dir: 1, y_dir: 0, flipx: true, flipy: false, rotation: 0}, {x: 0, y: 1720, x_dir: 1, y_dir: 0, flipx: true, flipy: false, rotation: 0}, {x: 0, y: 1500, x_dir: 1, y_dir: 0, flipx: true, flipy: false, rotation: 0}, {x: 0, y: 1420, x_dir: 1, y_dir: 0, flipx: true, flipy: false, rotation: 0},
                                {x: 276, y: 2112, x_dir: 0, y_dir: -1, flipx: true, flipy: false, rotation: -Math.PI/2}, {x: 225, y: 2112, x_dir: 0, y_dir: -1, flipx: true, flipy: false, rotation: -Math.PI/2}, {x: 120, y: 2112, x_dir: 0, y_dir: -1, flipx: true, flipy: false, rotation: -Math.PI/2}, {x: 59, y: 2112, x_dir: 0, y_dir: -1, flipx: true, flipy: false, rotation: -Math.PI/2},
                                {x: 362, y: 1368, x_dir: 0, y_dir: 1, flipx: true, flipy: true, rotation: Math.PI/2}, {x: 540, y: 1368, x_dir: 0, y_dir: 1, flipx: true, flipy: true, rotation: Math.PI/2}, {x: 780, y: 1368, x_dir: 0, y_dir: 1, flipx: true, flipy: true, rotation: Math.PI/2}, {x: 912, y: 1368, x_dir: 0, y_dir: 1, flipx: true, flipy: true, rotation: Math.PI/2}]

        let fireChoice
        //build each bullet as defined by the array fo bullet position objects
        for(let i=0; i<this.bullet_positions.length; i++){
            this.time.addEvent({
                delay: Phaser.Math.RND.between( 2000, 3500), //random time interval between 2 and 3.5 sec
                callback: ()=>{
                    this.bullet= this.physics.add.sprite(this.bullet_positions[i].x, this.bullet_positions[i].y, 'bullet').setFlip(this.bullet_positions[i].flipx, this.bullet_positions[i].flipy).setScale(0.2).setVelocity(this.VEL*3 * this.bullet_positions[i].x_dir,this.VEL*3 * this.bullet_positions[i].y_dir).setRotation(this.bullet_positions[i].rotation).setImmovable(true)
                    this.bulletGroup.add(this.bullet)
                    fireChoice= Phaser.Math.RND.pick([this.fire1, this.fire2])
                    fireChoice.play() 
                }
            })
        }
        //handle collision of player with bullet
        this.physics.add.collider(this.bulletGroup, this.player, (_collidingChild)=>{
            //when player collides with a bullet, decrease life points, shake screen, play sound
            if (_collidingChild.visible == true){
                _collidingChild.setVisible(false)
                this.crash1SFX.play()
                this.fire1.play()
                let str= ''
                if (this.lifePoints > 0) this.lifePoints--
                this.cameras.main.shake(500)
            }
        })
        this.time.addEvent({
            delay: 8000,
            callback: ()=>{
                this.bulletGroup.clear(true)
                if (this.evidence_collected < 5) this.startShooting()
            }
        })

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
    }

    //update score and photo display
    updateUIDisplay(){
        this.str= Phaser.Utils.String.Format('%1 / %2', [this.evidence_collected, 5])
        this.evidenceDisplay.setText(this.str)
        this.str= ''
        for(let i=0; i<this.lifePoints; i++){
            this.str+= '||'
        }
        this.lifeDisplay.setText(this.str)
        console.log(this.lifePoints, this.str.length)
    }

    //if distance between object A and object B is less than value, return true, false otherwise
    checkDistance(A, B, value){
        return ( this.calcDistance(A, B) < value)
    }
    
    //calculates the distance between two objects A and B
    calcDistance(A,B){
        return Math.sqrt((Math.abs(A.x -B.x)*Math.abs(A.x -B.x)) + (Math.abs(A.y -B.y)*Math.abs(A.y -B.y)))
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

    //event where player collides with game world object
    worldObjCollision(){
        this.crash2SFX.play()
        if (this.points >= 100)
            this.points-= 100
        else 
            this.points= 0
    }

    //recive data from parent scene
    init(data){
        this.bgm= data.bgm;
        this.lost= data.lost
        if (!this.bgm.isPlaying) this.bgm.play()
    }
    
}