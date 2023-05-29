export default class TestClass {
  public testNumber = 5
  public testString = 'hello'

  public test(): void {
    console.log(`${this.testNumber}, ${this.testString}`)
  }
}
