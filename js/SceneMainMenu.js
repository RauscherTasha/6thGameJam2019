class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({key: "SceneMainMenu"});
    }

    init(data) {
        this.extremeMode = data.extremeMode;
    }

    preload() {
        this.load.json('SE', 'assets/text.json'); // SE story elements
    }

    create() {
        this.transitionTime = 750;

        this.storyElements = this.cache.json.get('SE');
        this.storyElementsLenght = this.storyElements.se.length;
        this.storyIndex = 0;
        this.bg = [];

        for (let i = 0; i < this.storyElementsLenght; i++) {
            this.load.image('background' + i, this.storyElements.se[i].background);
        }
        this.load.start();
        this.load.once('filecomplete', addFiles, this);

        function addFiles() {
            for (let i = 0; i < this.storyElementsLenght; i++) {
                this.bg[i] = this.add.image(0, 0, 'background' + i).setOrigin(0, 0);
                this.bg[i].depth = 100000 - 1000 * i;
            }
            console.log("done");
        }

        this.story = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.1, this.storyElements.se[this.storyIndex].story, {
            fontFamily: 'monospace',
            fontSize: 35,
            color: '#ffffff',
            align: 'center',
        });

        this.story.setStroke('#000000', 12);
        this.story.setShadow(2, 2, "#000000", 2, true, true);
        this.story.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.story.width, this.story.height), Phaser.Geom.Rectangle.Contains);
        this.story.setOrigin(0.5);

        //Option
        this.optionNeg = this.add.text(this.game.config.width * 0.5, this.game.config.height * (0.3 + Math.random() * .8), this.storyElements.se[this.storyIndex].optionNeg, {
            fontFamily: 'monospace',
            fontSize: 35,
            color: '#000000',
            align: 'center',
        });


        this.optionNeg.setStroke('#ffffff', 12);
        this.optionNeg.setShadow(2, 2, "#ffffff", 2, true, true);
        this.optionNeg.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.story.width, this.story.height), Phaser.Geom.Rectangle.Contains);

        this.optionNeg.on('pointerover', function () {
            this.optionNeg.setAlpha(0.6);
        }, this);
        this.optionNeg.on('pointerout', function () {
            this.optionNeg.setAlpha(1);
        }, this);
        this.optionNeg.setOrigin(0.5);

        this.cameras.main.on('camerafadeoutcomplete', function () {
            console.log("before: "+this.storyIndex);

            this.storyIndex++;// = ((this.storyIndex + 1) % this.storyElementsLenght);
            if(this.storyIndex == this.storyElementsLenght){
                //this.scene.start("SceneMain");
            }else{
            console.log("after: "+this.storyIndex);
            this.optionNeg.setY(this.game.config.height * (0.1 + Math.random() * .8));
            this.story.setText(this.storyElements.se[this.storyIndex].story);
            var old_depth = this.bg[this.storyIndex - 1].depth;
            this.bg[this.storyIndex] = this.add.image(0, 0, 'background' + this.storyIndex).setOrigin(0, 0);
            this.bg[this.storyIndex].depth = old_depth + 10;
            this.story.depth = old_depth + 20;
            this.cameras.main.fadeIn(this.transitionTime);

            if (!this.extremeMode) {
                this.optionNeg.setText(this.storyElements.se[this.storyIndex].optionNeg);
            };}

        }, this);

        this.optionNeg.on("pointerdown", function () {
            this.cameras.main.fadeOut(this.transitionTime);
        }, this);

        this.story.depth = 500000;
        this.optionNeg.depth = 600000;

    }
}