import Phaser from "phaser";

export class Pipe extends Phaser.Physics.Arcade.Image {
  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.setGravityY(-300); // super dumb setting i just dont want gravity
    this.setVelocityX(-200);
    this.setSize(20, 20);

    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
  }
}
