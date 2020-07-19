/* bool */
let isDone: boolean = false;

/* number */
let dicimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;

/* string */
let color: string = "blue";
color = "red";

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}

I'll be ${age + 1} years old next month.`;

/* array */
// 두 가지 방법이 있다.
let list: number[] = [1, 2, 3];

let list2: Array<number> = [1, 2, 3];

/* tuple */
// 튜플 타입 선언
let x: [string, number];
// 초기화
x = ["hello", 10];
// 에러
// x = [10, "hello"];

/* enum */
enum Color {
  Red = 1, // 기본 0에서 시작하나 초기화 가능
  Green = 2, // 모든 값을 초기화 가능
  Blue = 4
}
let c: Color = Color.Green;
let colorName: string = Color[2]; // Green

/* unknown */
// 동적 컨텐츠, API의 모든 값을 의도적으로 수락하려고 할 때, 무엇이든 될 수 있음을 알림
let notSure: unknown = 4;
notSure = "maybe a string instead";

notSure = false;

/* any */
// 유형 검사를 거부 한다. (선언에 너무 힘이 드는 경우)
// 존재하지 않는 속성에도 액세스 할 수 있음 (컴파일러가 확인하지 않음)
declare function getValue(key: string): any;
const str: string = getValue("myString");

/* void */
function warnUser(): void {
  console.log("This is my warning message");
}

// --strictNullChecks가 false인 경우
let unusable: void = undefined;
unusable = null;

/* null, undefined */
// 기본적으로 모든 유형의 하위 유형이다.

/* never */
// 절대 발생하지 않는 값
function error(message: string): never {
  throw new Error(message);
}

// return never
function fail() {
  return error("Something failed");
}

// return never
function inifiniteLoop(): never {
  while (true) {}
}

/* object */
// object 타입을 사용하면 Object.create와 같은 API를 더 잘 표현할 수 있다.
// 일반적으로 이걸 사용할 필요는 없다.
declare function create(o: object | null): void;

// Ok
create({ prop: 0 });
create(null);

// create(42); // Error

/* type assertion */
// 일반적으로 일부 엔티티 유형이 현재 유형보다 더 구체적 일 수 있음을 알고있을때 사용
// 컴파일러에게 '내가 뭘하는지 알고있다'고 말해주는 방법이다.
// as 구문
// JSX를 사용하는 경우 as만 가능
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// 또는 [] 구문
let someValue2: any = "this is a string";
let strLength2: number = (<string>someValue).length;
