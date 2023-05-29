class Play extends Phaser.Scene{
    constructor(){
        super({key: "playScene"})
        this.VEL= 150;
    }

    create(){
        const map= this.add.tilemap('tilemapJSON')
        const tileset= map.addTilesetImage('tileset', 'tilesetImage')


        //add layer
        const bgLayer= map.createLayer('Background', tileset, 0, 0)
        const roadLayer= map.createLayer('Roads', tileset, 0, 0)
        const vehicleBuildingLayer= map.createLayer('Vehicles/Buildings', tileset, 0, 0).setDepth(10)
        const treeInfraLayer= map.createLayer('Trees/Infra', tileset, 0, 0).setDepth(10)


        //adds player
        this.player= this.physics.add.sprite(627, 245, 'player', 0).setOrigin(0.5).setScale(0.65)
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setCircle(this.player.width/1.7)
        this.player.body.offset.y=20
        //this.player.body.offset.x=-10
        //this.player.rotation= -Math.PI/2
        //adds target
        this.target= this.physics.add.sprite(1121, 395, 'target', 0).setOrigin(0.5).setScale(0.65)
        this.target.body.setCollideWorldBounds(true);
        this.target.body.setCircle(this.target.width/1.7)
        this.target.body.offset.y=20
        //this.player.flipX= true
        //this.player.flipY= true
        //this.player.angle= 0
        //enable collision
        roadLayer.setCollisionByProperty({collides: true})
        vehicleBuildingLayer.setCollisionByProperty({collides: true})
        treeInfraLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, roadLayer)
        this.physics.add.collider(this.player, vehicleBuildingLayer)
        this.physics.add.collider(this.player, treeInfraLayer)
        this.physics.add.collider(this.player, this.target, ()=>{
            console.log("MADE CONTACT")
        })

        //camera movment
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

        //input
        this.cursors= this.input.keyboard.createCursorKeys();
    }

    update(){

        this.updateCar_withSteering(this.player)//, this.playerDirection);
        //this.updateCar_withSteering(this.target, this.targetDirection);
        console.log(this.player.x, this.player.y)


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
}