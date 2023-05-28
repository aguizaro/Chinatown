class Play extends Phaser.Scene{
    constructor(){
        super({key: "playScene"})
        this.VEL= 250;
    }

    create(){
        const map= this.add.tilemap('tilemapJSON')
        const tileset= map.addTilesetImage('tileset', 'tilesetImage')


        //add layer
        const bgLayer= map.createLayer('Background', tileset, 0, 0)
        const roadLayer= map.createLayer('Roads', tileset, 0, 0)
        const vehicleLayer= map.createLayer('Vehicles', tileset, 0, 0).setDepth(10)
        const infraLayer= map.createLayer('Infrastructure', tileset, 0, 0).setDepth(10)


        //adds player
        this.player= this.physics.add.sprite(627, 245, 'player', 0).setOrigin(0.5)
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setCircle(this.player.width/3)
        this.player.flipX= true
        //adds target
        this.target= this.physics.add.sprite(1121, 395, 'target', 0).setOrigin(0.5)
        this.target.body.setCollideWorldBounds(true);
        this.target.body.setCircle(this.target.width/3)
        this.player.flipX= true
        //this.player.flipY= true
        //this.player.angle= 0
        //enable collision
        roadLayer.setCollisionByProperty({collides: true})
        vehicleLayer.setCollisionByProperty({collides: true})
        //infraLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, roadLayer)
        this.physics.add.collider(this.player, vehicleLayer)
        //this.physics.add.collider(this.player, infraLayer)

        //camera movment
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

        //input
        this.cursors= this.input.keyboard.createCursorKeys();
    }

    update(){


        console.log(this.player.x, this.player.y)
        this.direction= new Phaser.Math.Vector2(0);
        if (this.cursors.left.isDown){
            this.player.setOrigin(0.4, 0.57)
            this.player.body.offset.x= 0;
            this.player.angle= 180
            this.player.flipY= true;
            this.direction.x= -1
        }else if(this.cursors.right.isDown){
            this.player.setOrigin(0.5)
            this.player.body.offset.x= 10
            this.player.angle= 0;
            this.player.flipY= false;
            this.direction.x=1
        }
        if (this.cursors.up.isDown){
            this.player.setOrigin(0.4, 0.7)
            this.player.body.offset.x= 0;
            this.player.flipY= true
            this.player.angle= -90
            this.direction.y= -1
        }else if(this.cursors.down.isDown){
            this.player.setOrigin(0.4, 0.4)
            this.player.body.offset.x= 0;
            this.player.flipY= true
            this.player.angle= 90
            this.direction.y=1
        }
        
        this.direction.normalize();
        this.player.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}