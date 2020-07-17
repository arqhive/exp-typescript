/* Interface */

// 요구 사항을 설명하는 데 사용하는 이름이다.
interface LabeledValue {
  label: string;
}

// 컴파일러는 최소한 필요한것이 존재하고 필요한 유형과 일치 하는지 확인한다.
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 선택적 속성
// 특정 조건 하에서 존재하거나 전혀 존재하지 않는 경우의 패턴
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // 문자열 인덱스 서명
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" }); // width는 사용하지 않았음

// 아래와 같은 경우 타입 어설션으로 유형 점검을 회피 할 수 있음
// 더 좋은 방법은 문자열 인덱스 서명을 추가하는 것 (interface 확인)
let mySquare2 = createSquare({ colour: "red", width: 100 } as SquareConfig);
let mySquare3 = createSquare({ width: 100, opacity: 0.5 });

// 읽기 전용 속성
// 일부 속성은 객체가 처음 생성 될 때만 (선언 될때만) 수정되어야 한다.
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // Error

// ReadonlyArray<T>
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // Error
// a = ro; Error....
a = ro as number[]; // type assertion을 통해 덮어 씌울수는 있음

// 속성은 readonly, 변수는 const

// 함수 유형
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
// 매개변수 이름을 바꿔도 되고 유형을 생략해도 됨
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};

// 인덱서블 타입
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
// myArray2[2] = "Mallory"; // error!

// Class
// Class Property 설명
// 인터페이스는 클래스의 인스턴스 측만 검사한다.
interface ClockInterface {
  currentTime?: Date;
  setTime?(d: Date): void;
  // new (hour: number, minute: number); 생성자는 정적 측에 있으므로 검사에는 포함되지 않는다.
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// 그럼 어떻게 해?
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
}

let digital = createClock(DigitalClock, 12, 17);

// 또 다른 방법은 클래스 표현식을 사용한다.
const Clock2: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
};

// 인터페이스 확장
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// 하이브리드 유형
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function(start: number) {} as Counter;
  counter.interval = 12;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
