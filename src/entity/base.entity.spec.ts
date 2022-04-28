import Component from "../component/base.component";
import Entity from "./base.entity";

class MyComponent extends Component {
  constructor(public x: number, public y: number) {
    super();
  }
}

class MyComponent2 extends Component {}

class MyEntity extends Entity {}

describe("Entity", () => {
  it("should be extendable", () => {
    const myEntity = new MyEntity();
    expect(myEntity).toBeInstanceOf(MyEntity);
  });

  describe("constructor", () => {
    it("should allow components in constructor", () => {
      const testX = 1;
      const testY = 2;
      const myEntity = new MyEntity([new MyComponent(testX, testY)]);
      expect(myEntity.components.length).toBe(1);
    });

    it("should allow two different components in the constructor", () => {
      const myComponents = [new MyComponent(1, 2), new MyComponent2()];
      const myEntity = new MyEntity(myComponents);
      expect(myEntity.components.length).toBe(2);
    });

    it("should allow only one of each type of component in the constructor", () => {
      const myComponents = [new MyComponent(1, 2), new MyComponent(3, 4)];
      const myEntity = new MyEntity(myComponents);
      expect(myEntity.components.length).toBe(1);
    });
  });

  describe("addComponent", () => {
    it("can add and retrieve a component", () => {
      const myEntity = new MyEntity();
      myEntity.addComponent(new MyComponent(1, 2));
      expect(myEntity.components.length).toBe(1);
    });

    it("will only add one of a type of component", () => {
      const myEntity = new MyEntity();
      myEntity.addComponent(new MyComponent(1, 2));
      myEntity.addComponent(new MyComponent(3, 4));
      expect(myEntity.components.length).toBe(1);
    });

    it("will add one each of two different components", () => {
      const myEntity = new MyEntity();
      myEntity.addComponent(new MyComponent(1, 2));
      myEntity.addComponent(new MyComponent2());
      expect(myEntity.components.length).toBe(2);
    });
  });

  describe("getComponent", () => {
    it("should return a component if it exists", () => {
      const myEntity = new MyEntity([new MyComponent(1, 2)]);
      const myComponent = myEntity.getComponent(MyComponent);
      expect(myComponent).toBeInstanceOf(MyComponent);
    });

    it("should retrieve the correct component", () => {
      const myEntity = new MyEntity([
        new MyComponent(1, 2),
        new MyComponent2(),
      ]);
      const myComponent = myEntity.getComponent(MyComponent2);
      expect(myComponent).toBeInstanceOf(MyComponent2);
    });

    it("should return undefined if the component does not exist", () => {
      const myEntity = new MyEntity();
      const myComponent = myEntity.getComponent(MyComponent);
      expect(myComponent).toBeUndefined();
    });

    it("should return undefined if the component does not exist (but others do)", () => {
      const myEntity = new MyEntity([new MyComponent(1, 2)]);
      const myComponent = myEntity.getComponent(MyComponent2);
      expect(myComponent).toBeUndefined();
    });
  });

  describe("removeComponent", () => {
    it("should remove component appropriately", () => {
      const myEntity = new MyEntity([new MyComponent(1, 2)]);
      myEntity.removeComponent(MyComponent);
      expect(myEntity.components.length).toBe(0);
    });

    it("should remove the second provided component", () => {
      const myEntity = new MyEntity([
        new MyComponent(1, 2),
        new MyComponent2(),
      ]);
      myEntity.removeComponent(MyComponent2);
      expect(myEntity.components.length).toBe(1);
    });

    it("should do nothing if the component has not been added to the entity", () => {
      const myEntity = new MyEntity([new MyComponent(1, 2)]);
      myEntity.removeComponent(MyComponent2);
      expect(myEntity.components.length).toBe(1);
    });
  });
});
