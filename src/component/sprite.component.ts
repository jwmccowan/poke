import Component from "./base.component";

export default class SpriteComponent extends Component {
  constructor(
    private image: HTMLImageElement,
    private ctx: CanvasRenderingContext2D
  ) {
    super();
  }

  override onUpdate(): void {
    this.ctx.drawImage(this.image, 0, 0);
  }
}
