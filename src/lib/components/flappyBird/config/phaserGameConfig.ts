import type { Types } from "phaser";

import FlappyBirdGameScene from "../GameScene";
import FlappyBirdLoadingScene from "../LoadingScene";
import { GAME_HEIGHT, GAME_WIDTH } from "lib/constants/phaser";

export const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#000000",
  scale: {
    parent: "game-container",
    mode: Phaser.Scale.FIT,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  parent: "game",
  scene: [FlappyBirdLoadingScene, FlappyBirdGameScene],
  input: {
    keyboard: true,
  },
  physics: {
    default: "arcade",

    arcade: {
      // remove this on prod
      // debug: true,
      gravity: { y: 300 },
    },
  },
  pixelArt: true,
};
