export default class LoadingScene extends Phaser.Scene {
  private skin = "";

  constructor() {
    super("LOADING_SCENE");
  }

  init({ skin }: { skin: string }) {
    this.skin = skin;
  }

  preload(): void {
    if (!this.skin) {
      throw new Error("Missing skin");
    }

    // load map
    this.load.pack("flappyBirdPack", "/assets/pack.json", "flappyBirdPack");

    this.load.image({
      key: this.skin,
      url: `/character_images/${this.skin}.png`,
    });
  }

  create(): void {
    this.scene.start("GAME_SCENE", { skin: this.skin });
  }
}
