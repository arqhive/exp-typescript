// Intersection types
// 여러 유형을 하나로 결합한다.

function extend<First, Second>(first: First, second: Second): First & Second {
  const result: Partial<First & Second> = {};
  for (const prop in first) {
    if (first.hasOwnProperty(prop)) {
      (result as First)[prop] = first[prop];
    }
  }
  for (const prop in second) {
    if (second.hasOwnProperty(prop)) {
      (result as Second)[prop] = second[prop];
    }
  }
  return result as First & Second;
}

class Person {
  constructor(public name: string) {}
}

interface Loggable {
  log(name: string): void;
}

class ConsoleLogger implements Loggable {
  log(name) {
    console.log(`Hello I'm ${name}`);
  }
}

const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
jim.log(jim.name);

// Union Types
// 또는

// function padLeft(value: string, padding: any) {
//   if (typeof padding === "number") {
//     return Array(padding + 1).join(" ") + value;
//   }
//   if (typeof padding === "string") {
//     return padding + value;
//   }
//   throw new Error(`Expected string or number, got '${padding}'`);
// }
//
// padLeft("Hello world", 4);

function padLeft(value: string, padding: string | number) {
  // ...
}

interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim(); // errors

// 타입가드

// 일반적인 자바스크립트 방법
// if (pet.swim) {
//   pet.swim();
// } else if (pet.fly) {
//   pet.fly();
// }

// 또는 타입 어설션
if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else if ((pet as Bird).fly) {
  (pet as Bird).fly();
}

// 타입 어설션을 여러번 사용하지 않고 타입 가드를 쓰자
// 타입 가드는 타임 범위를 보장하는 런타임 검사를 수행하는 표현식이다.

// 타입 술어(predicates) 사용하기
// 타입 가드를 정의하려면 반환 타입이 타입 술어인 함수를 정의하면 된다.
// parameterName is Type
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// in 연산자 사용하기
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}

// typeof 사용하기
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function padLeft2(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value;
  }

  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}.'`);
}

// 위는 너무 고통스러우니 인라인으로 작성합시다.
function padLeft3(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// instanceof
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder("  ");
}

// Type is 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // type narrowed to 'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // type narrowed to 'StringPadder'
}

// 타입 어설션
function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + ".  the " + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}

// 타입 앨리어스
// 타입의 새 이름을 작성한다. 인터페이스와 비슷하지만 프리미티브, 유니온, 튜플및 기타 직접 작성해야하는 다른 타입의 이름을 지정할수 있다.

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

type Alias = { num: number };
interface Interface {
  num: number;
}

// 두 개의 차이는 인터페이스는 새로운 이름을 생성하고 타입 앨리어스는 만들지 않음
declare function aliased(arg: Alias): Alias; // 객체 리터럴을 반환
declare function interfaced(arg: Interface): Interface; // Interface를 반환

// 가능
type Cat = Name & { purrs: true };

// 다양하게
type Container<T> = { value: T };

type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
};

type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
  name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;

// 타입 앨리어스가 가능한 경우 인터페이스를 사용한다.
// 인터페이스로 표현할 수 없고 유니온 또는 튜플 형식으로 사용해야 하는 경우 일반적으로 형식 별칭이 사용된다.

// 문자열 리터럴 유형 ( 숫자 리터럴도 가능 )
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // error! should not pass null or undefined.
    }
  }
}

// 다형성 this (메서드 체이닝 만들기)
class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

let v = new BasicCalculator(2)
  .multiply(5)
  .add(1)
  .currentValue();

// 인덱스 유형
// 인덱스 유형을 사용하면 컴파일러가 동적 속성 이름을 사용하는 코드를 확인하도록 할 수 있다.
// keyof T -> 인덱스 유형 쿼리 연산자 let carProps: keyof Car; // the union of ('manufacturer' | 'model' | 'year')
// T[K] 인덱스 액세스 연산자
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map(n => o[n]);
}

interface Car {
  manufacturer: string;
  model: string;
  year: number;
}

let taxi: Car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2014
};

let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);

// keyof T -> 인덱스 유형 쿼리 연산자
let carProps: keyof Car; // the union of ('manufacturer' | 'model' | 'year')

// 인덱스 액세스 연산자 예제
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}

// 이 이상의 유형은 필요하면 알아본다.
