var config = {
    type: Phaser.AUTO,
    width: 1704,
    height: 960,
    backgroundColor: 0xFFFFFF,
    scene: [
        SceneMain,
        SceneMainMenu,
    ]
}

var game = new Phaser.Game(config)