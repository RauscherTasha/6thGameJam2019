class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMainMenu" });
    }

    preload() {
		
		this.storyIndex = 1;
		
		this.load.json('SE', 'assets/text.json'); // SE story elements
		
		this.load.image('background1', "assets/images/BGCrossroad.png");
		this.load.image('background2', "assets/images/BGCrossroad2.png");
		
		
		// this.load.start();
		
		

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
		
		this.bg = this.add.image(0, 0, 'background1').setOrigin(0, 0);
		this.bg.depth = 100;

		
        this.storyElements = this.cache.json.get('SE');
		
		//this.add.image(0, 0, 'background').setOrigin(0, 0);

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

        this.optionNeg.on("pointerdown", function() {
            //if(this.storyIndex < this.storyElements.se.length) {
                this.storyIndex++;
				this.story.setText(this.storyElements.se[this.storyIndex].story);
				var old_depth = this.bg.depth;
				this.bg = this.add.image(0, 0, 'background'+this.storyIndex).setOrigin(0, 0);
				this.bg.depth = old_depth + 10;
				this.story.depth = old_depth + 20;

				/*
				this.load.on('filecomplete', function (key, type, data) {
					this.add.image(0, 0, 'background').setOrigin(0, 0);
				}, this);
				*/
				// var background_image = this.storyElements.se[this.storyIndex].background;
				// this.load.image('background', background_image);
            //}
        }, this);
		
		this.story.depth = 1000;
		this.optionNeg.depth = 2000;

    }

    update() {
    }
}