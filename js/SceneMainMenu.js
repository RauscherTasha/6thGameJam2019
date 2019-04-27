class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMainMenu" });
    }

    preload(){

        //text
        this.load.json('SE', 'assets/text.json'); // SE story elements

    }

    create() {

        this.se = this.cache.json.get('SE');
        this.index = 0;
        let i =0
        //for(i in ){

        //}
        console.log("se "+this.se.se[1].story);
        //console.log("wut "+this.se[this.index].story);

    }

    update(){

    }
}