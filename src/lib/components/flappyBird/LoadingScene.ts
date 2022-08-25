import {
  FLAPPY_BIRD_GAME_SCENE,
  FLAPPY_BIRD_LOADING_SCENE,
} from "lib/constants/phaser";

export default class FlappyBirdLoadingScene extends Phaser.Scene {
  private skin!: string;

  constructor() {
    super(FLAPPY_BIRD_LOADING_SCENE);
  }

  init({ skin }: { skin: string }) {
    this.skin = skin;
  }

  preload(): void {
    // load map
    this.load.pack("flappyBirdPack", "/assets/pack.json", "flappyBirdPack");

    this.load.image({
      key: this.skin,
      url: `/character_images/${this.skin}.png`,
    });
  }

  create(): void {
    this.scene.launch(FLAPPY_BIRD_GAME_SCENE, { skin: this.skin });

    // Click handler to allow game to be resumed after pausing
    this.input.once("pointerdown", () => {
      this.scene.resume(FLAPPY_BIRD_GAME_SCENE);
    });
    this.input.keyboard.once("keydown", () => {
      this.scene.resume(FLAPPY_BIRD_GAME_SCENE);
    });
  }
}
