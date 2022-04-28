import { Newable } from "../utils/newable.util";

export interface IComponent {
  onDestroy(): void;
  onInit(): void;
  onUpdate(delta: number): void;
}

export default abstract class Component implements IComponent {
  onDestroy() {}
  onInit() {}
  onUpdate(_delta: number) {}

  public static componentIsInstanceOf<T extends IComponent>(
    component: IComponent,
    componentClass: Newable<T>
  ): component is T {
    return component instanceof componentClass;
  }
}
