import Component, { IComponent } from "../component/base.component";
import { v4 as generateUUID } from "uuid";
import { Newable } from "../utils/newable.util";

export interface IEntity {
  readonly id: string;
  readonly components: Array<IComponent>;

  addComponent<T extends Component>(
    component: T,
    errorIfExists?: boolean
  ): void;
  getComponent<T extends IComponent>(componentClass: Newable<T>): T | undefined;
  removeComponent<T extends IComponent>(componentClass: Newable<T>): void;
}

export default abstract class Entity implements IEntity {
  public readonly id: string;
  private _components: IComponent[];

  public constructor(components?: IComponent[]) {
    this.id = generateUUID();
    this._components = [];
    if (components) {
      components.forEach((component) => this.addComponent(component));
    }
  }

  public get components() {
    return [...this._components];
  }

  public addComponent<T extends Component>(
    component: T,
    errorIfExists = false
  ): void {
    if (!!this.getComponent(component.constructor as Newable<T>)) {
      if (errorIfExists) {
        throw new Error("Component already exists!");
      }
    } else {
      this._components = [...this.components, component];
    }
  }

  public getComponent<T extends IComponent>(
    componentClass: Newable<T>
  ): T | undefined {
    const discoveredComponent = this._components.find((component) =>
      Component.componentIsInstanceOf(component, componentClass)
    );
    return discoveredComponent as T;
  }

  public removeComponent<T extends IComponent>(
    componentClass: Newable<T>
  ): void {
    if (this.getComponent(componentClass)) {
      this._components = this._components.filter(
        (component) =>
          !Component.componentIsInstanceOf(component, componentClass)
      );
    }
  }
}
