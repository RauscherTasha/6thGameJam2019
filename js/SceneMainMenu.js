class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMainMenu" });
    }

    preload(){

        //text
        this.load.json('SE', 'assets/text.json'); // SE story elements

    }

    create() {

        this.storyElemnets = this.cache.json.get('SE');
        this.storyIndex = 1;

        this.story = this.add.text(this.game.config.width * 0.5, this.game.config.height*0.1, this.storyElemnets.se[this.storyIndex].story, {
            fontFamily: 'monospace',
            fontSize: 15,
            //fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
        });
        this.story.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.story.width, this.story.height), Phaser.Geom.Rectangle.Contains);

        this.story.setOrigin(0.5);

        //Option
        this.optionNeg = this.add.text(this.game.config.width * 0.5, this.game.config.height*(0.1+Math.random()*.8), this.storyElemnets.se[this.storyIndex].optionNeg, {
            fontFamily: 'monospace',
            fontSize: 15,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
        });
        this.optionNeg.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.story.width, this.story.height), Phaser.Geom.Rectangle.Contains);

        this.optionNeg.setOrigin(0.5);

        this.optionNeg.on("pointerdown", function() {
            //if(this.storyIndex < this.storyElements.se.length) {
                this.storyIndex++;
            //}
        }, this);

       //console.log("se "+this.storyElemnets.se[1].story);

    }

    update(){
        this.story.setText(this.storyElemnets.se[this.storyIndex].story);
    }
}