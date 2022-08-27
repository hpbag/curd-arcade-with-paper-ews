import Router from "next/router";

import {
  FLAPPY_BIRD_GAME_SCENE,
  GAME_HEIGHT,
  GAME_WIDTH,
} from "lib/constants/phaser";
import { ROUTE_LEADERBOARD_PAGE } from "lib/constants/routes";
import { GameSearchSchema } from "pages/tournament/[tournament]/[game]";

import { Pipe } from "./objects/Pipe";
import { PlayerSprite } from "./objects/Player";

export default class FlappyBirdGameScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;

  private pipes!: Phaser.GameObjects.Group;

  private scoreText!: Phaser.GameObjects.BitmapText;

  private player!: PlayerSprite;

  private skin!: string;

  constructor() {
    super(FLAPPY_BIRD_GAME_SCENE);
  }

  init({ skin }: { skin: string }) {
    this.registry.set("score", -1);
    this.skin = skin;
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
    this.addNewPipe();
    this.time.addEvent({
      delay: 1500,
      callback: this.addNewPipe,
      callbackScope: this,
      loop: true,
    });

    // player sprite
    this.player = new PlayerSprite(
      this,
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      this.skin
    );

    // collision - end game
    this.physics.add.overlap(this.player, this.pipes, () => {
      // stopping the game
      this.scene.pause();
      const parsedQuery = GameSearchSchema.safeParse(Router.query);
      if (!parsedQuery.success) {
        return;
      }
      const { game, tournament } = parsedQuery.data;
      fetch("/api/game-over", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: Buffer.from(
            this.registry.values.score.toString(),
            "utf-8"
          ).toString("base64"),
          game,
          tournament,
        }),
        credentials: "include",
      }).then((resp) => {
        if (resp.ok) {
          Router.push(ROUTE_LEADERBOARD_PAGE(tournament, game));
        } else {
          resp.json().then((result) => {
            console.log("Error", result.error);
          });
        }
      });
    });

    // set-up camera
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setZoom(1);
    camera.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // pause game initially
    this.scene.pause();
  }

  private addNewPipe(): void {
    const pipeOffset = 10;

    // update the score
    this.registry.values.score += 1;
    this.scoreText.setText(this.registry.values.score);

    // randomly pick a number between 1 and 5
    const hole = Math.floor(Math.random() * 5) + 1;

    // add 6 pipes with one big hole at position hole and hole + 1
    for (let i = 0; i < 10; i += 1) {
      if (i !== hole && i !== hole + 1 && i !== hole + 2) {
        if (i === hole - 1) {
          this.addPipe(GAME_WIDTH + pipeOffset, i * 60, 0);
        } else if (i === hole + 3) {
          this.addPipe(GAME_WIDTH + pipeOffset, i * 60, 1);
        } else {
          this.addPipe(GAME_WIDTH + pipeOffset, i * 60, 2);
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
    this.player.update();

    // move the background
    this.background.tilePositionX += 4;

    // remove pipes outside of the game
    Phaser.Actions.Call(
      this.pipes.getChildren(),
      (pipe: Phaser.GameObjects.GameObject) => {
        if ((pipe as Phaser.Physics.Arcade.Image).x < 0) {
          this.pipes.remove(pipe);
        }
      },
      this
    );
  }
}
