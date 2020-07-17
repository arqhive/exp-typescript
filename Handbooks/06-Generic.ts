/* Generic */
/* 단일 유형이 아닌 다양한 유형에서 작동 할 수 있는 컴포넌트를 만들어보자 */

// 제네릭이 없으면 특정 유형을 제공해야 한다.
// 또는 number, any...
function identity(arg: any): any {
  return arg;
}
// any가 모든 유형을 받아들일수 있다는건 확실히 제네릭 하지만 실제로 함수가 반활 할대 해당 유형에 대한 정보를 잃는다.

// 대신에 반환되는 것을 타나내기 위해 그것을 사용 할 수 있는 방식으로 인수의 유형을 캡처하는 방법이 필요하다.
// 특수한 유형의 변수인 type variable을 사용한다.
// T 사용자가 제공한 유형을 캡처하여 나중에 해당 정보를 사용 할 수 있다.
// 여기서는 반환 유형으로 다시 사용한다.
// any와는 다르게 반환 유형에 대한 정보를 잃지 않는다.
function genericFunc<T>(arg: T): T {
  return arg;
}

// 제네릭 함수는 두가지 방법으로 호출 할 수 있다.
// 1. type을 포함한 모든 인수를 전달. (컴파일러가 유추하지 못하는 경우 사용해야 함)
let output = genericFunc<string>("myString");

// 2. 컴파일러에게 맡기기 (유추)
let output2 = genericFunc("myString");

// T가 length가 있다고 보장 할 수 없음
// interface로 제약 조건을 걸수 있다.
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Error: T doesn't have .length
  return arg;
}
// loggingIdentity(3);  // Error, number doesn't have a .length property 제네릭이 제한되었으므로 일부 타입은 사용이 불가능

// T가 배열이라면 사용가능
function loggingIdentity2<T>(arg: T[]): T[] {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

// alter
function loggingIdentity3<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

// 제네릭 타입
let myIdentity: <T>(arg: T) => T = identity;
// alter
// let myIdentity: {<T>(arg: T): T} = identity;

// 제네릭 타입 인터페이스
interface GenericIdentityFn {
  <T>(arg: T): T;
}

// 또는  GenericIdentityFn<number>
let myIdentity2: GenericIdentityFn = identity;

// 제네릭 클래스 (정적 멤버는 지정 불가능)
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};

// 다른 유형 매개 변수로 제한되는 유형 매개 변수를 선언 할 수 있다.
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, 'm'); error x doesn't have key of m

// 제네릭에서 클래스 타입 사용하기
// 생성자 함수로 클래스 유형을 참조해야 한다.
function create<T>(c: { new (): T }): T {
  return new c();
}
