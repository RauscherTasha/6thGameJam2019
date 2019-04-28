class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: "SceneMain"});
    }

    preload() {
        
		
		this.load.image("newGame", "assets/images/newGame.png");
        //audio
        //this.load.audio("sndExplode0", "content/audio/sndExplode0.wav");
    }

    create() {
		
        var newGame = this.add.image(0, 0, "newGame").setInteractive();
		
		this.menuNumber = 0;
		
		 newGame.on("pointerdown", function (ev) {
            this.menuNumber = 1;
        }, this);

		
    }

    update() {
        
		if(this.menuNumber === 1) {
            this.scene.start("SceneMainMenu");
        }
		
    }

}

