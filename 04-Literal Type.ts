// 타입스크립트는 아래의 const는 string이라고 하지 않음
const helloWorld = "Hello World!"; // "Hello World!" 라는 타입이다.

// let은 변할 수 있으므로 string
let hiWorld = "Hi World";

/* 문자열 리터럴 유형 */
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
    } else if (easing === "ease-out") {
    }
    // ...
  }
}

// 오버로드를 구분하기 위해 사용할 수 있다.
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
function createElement(tagName: string): Element {
  // ...
}

/* 숫자 리터럴 유형 */
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

// 일반적인 사용법
interface MapConfig {
  lng: number;
  lat: number;
  tileSie: 8 | 16 | 32;
}
