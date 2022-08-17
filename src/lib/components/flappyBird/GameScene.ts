import { GAME_HEIGHT, GAME_WIDTH } from "lib/constants/phaserConsts";

import { Pipe } from "./objects/Pipe";
import { PlayerSprite } from "./objects/Player";

export default class GameScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;

  private pipes!: Phaser.GameObjects.Group;

  private scoreText!: Phaser.GameObjects.BitmapText;

  private player!: PlayerSprite;

  private skin: string;

  constructor() {
    super("GAME_SCENE");
    // SET SKIN HERE // "buildspace" | "farza" | "hans" | "winston"
    this.skin = "buildspace";
  }

  init() {
    this.registry.set("score", -1);
  }

  create() {
    // set-up objects
    // background
    this.background = this.add
      .tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, "background")
      .setOrigin(0, 0);

    // scoreboard
    this.scoreText = this.add
      .bitmapText(
        this.sys.canvas.width / 2 - 14,
        30,
        "font",
        this.registry.values.score
      )
      .setDepth(2);

    // pipe infrastructure
    this.pipes = this.add.group({ classType: Pipe });

    this.player = new PlayerSprite(
      this,
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      this.skin
    );

    this.addNewRowOfPipes();

    this.time.addEvent({
      delay: 1000,
      callback: this.addNewRowOfPipes,
      callbackScope: this,
      loop: true,
    });
    // set-up camera
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setZoom(1);
    camera.setBounds(0, 0, 390, 600);
  }

  private addNewRowOfPipes(): void {
    // update the score
    this.registry.values.score += 1;
    this.scoreText.setText(this.registry.values.score);

    // randomly pick a number between 1 and 5
    const hole = Math.floor(Math.random() * 5) + 1;

    // add 6 pipes with one big hole at position hole and hole + 1
    for (let i = 0; i < 10; i += 1) {
      if (i !== hole && i !== hole + 1 && i !== hole + 2) {
        if (i === hole - 1) {
          this.addPipe(400, i * 60, 0);
        } else if (i === hole + 3) {
          this.addPipe(400, i * 60, 1);
        } else {
          this.addPipe(400, i * 60, 2);
        }
      }
    }
  }

  private addPipe(x: number, y: number, frame: number): void {
    // create a new pipe at the position x and y and add it to group
    this.pipes.add(
      new Pipe({
        scene: this,
        x,
        y,
        frame,
        key: "pipe",
      })
    );
  }

  override update() {
    if (!this.player) {
      // todo: Show some loading screen
      return;
    }
    if (!this.player.getDead()) {
      this.background.tilePositionX += 4;
      this.player.update();
      this.physics.add.overlap(this.player, this.pipes, () => {
        this.player.setDead(true);
      });
      Phaser.Actions.Call(
        this.pipes.getChildren(),
        (pipe: Phaser.GameObjects.GameObject) => {
          if ((pipe as Phaser.Physics.Arcade.Image).x < 0) {
            this.pipes.remove(pipe);
            console.log("pipeRemoved");
          }
        },
        this
      );
    } else {
      // stop the pipes
      this.time.paused = true;
      Phaser.Actions.Call(
        this.pipes.getChildren(),
        (pipe: Phaser.GameObjects.GameObject) => {
          (pipe as Phaser.Physics.Arcade.Image).setVelocityX(0);
        },
        this
      );

      window.location.assign("http://localhost:3000/leader-board/flap-space");
      this.scene.stop();
    }
    this.player.update();
  }
}
