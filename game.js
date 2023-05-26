class Gameplay extends Phaser.Scene {
    constructor(){
        super('Gameplay');
        
    }
    preload(){
        this.load.image('slug','./illustration.png')
        this.load.image('player', './player.png')
        this.load.image('background', './background.png')
    }
    create(){
        const camera = this.cameras.main;
        camera.setZoom(1.2);
        camera.scrollY = 50;
        this.background = this.add.image(400,400,'background');
        this.background.setDepth(0);
        this.keyboard = this.input.keyboard.addKeys("X");
        this.player = this.physics.add.sprite(60,799,'player')
        .setScale(0.3)
        .setGravityY(100)
        .setCollideWorldBounds(true);
        this.player.body.setSize(300,170,0,-100);
        this.player.setVelocityX(50);
        this.enemy1 = this.physics.add.sprite(750,750,'slug')
        .setScale(.1)
        .setCollideWorldBounds(true)
        .setVelocityX(-25);

        this.enemy2 = this.physics.add.sprite(450,750,'slug')
        .setScale(.1)
        .setCollideWorldBounds(true)
        .setVelocityX(-25);
        this.enemy1.body.setSize(300, 200, -100, -100);
        this.enemy2.body.setSize(300, 200, -100, -100);
       this.physics.add.collider(this.player,this.enemy1, collisionHandler,null,this);
        function collisionHandler(obj1,obj2){
            obj1.x += -100;
            obj1.setVelocityX(50);
            obj2.setVelocityX(-50);
        } 
        this.physics.add.collider(this.player,this.enemy2, collisionHandler2,null,this);
        function collisionHandler2(obj1,obj2){
            obj1.x += -100;
            obj1.setVelocityX(50);
            obj2.setVelocityX(-50);
        } 
    }
    
    update(){
        //this.player.setVelocityX(100);
        //this.enemy1.setVelocityX(-50);
        if(this.keyboard.X.isDown == true && this.player.body.velocity.y == 0){
            this.player.setVelocityY(-100);
            this.player.setVelocityX(100);
        }
        if(this.enemy1.getBounds().left <= 0){
            this.tweens.add({
                targets: this.enemy1,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    this.enemy1.visible = false;
                    this.player.destroy();
                }
            })
        }
        if (this.player.getBounds().left <= 0) {
            this.tweens.add({
                targets: this.player,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    this.player.visible = false;
                    this.player.destroy();
                    this.scene.start("Gameplay");
                    
                    
                }
            });
          }
          if (this.player.getBounds().right>= 800) {
            this.add.text(200,200,"You win!").setScale(3);
            this.tweens.add({
                targets: this.player, 
                alpha: 0,
                duration: 3000,
                onComplete: () => {
                    this.scene.start("Gameplay");
                    
                    
                }
            });
          }
    
        
    }

};


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: [Gameplay],
    physics:{
        default:'arcade',
        arcade:{
            debug:true,
        }
}};

const game = new Phaser.Game(config);