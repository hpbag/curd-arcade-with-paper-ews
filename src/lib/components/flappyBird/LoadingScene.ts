export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LOADING_SCENE");
  }

  preload(): void {
    // load map
    this.load.pack("flappyBirdPack", "/assets/pack.json", "flappyBirdPack");

    this.load.image({
      key: "farza",
      url: "/character_images/farza.png",
    });

    this.load.image({
      key: "buildspace",
      url: "/character_images/buildspace.png",
    });

    this.load.image({
      key: "hans",
      url: "/character_images/hans.png",
    });

    this.load.image({
      key: "winston",
      url: "/character_images/winston.png",
    });
  }

  create(): void {
    this.scene.start("GAME_SCENE");
  }
}
