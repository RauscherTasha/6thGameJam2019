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
        this.storyElementsLength = this.storyElements.se.length;
        this.storyIndex = 0;
        this.bg = [];

        for (let i = 0; i < this.storyElementsLength; i++) {
            this.load.image('background' + i, this.storyElements.se[i].background);
        }
        this.load.start();
        this.load.once('filecomplete', addFiles, this);

        function addFiles() {
            for (let i = 0; i < this.storyElementsLength; i++) {
                this.bg[i] = this.add.image(0, 0, 'background' + i).setOrigin(0, 0);
                //this.bg[i].depth = 100000 - 1000 * i;
            }
            console.log("done with images#: " + this.bg.length);

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
            this.optionNeg = this.add.text(this.game.config.width * 0.5, this.game.config.height * (0.35 + Math.random() * .55), this.storyElements.se[this.storyIndex].optionNeg, {
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

            this.cameras.main.on('camerafadeoutcomplete', () => {
                console.log("index: " + this.storyIndex + "/" + this.storyElementsLength);
                console.log("images#: " + this.bg.length);


                if (this.storyIndex == this.storyElementsLength) {
                    setTimeout(()=>{this.scene.start("SceneMain")},1000) ;
                } else {
                    console.log("after: " + this.storyIndex);
                    this.optionNeg.setY(this.game.config.height * (0.35 + Math.random() * .55));
                    this.story.setText(this.storyElements.se[this.storyIndex].story);
                    this.bg[this.storyIndex] = this.add.image(0, 0, 'background' + this.storyIndex).setOrigin(0, 0);
                    this.bg[this.storyIndex].depth = this.storyIndex * 1000;
                    this.story.depth = this.bg[this.storyIndex].depth + 100
                    this.optionNeg.depth = this.bg[this.storyIndex].depth + 100
                    this.cameras.main.fadeIn(this.transitionTime);

                    if (!this.extremeMode) {
                        this.optionNeg.setText(this.storyElements.se[this.storyIndex].optionNeg);
                    }
                    this.cameras.main.fadeIn(this.transitionTime);
                }

            }, this);

            this.optionNeg.on("pointerdown", function () {
                this.storyIndex++;// = ((this.storyIndex + 1) % this.storyElementsLength);
                this.cameras.main.fadeOut(this.transitionTime);
            }, this);

            this.story.depth = 500000;
            this.optionNeg.depth = 600000;
            this.cameras.main.fadeOut(1);

        }

    }
}