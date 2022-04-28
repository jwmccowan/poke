import Component from "./base.component";

describe("Component", () => {
  it("can be extended", () => {
    class MyComponent extends Component {}
    const myComponent = new MyComponent();
    expect(myComponent).toBeInstanceOf(MyComponent);
  });

  it("can be extended with data", () => {
    class MyComponent extends Component {
      constructor(private _myData: number) {
        super();
      }

      public get myData() {
        return this._myData;
      }
    }

    const myData = 6;
    const myComponent = new MyComponent(myData);
    expect(myComponent.myData).toBe(myData);
  });

  describe("componentIsInstanceOf", () => {
    it("should return true if component is indeed instance of", () => {
      class MyComponent extends Component {}
      const myComponent = new MyComponent();
      expect(Component.componentIsInstanceOf(myComponent, MyComponent)).toBe(
        true
      );
    });

    it("should return false if component is not instance of", () => {
      class MyComponent extends Component {}
      class MyComponent2 extends Component {}
      const myComponent = new MyComponent();
      expect(Component.componentIsInstanceOf(myComponent, MyComponent2)).toBe(
        false
      );
    });

    it("should return true if matching for a parent component", () => {
      class MyComponent extends Component {}
      class MyComponent2 extends MyComponent {}
      const myComponent = new MyComponent2();
      expect(Component.componentIsInstanceOf(myComponent, MyComponent)).toBe(
        true
      );
    });
  });
});
