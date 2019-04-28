class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMainMenu" });
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
		
		this.numberOfQuestions = 4;
		this.storyIndex = 0;
		this.transitionTime = 750;
		
		this.load.json('SE', 'assets/text.json'); // SE story elements
		for (var i = 0; i < this.numberOfQuestions; i++) {
			this.load.image('background' + i, "assets/images/background" + i +".png");
		}

    }

    create() {
		/*
		this.load.on('start', function () {
			// Your handler code
			this.storyElements = this.cache.json.get('SE');
			// this.storyIndex = 1;
			// var story = this.storyElements.se[this.storyIndex].story;
			var background_image = this.storyElements.se[this.storyIndex].background;
			this.load.image('background', background_image);
			
			for (var i = 0; i < this.storyElements.se.length; i++) {
				var background_image = this.storyElements.se[i].background;
				this.load.image('background' + i, background_image);
			}
			
		}, this);
		*/
		

		/*
		this.load.on('filecomplete', function (key, type, data) {
					this.add.image(0, 0, 'background').setOrigin(0, 0);
				}, this);
				*/
		
		this.bg = this.add.image(0, 0, 'background0').setOrigin(0, 0);
		this.bg.depth = 100;
        this.storyElements = this.cache.json.get('SE');

        this.story = this.add.text(this.game.config.width * 0.5, this.game.config.height*0.1, this.storyElements.se[this.storyIndex].story, {
            fontFamily: 'monospace',
            fontSize: 40,
            fontStyle: 'bold',
            color: '#ff0000',
            align: 'center',
        });
        this.story.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.story.width, this.story.height), Phaser.Geom.Rectangle.Contains);

        this.story.setOrigin(0.5);

        //Option
        this.optionNeg = this.add.text(this.game.config.width * 0.5, this.game.config.height*(0.1+Math.random()*.8), this.storyElements.se[this.storyIndex].optionNeg, {
            fontFamily: 'monospace',
            fontSize: 40,
            fontStyle: 'bold',
            color: '#ff0000',
            align: 'center',
        });
        this.optionNeg.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.story.width, this.story.height), Phaser.Geom.Rectangle.Contains);

        this.optionNeg.setOrigin(0.5);
		
				this.cameras.main.on('camerafadeoutcomplete', function() {
					this.storyIndex = ((this.storyIndex + 1) % this.numberOfQuestions);
					this.story.setText(this.storyElements.se[this.storyIndex].story);
					var old_depth = this.bg.depth;
					this.bg = this.add.image(0, 0, 'background'+this.storyIndex).setOrigin(0, 0);
					this.bg.depth = old_depth + 10;
					this.story.depth = old_depth + 20;
					this.cameras.main.fadeIn(this.transitionTime);
				}, this);

        this.optionNeg.on("pointerdown", function() {
			this.cameras.main.fadeOut(this.transitionTime);
        }, this);
		
		this.story.depth = 1000;
		this.optionNeg.depth = 2000;

    }

    update() {
    }
}