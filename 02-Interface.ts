// 타입스크립트의 핵심 원칙 중 하나는 유형 검사가 값의 모양에 중점을 둔다는 것이다.
// 이것을 "덕 타이핑", "구조적 서브 타이핑"이라고도 한다.

// 첫 예제
// 중요한건 모양 뿐이다!
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

/* 선택적 속성 */
interface SqureConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // 문자열 인덱스 서명을 추가한다. (초과하는 속성 점검)
}

function createSquare(config: SqureConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width;
  }
  return newSquare;
}

let mySqaure = createSquare({ color: "black" });

/* 읽기 전용 속성 */
// 일부 속성은 객체가 처음 생성 될 때만 수정 가능해야 한다.
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; Error!

// ReadonlyArray<T>를 사용해 배열을 변경하지 못하게 할 수 있음
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// ro[0] = 12; Error
// type assertiong으로 재정의 할 수 있다.
a = ro as number[];

// 변수는 const 속성은 readonly

/* Excess Property Checks (초과하는 속성 점검) */
// 타입 어설션을 이용한다.
let mySqaure2 = createSquare({ width: 100, opacity: 0.5 } as SqureConfig);

/* function type */
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

// 매개 변수 이름은 자유
// 타입은 인터페이스에 선언되어있으므로 생략 가능
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};

/* 인덱서블 타입 */
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

interface NumberDictionary {
  // [index: string]: number; Error
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string;
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}

/* Class Type */
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date): void;
// }
//
// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) {}
// }

// 인터페이스는 클래스의 인스턴스 측만 검사한다.
// 정적부분을 검사혀려면 아래와 같이 한다.

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
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
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digial = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 다른 방식은 클래스 표현식을 사용한다.
const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};

/* 인터페이스 확장 */
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

/* 하이브리드 타입 */
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function(start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
