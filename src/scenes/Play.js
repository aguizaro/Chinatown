class Play extends Phaser.Scene{
    constructor(){
        super({key: "playScene"})
        this.VEL= 120;
    }

    create(){
        const map= this.add.tilemap('tilemapJSON')
        const tileset= map.addTilesetImage('tileset', 'tilesetImage')

        //add game map layers
        const bgLayer= map.createLayer('Background', tileset, 0, 0)
        const roadLayer= map.createLayer('Roads', tileset, 0, 0)
        const vehicleBuildingLayer= map.createLayer('Vehicles/Buildings', tileset, 0, 0).setDepth(10)
        const treeInfraLayer= map.createLayer('Trees/Infra', tileset, 0, 0).setDepth(10)

        //adds player
        this.player= this.physics.add.sprite(627, 245, 'player', 0).setOrigin(0.5).setScale(0.5)
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setCircle(this.player.width/1.7)
        this.player.body.offset.y=20
        //adds target
        /*this.target= this.physics.add.sprite(772, 800, 'target', 0).setOrigin(0.5).setScale(0.5)
        this.target.body.setCollideWorldBounds(true);
        this.target.body.setCircle(this.target.height/1.7)
        */

        //add target's path
        this.targetPath= this.add.path(772, 790)
        this.targetPath.lineTo(567, 790)
        this.targetPath.lineTo(567, 948)
        this.targetPath.lineTo(292, 948)
        this.targetPath.lineTo(292, 166)
        this.targetPath.lineTo(837, 166)
        this.targetPath.lineTo(837, 545)
        this.targetPath.lineTo(202, 545)
        this.targetPath.lineTo(202, 986)
        this.targetPath.lineTo(875, 986)
        this.targetPath.lineTo(875, 173)
        this.targetPath.lineTo(1170, 173)
        this.targetPath.lineTo(1170, 690)
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.75);  // lineWidth, color, alpha
        //this.targetPath.draw(graphics)

        //add path follower
        let s= this.targetPath.getStartPoint();
        this.targetFollower= this.add.follower(this.targetPath, s.x, s.y, 'target').setScale(0.5). setOrigin(0.5)
        this.targetFollower.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: 80000,
            ease: 'Power0',
            hold: 0,
            repeat: 0,
            yoyo: false,
            rotateToPath: true
        });
        this.physics.add.existing(this.targetFollower)
        this.targetFollower.body.setCircle(this.targetFollower.height/1.7)
        this.targetFollower.body.offset.x= 20

        //enable collision
        roadLayer.setCollisionByProperty({collides: true})
        vehicleBuildingLayer.setCollisionByProperty({collides: true})
        treeInfraLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, roadLayer)
        this.physics.add.collider(this.player, vehicleBuildingLayer)
        this.physics.add.collider(this.player, treeInfraLayer)
        this.physics.add.collider(this.targetFollower, roadLayer)
        this.physics.add.collider(this.targetFollower, vehicleBuildingLayer)
        this.physics.add.collider(this.targetFollower, treeInfraLayer)
        this.physics.add.collider(this.player, this.targetFollower, ()=>{
            console.log("MADE CONTACT")
        })

        //camera movment
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)
        //Minimap
        this.minimap= this.cameras.add(0, 0, map.widthInPixels/12, map.heightInPixels/12, false, 'minimap').setAlpha(0.8).setZoom(0.2)
        this.minimap.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.minimap.startFollow(this.player, true, 0.25, 0.25)
        this.minimap.ignore([treeInfraLayer, vehicleBuildingLayer])
        //const shape= this.player.createGeometryMask()
        //this.minimap.setMask(shape)


        //input
        this.cursors= this.input.keyboard.createCursorKeys();
    }

    update(){
        this.updateCar_withSteering(this.player)//, this.playerDirection);
        console.log(this.player.x, this.player.y)
    }
    

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
}