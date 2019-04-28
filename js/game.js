var config = {
    type: Phaser.AUTO,
    width: 1420,
    height: 800,
    backgroundColor: 0xFFFFFF,
    scene: [
		SceneMain,
        SceneMainMenu
    ]
}

var game = new Phaser.Game(config)