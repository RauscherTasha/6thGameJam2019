class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({key: "SceneMainMenu"});
    }
	
	/*
	 * taken from text.json
	 * {
      "narrationStory":"" ,
      "narrationPos":"" ,
      "narrationNeg":"" ,
      "narrationConclusion": "",
      "background":"" ,
      "story": "",
      "optionPos": "",
      "optionNeg": "",
      "conclusion": ""
    },
	 * 
	 */
	
    preload() {
        this.load.json('SE', 'assets/text.json'); // SE story elements
    }

    create() {
        this.transitionTime = 750;

        this.storyElements = this.cache.json.get('SE');
        this.storyElementsLenght = this.storyElements.se.length;
        this.storyIndex = 0;
        this.bg = [];

        for(let i=0; i<this.storyElementsLenght;i++){
            this.load.image('background' + i, this.storyElements.se[i].background);
            this.load.start();
        }
        this.load.once('filecomplete', addFiles, this);

        function addFiles(){
            for(let i=0; i<this.storyElementsLenght;i++) {
                this.bg[i] = this.add.image(0, 0, 'background' + i).setOrigin(0, 0);
                this.bg[i].depth = 100000-1000*i;
            }
            console.log("done");
        }

        this.story = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.1, this.storyElements.se[this.storyIndex].story, {
            fontFamily: 'monospace',
            fontSize: 40,
            fontStyle: 'bold',
            color: '#ff0000',
            align: 'center',
        });
        this.story.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.story.width, this.story.height), Phaser.Geom.Rectangle.Contains);

        this.story.setOrigin(0.5);

        //Option
        this.optionNeg = this.add.text(this.game.config.width * 0.5, this.game.config.height * (0.1 + Math.random() * .8), this.storyElements.se[this.storyIndex].optionNeg, {
            fontFamily: 'monospace',
            fontSize: 40,
            fontStyle: 'bold',
            color: '#ff0000',
            align: 'center',
        });
        this.optionNeg.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.story.width, this.story.height), Phaser.Geom.Rectangle.Contains);

        this.optionNeg.setOrigin(0.5);
		/*
				this.cameras.main.on('camerafadeoutcomplete', function() {
					this.storyIndex = ((this.storyIndex + 1) % this.storyElementsLenght);
					this.story.setText(this.storyElements.se[this.storyIndex].story);
					var old_depth = this.bg.depth;
					this.bg = this.add.image(0, 0, 'background'+this.storyIndex).setOrigin(0, 0);
					this.bg.depth = old_depth + 10;
					this.story.depth = old_depth + 20;
					this.cameras.main.fadeIn(this.transitionTime);
				}, this);*/

//<<<<<<< HEAD
        this.optionNeg.on("pointerdown", function () {
            if(this.storyIndex < this.storyElementsLenght) {
                for(let i = this.storyElementsLenght - 1; i >= 0; i--) {
                    if(i ==this.storyIndex) {
                        this.bg[this.storyIndex].depth = 0;
                    }else {
                        this.bg[this.storyIndex].depth += -1;
                        this.bg[this.storyIndex].depth += 1;
                    }


                }
                console.log(this.bg);
                this.storyIndex++;
                this.story.setText(this.storyElements.se[this.storyIndex].story);
                this.optionNeg.setText(this.storyElements.se[this.storyIndex].optionNeg);
                this.optionNeg.setY(this.game.config.height * (0.1 + Math.random() * .8));
                //this.bg = (this.add.image(0, 0, 'background' + this.storyIndex).setOrigin(0, 0));

            }

/*=======
        this.optionNeg.on("pointerdown", function() {
			this.cameras.main.fadeOut(this.transitionTime);
>>>>>>> refs/remotes/origin/master*/
        }, this);

        this.story.depth = 500000;
        this.optionNeg.depth = 600000;

    }

    update(){
    }
}