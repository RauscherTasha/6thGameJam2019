class SceneSingleQuestion extends Phaser.Scene {
    constructor() {
        super({key: "SceneSingleQuestion"});
    }

    preload() {

		this.load.on('filecomplete', function (key, type, data) {
			// Your handler code
			this.se = this.cache.json.get('SE');
			var index = 1;
			var story = this.se.se[index].story;
			var background_image = this.se.se[index].background;
			this.load.image('background', background_image);
		}, this);
        this.load.json('SE', 'assets/text.json'); // SE story elements
        
    }

    create() {
		
		this.add.image(0, 0, 'background').setOrigin(0, 0);

    }

    update() {
        // this.player.update();

        // this.score.setText("Score: "+ this.player.getData("points"));
        // this.multi.setText("Survival Bonus: x" + Math.round(this.multiplier*100)/100);

        // this.gtstring = this.timeToString(this.sys.game.loop.timethis.starttime);
        // this.gametime.setText('Time: ' + this.gtstring);


        // for (var i = 0; i < this.backgrounds.length; i++) {
        //     this.backgrounds[i].update();
        // }

    }

    timeToString(time){
        return Math.floor((time/1000/3600)%24)+ ":" + Math.floor((time/1000/60)%60)+ ":" + Math.floor(time/1000%60);
    }

}


