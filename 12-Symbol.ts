// 기본 데이터 유형 Symbol

// 생성자를 호출하여 값을 만든다.
let sym1 = Symbol();
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false

// 심볼을 객체 속성의 키로 사용할 수 있다.
let obj = {
  [sym1]: "value"
};

const getClassNameSymbol = Symbol();

class C {
  [getClassNameSymbol]() {
    return "C";
  }
}

let c = new C();
