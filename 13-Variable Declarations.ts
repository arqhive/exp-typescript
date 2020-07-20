// 1) var

// JavaScript에서 변수 선언은 항상 var 키워드를 사용했었다.
var a = 10;

// 함수 내에서 변수를 선언 할 수도 있다.
function f() {
  var message = "Hello World";

  return message;
}

// 다른 함수 내에서 동일한 변수에 액세스 할 수도 있다.
function f2() {
  var a = 10;
  return function g() {
    // f2안에 선언된 a를 캡처했다.
    var b = a + 1; // 11
    return b;
  };
}

var g = f2();
g(); // returns '11'

function f3() {
  var a = 1;

  a = 2;
  var b = g(); // a = 2 캡처
  a = 3;

  return b;

  function g() {
    return a;
  }
}

f3(); // 2

function f4(shouldInitialize: boolean) {
  if (shouldInitialize) {
    var x = 10; // <- 여기에 선언되었지만
  }
  return x;
}

f4(true); // 10
f4(false); // <- 여기서 x가 반환되었음

// var는 함수, 모듈, 네임 스페이스 또는 전역 범위 어디에서나 선언에 접근 할 수 있다.
// 이러한 범위 지정 규칙은 여러 유형의 실수를 일으킬 수 있다.
// 동일한 변수를 여러번 선언하는 것이 오류가 아니라는게 문제다.

function sumMatrix(matrix: number[][]) {
  var sum = 0;
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];
    for (var i = 0; i < currentRow.length; i++) {
      // i가 덮어씌워진다.
      sum += currentRow[i];
    }
  }
  return sum; // 내가 의도한 값이 아니야!
}

for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100 * i);
}

// 위 제어문의 결과는 10, 10, 10, 10, 10, 10, 10 10, 10, 10
// for 루프 실행이 중지 될때 의 값을 가지고 한다 따라서 i = 10

// IIFE를 써서 각 반복마다 i를 캡처해서 해결
// 이상하지만 이전에는 실제로 많이 사용했던 패턴이다.
for (var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 100 * i);
  })(i);
}

// 2) let
// 위의 서술된 var의 문제를 해결하기 위해 let이 도입되었다.
let hello = "hello!";

// 주요 차이점은 구문이 아니라 의미론에 있다.

// 블록 범위 지정
// let을 사용ㅎ다면 lexical-scoping 또는 block-scoping 이라고 하는 것을 사용한다.
// 블록 범위 변수는 가장 가까운 블록 변수만 접근이 가능하다.
function f5(input: boolean) {
  let a = 100;

  if (input) {
    // 여전히 'a'를 참조 할 수 있다.
    let b = a + 1;
    return b;
  }

  // 여기서는 'b에' 접근 할 수 없다.
  return b; // Error!
}

try {
  throw "oh no!";
} catch (e) {
  console.log("Oh well");
}

// console.log(e); // Error: 'e'는 존재하지 않는다.

// 참고로 블록 범위 변수를 선언하기 전에 '캡처' 할 수 있다. 유일한 문제는 선언하기 전에 해당 함수를 호출하는 것이 불법이라는 것이다. ES2015를 대상으로 하는 경우 최신 런타임은 오류를 발생시킨다. 하지만 현재 TypeScript는 허용함

function foo() {
  // 'a' 캡처 ok
  return captureA;
}

foo();
let captureA; // 선언이 나중에 쓰여졌지만 에러 아님

// 재선언 및 그림자
function f6(x) {
  var x;
  var x;

  if (true) {
    var x;
  }
}

// 위의 예에서 모든 선언은 실제로 같은 x를 참조하며 이는 완벽하게 유효하다. 이것은 종종 버그의 원인이 되는데 let은 위와 같은 선언을 용서하지 않는다.

let x = 10;
let x = 20; // 같은 스코프에 x를 재선언 할 수 없음!

function f7(condition, x) {
  if (condition) {
    let x = 100; // 파라미터 x와는 다르다.
    return x;
  }

  return x;
}

// let으로 하면 예상되로 동작!
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100 * i);
}

// 3) const
// let과 비슷하지만 일단 바인딩 되면 값을 변경할 수 없다.
// const가 참조하는 값이 '불변'이라는 생각과 혼동되어서는 안된다.

const numLivesForCat = 9;
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat
};

// Error
// kitty = {
//   name: "Danielle",
//   numLives: numLivesForCat
// };

// all 'okay'
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;

// 4) let vs const
// 최소 권한 원칙을 적용하려면 수정하려는 선언 이외의 모든 선언은 const로 사용한다.
// const는 떼이터 흐름을 추론 할때 코드를 보다 예측 가능하게 사용 한다.

// 5) Destructuring

// 배열 구조 분해 (튜플도 동일)
let input = [1, 2];
let [first, second] = input;
console.log(first); // 1
console.log(second); // 2

// swap
[first, second] = [second, first];

// 매개변수에도...
function f8([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}

f8([1, 2]);

// rest
let [one, ...rest] = [1, 2, 3, 4];
console.log(one); // 1
console.log(rest); // [2, 3, 4];

// 자바스크립니까
let [onlyOne] = [1, 2, 3, 4];
console.log(onlyOne); // 1

let [, s, , fourth] = [1, 2, 3, 4];
console.log(s); // 2
console.log(fourth); // 4

// 객체 구조 분해
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};

let { a, b } = o;

// 선언 없이
({ a, b } = { a: "baz", b: 101 });

// rest
let { a, ...passthrough } = o;

// 이름 바꾸기
// a as newName1 이렇게 읽으면 됨
let { a: newName1, b: newName2 } = o;

// 구조 분해 하는 경우에도 타입을 써줘야함
let { a, b }: { a: string; b: number } = o;

// 기본 값 지정
function keepWholeObject(wholeObject: { a: string; b?: number }) {
  let { a, b = 1001 } = wholeObject; // b에 기본값 지정 b가 선택적 이니까
}

type C = { a: string; b?: number };
function f9({ a, b }: C): void {}

// 기본값 지정
function f10({ a = "", b = 0 } = {}): void {
  // ...
}

f10({ a: "yes" }); // ok, default b = 0
f10(); // ok, default to { a: "" }, which then defaults b = 0
f10({}); // error, 'a' is required if you supply an argument

// 객체의 인스턴스를 펼치면 메소드가 손실된다.
class C {
  p = 12;
  m() {}
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
