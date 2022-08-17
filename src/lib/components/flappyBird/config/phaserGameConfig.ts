import type { Types } from "phaser";

import GameScene from "../GameScene";
import LoadingScene from "../LoadingScene";
import { GAME_HEIGHT, GAME_WIDTH } from "lib/constants/phaserConsts";

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
  scene: [LoadingScene, GameScene],
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
