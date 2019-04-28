class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: "SceneMain"});
    }

    preload() {
        this.load.image("newGame", "assets/images/BGStart.png");
        this.load.image("evil", "assets/images/SmileyEvil.png");
        this.load.image("nice", "assets/images/SmileyReallyNice.png");
        //this.load.image(,);
    }

    create() {
        this.newGame = this.add.image(0, 0, "newGame").setOrigin(0,0);
        this.evil = this.add.image(1200,300, "evil").setOrigin(0,0);//(this.game.height*.30, this.game.width*.70, "evil").setOrigin(0,0);
        this.evil.depth=10000;
        this.evil.setAlpha(.4);
        this.nice = this.add.image(1700,300, "nice").setOrigin(0,0);//(this.game.height*.30, this.game.width*.80, "nice").setOrigin(0,0);
        this.nice.setAlpha(.4);
        this.nice.depth=10000;
        this.extremeMode = true;


        //this.newGame.setScale(.6666);
        this.newGame.setInteractive();
        this.newGame.on("pointerdown", ()=>{
            this.scene.start("SceneMainMenu",{extremeMode:this.extremeMode});
        }, this);

        this.evil.setScale(.25);
        this.evil.setInteractive();
        this.evil.on("pointerdown", ()=>{
            this.extremeMode = true;
            this.evil.setAlpha(1);
            this.nice.setAlpha(.4);
            // this.story.setShadow(2, 2, "#000000", 2, true, true);
        }, this);


        this.nice.setScale(.25);
        this.nice.setInteractive();
        this.nice.on("pointerdown", ()=>{
            this.extremeMode = false;
            this.nice.setAlpha(1);
            this.evil.setAlpha(.4);
        }, this);
    }

    update() {

    }

}

