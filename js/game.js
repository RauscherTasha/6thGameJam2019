var config = {
    type: Phaser.WEBGL,
    width: 1420,
    height: 800,
    backgroundColor: "black",
    /*physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },*/
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver
    ],
    //pixelArt: true,
    //roundPixels: true
}

var game = new Phaser.Game(config)