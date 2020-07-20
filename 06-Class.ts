/* Class */

// 기본
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// 상속
class Animal {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }
  public move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name); // 슈퍼 클래스의 생성자를 실행한다.
  }
  move(distanceInMters = 5) {
    // 오버라이딩
    console.log("Slithering...");
    super.move(distanceInMters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

// 수정자
// 기본적으로 수정자를 쓰지 않았으면 public

// ECMAScript Private Field
// class Animal2 {
//   #name: string; // tsconfig에서 타겟을 ES2015 이상으로 설정해야함
//   constructor(theName: string) { this.#name = theName;}
// }

// new Animal2("Cat").#name; // 밖에서 접근 할수 없음!

class Animal3 {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

// new Animal3("Cat").name; // Error

class Rhino extends Animal3 {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal3("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino; // Ok
// animal = employee // Error

class Person {
  protected name: string; // 하위 클래스에서도 계속 액세스 할 수 있다.
  // 클래스 외부에서 인스턴스화 할 수 없지만 확장은 가능하다.
  protected constructor(name: string) {
    this.name = name;
  }
}

class PersonEmployee extends Person {
  private department: string;
  // readonly는 선언시 초기화 하거나 생성자에서 초기화만 가능
  readonly numberOfPart: number = 6;

  constructor(name: string, department: string) {
    super(name); // protected property access
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new PersonEmployee("Howard", "Sales");

// 접근자
const fullNameMaxLength = 10;

class MyEmployee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  // 값을 설정할때 조건을 추가 할 수 있다.
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName;
  }
}

let myEmployee = new MyEmployee();
myEmployee.fullName = "Bob Smith";

// static
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);

// 추상 클래스
// 추상 클래스는 인스턴스화 할 수 없고 추상 메소드는 구현을 포함하지 않고 파생 클래스에서 구현한다.
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // 파생 클래스에서 반드시 구현되어야 함
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing");
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department; // Ok 추상 타입으로 참조를 생성 할 수 있음
// department = new Department(); // Error 추상 클래스는 인스턴스화 할 수 없음
department = new AccountingDepartment(); // ok 서브 클래스를 할당 가능
department.printName();
department.printMeeting();
department.generateReports();
