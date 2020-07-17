/* Functions */

// 기본 함수 생성 방법
// 1. 명명 방식
function add(x: number, y: number) {
  return x + y;
}

// 2. 익명 함수
// 함수 타입 작성법 (함수 타입을 작성하지 않아도 우측에 작성되 있으면 알아서 추론함)
let myAdd: (x: number, y: number) => number = function(x: number, y: number) {
  return x + y;
};

// 변수 캡처
let z = 100;

function addToZ(x, y) {
  return x + y + z;
}

// 옵션 및 기본 매개변수
function buildName(firstName: string = "Smith", lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}

let result1 = buildName("Bob"); // works correctly now
// let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams"); // ah, just right

function restCheck(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
    // return function() {
    return () => {
      // 화살표 함수로 바인딩 할 수 있음
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      // 이 this는 createCardPicker의 this임
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  }
};

let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker(); // Error
// console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// 오버로드
let suits = ["hearts", "spades", "clubs", "diamonds"];

// 오버로드 한다.
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
// 이 반환 유형을 어떻게 설명할 것인가.
function pickCard(x): any {
  if (typeof x === "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x === "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 }
];
let pickedCard1 = myDeck[pickCard(myDeck)];
let pickedCard2 = pickCard(15);
