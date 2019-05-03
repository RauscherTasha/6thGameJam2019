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
        this.storyElements = this.cache.json.get('SE');
        this.storyElementsLenght = this.storyElements.se.length;
        this.storyIndex = 0;
        this.bg = new Array(this.storyElementsLenght);;

        // use paths form json file to  get bg
        for (let i = 0; i < this.storyElementsLenght; i++) {
            this.load.image('background' + i, this.storyElements.se[i].background);
        }
        //trigger loading images
        this.load.start();

        //set variables
        //this.cameras.main.setBackgroundColor('rgba(0,0,0,0)')
        this.transitionTime = 750;

        //once loaded
        this.load.once('filecomplete',renderStory() , this);
        function addFiles() {
            for (let i = 0; i < this.storyElementsLenght; i++) {
                console.log(i);
                //this.bg[i] = this.add.image(0, 0, 'background' + i).setOrigin(0, 0);
                // this.bg[i].depth = 100000 - 1000 * i;
            }
            console.log("done");
        }

        //story text
        this.story = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.1, "", {
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
        this.optionNeg = this.add.text(this.game.config.width * 0.5, this.game.config.height * (0.35 + Math.random() * .55), "", {
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


        this.story.depth = 500000;
        this.optionNeg.depth = 600000;
        this.cameras.main.fadeOut();

        this.cameras.main.on('camerafadeoutcomplete', function () {
            renderStory();
        }, this);

        this.optionNeg.on("pointerdown", function () {
            this.cameras.main.fadeOut(this.transitionTime);
            console.log("before: " + this.storyIndex);
            this.storyIndex++;// = ((this.storyIndex + 1) % this.storyElementsLenght);
            console.log("after: " + this.storyIndex);

            if (this.storyIndex == this.storyElementsLenght) {
                //this.scene.start("SceneMain");
            } else {
                renderStory();
            };

        }, this);

        function renderStory() {

            this.bg[this.storyIndex] = this.add.image(0, 0, 'background' + this.storyIndex).setOrigin(0, 0);
            this.bg[this.storyIndex].depth = 1000 * this.storyIndex;
            this.story.setText(this.storyElements.se[this.storyIndex].story);
            this.optionNeg.setY(this.game.config.height * (0.35 + Math.random() * .55));

            if (!this.extremeMode) {
                this.optionNeg.setText(this.storyElements.se[this.storyIndex].optionNeg);
            };

            this.cameras.main.fadeIn(this.transitionTime);
        }
    }

}