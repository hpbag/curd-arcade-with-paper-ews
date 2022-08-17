export class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  private jumpKeyPhone: Phaser.Input.Pointer;

  private jumpKeyLaptop: Phaser.Input.Keyboard.Key;

  private isDead: boolean;

  private isFlapping: boolean;

  private textureName: string;

  private isClicking: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    // TODO: ADD PHONE TOUCH
    this.jumpKeyPhone = this.scene.input.activePointer;
    this.jumpKeyLaptop = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Phaser env
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setSize(25, 50).setScale(1.5); // .setScale(3); //.setOffset(0, 18)
    // create gravity
    this.setGravityY(1000);
    // for scene
    this.setCollideWorldBounds(true);

    // variables
    this.isDead = false;
    this.isFlapping = false;
    this.isClicking = false;

    // texture
    this.textureName = texture;
    // orignal texture
    // this.play(this.textureName, true);

    // this.collider = scene.add
    //   .rectangle(x, y - 16, 16, 16, 0, 50)
    //   .setDepth(50000);
    // scene.physics.add.existing(this.collider);
  }

  public getDead(): boolean {
    return this.isDead;
  }

  public setDead(dead: boolean): void {
    this.isDead = dead;
  }

  public flap() {
    this.scene.tweens.add({
      targets: this,
      props: { angle: -20 },
      duration: 150,
      ease: "Power0",
    });
  }

  override update(): void {
    if (this.isDead) {
      return;
    }
    // handle angle change
    if (this.angle < 30) {
      this.angle += 2;
    }

    if (this.jumpKeyPhone.isDown && !this.isClicking) {
      this.isFlapping = false;
      this.isClicking = true;
    }

    // handle input
    if (!this.jumpKeyPhone.isDown && this.isClicking) {
      this.isFlapping = true;
      this.setVelocityY(-500);
      this.flap();
      this.isClicking = false;
    }

    if (this.jumpKeyLaptop.isDown && !this.isFlapping) {
      // flap
      this.isFlapping = true;
      this.setVelocityY(-300);
      this.flap();
    }

    if (this.jumpKeyLaptop.isDown && this.isFlapping) {
      this.isFlapping = false;
    }

    // check if off the screen: i think technically cant be but whatever
    // if (this.y + this.height > this.scene.sys.canvas.height) {
    //   this.isDead = true;
    // }
  }
}
