import type { Game, Types } from "phaser";
import React, { useEffect, useRef } from "react";

let phaser2: typeof Phaser;
let config2: Types.Core.GameConfig;

async function getPhaserGameImports() {
  if (!phaser2) {
    phaser2 = (await import("phaser")).default;
    config2 = (await import(`./config/phaserGameConfig`))
      .config as Types.Core.GameConfig;
  }
  return { Phaser: phaser2, gameConfig: config2 };
}

export function useGame(skin?: string) {
  const isInit = useRef(true);
  const [game, setGame] = React.useState<Game | undefined>(undefined);
  useEffect(() => {
    async function loadGame() {
      if (!game && isInit.current) {
        isInit.current = false;
        const { Phaser, gameConfig } = await getPhaserGameImports();
        const newGame = new Phaser.Game(gameConfig);
        newGame.scene.start("LOADING_SCENE", { skin: skin || "buildspace" });
        setGame(newGame);
      }
    }

    loadGame();
    return () => {
      game?.destroy(true);
    };
  }, [game, skin]);

  return { game };
}
