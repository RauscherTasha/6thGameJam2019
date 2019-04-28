var config = {
    type: Phaser.AUTO,
    width: 2130,
    height: 1200,
    backgroundColor: 0xFFFFFF,
    scene: [
        SceneMain,
        SceneMainMenu
    ]
}

var game = new Phaser.Game(config)