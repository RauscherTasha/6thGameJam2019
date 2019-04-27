class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: "SceneMain"});
    }

    preload() {
        //Sprites
        this.load.spritesheet("sprExplosion", "content/graphics/sprExplosion.png", {
            frameWidth: 32,
            frameHeight: 32

        });
        this.load.image("sprEnemy1", "content/graphics/sprEnemy1.png");
        this.load.spritesheet("sprEnemy2", "content/graphics/sprEnemy2.png", {
            frameWidth: 16,
            frameHeight: 16
        });


        //audio
        this.load.audio("sndExplode0", "content/audio/sndExplode0.wav");
    }

    create() {

        this.starttime = this.sys.game.loop.time;
        this.gtstring = "0:0:0";
        this.multiplier = 1;

        this.anims.create({
            key: "sprEnemy0",
            frames: this.anims.generateFrameNumbers("sprEnemy0"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "sprEnemy1",
            frames: this.anims.generateFrameNumbers("sprEnemy1"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "sprEnemy2",
            frames: this.anims.generateFrameNumbers("sprEnemy2"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: "sprPlayer",
            frames: this.anims.generateFrameNumbers("sprPlayer"),
            frameRate: 20,
            repeat: -1
        });

        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0"),
                this.sound.add("sndExplode1")
            ],
            laser: this.sound.add("sndLaser",{volume: .5})
        }

        this.backgrounds = [];
        for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
            var bg = new ScrollingBg(this, "sprBg0", i * 10);
            this.backgrounds.push(bg);
        }

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprPlayer"
        );
        /*
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        */
        this.enemies = this.add.group();


        this.time.addEvent({
            delay: Phaser.Math.Between(700-(this.multiplier*100),950-(this.multiplier*50)),
            callback: function () {
                var enemy = null;
                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType("ChaserShip").length < 5*this.multiplier) {
                        enemy = new ChaserShip(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                        );
                    }
                }
                else {
                    enemy = new CarrierShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }
                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({

            delay: 5000,
            callback: function () {
                this.multiplier += .20
            },
            callbackScope: this,
            loop: true
        });



        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                player.explode(false);
                player.onDestroy();
                laser.destroy();
            }
        });

        this.score = this.add.text(this.game.config.width*.05 , this.game.config.height*.03, "Score: ", {
            fontFamily: 'monospace',
            fontSize: 15,
            fontStyle: 'bold',
            color: '#1762ff',
            align: 'right',
        });
        this.score.setOrigin(0.1);

        this.multi = this.add.text(this.game.config.width*.65 , this.game.config.height*.03, "Survival Bonus: x1 ", {
            fontFamily: 'monospace',
            fontSize: 15,
            fontStyle: 'bold',
            color: '#ff1c15',
            align: 'left',
        });
        this.multi.setOrigin(0.1);

        this.gametime = this.add.text(this.game.config.width*.30 , this.game.config.height*.03, "Time: 0", {
            fontFamily: 'monospace',
            fontSize: 15,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'left',
        });


    }

    update() {
        this.player.update();

        this.score.setText("Score: "+ this.player.getData("points"));
        this.multi.setText("Survival Bonus: x" + Math.round(this.multiplier*100)/100);

        this.gtstring = this.timeToString(this.sys.game.loop.time-this.starttime);
        this.gametime.setText('Time: ' + this.gtstring);


        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }

    }

    timeToString(time){
        return Math.floor((time/1000/3600)%24)+ ":" + Math.floor((time/1000/60)%60)+ ":" + Math.floor(time/1000%60);
    }

}

