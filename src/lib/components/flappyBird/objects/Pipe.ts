import Phaser from "phaser";

export class Pipe extends Phaser.Physics.Arcade.Image {
  constructor(params: {
    scene: Phaser.Scene;
    x: number;
    y: number;
    key: string;
    frame: number;
  }) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setImmovable(false);

    this.setGravityY(-300); // super dumb setting to override the pipe Gravity
    this.setVelocityX(-200);
    this.setSize(20, 20);
  }
}
