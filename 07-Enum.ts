/* Enum */
// 명명된 상수 집합을 사용해보자.

// 숫자 열거형
enum Direction {
  Up = 1, // 이니셜라이저를 제공 해도 되고 안해도 됨 안하면 0
  Down,
  Left,
  Right
}

enum MessageResponse {
  No = 0,
  Yes = 1
}

function respond(recipient: string, message: MessageResponse): void {}

respond("Princess Caroline", MessageResponse.Yes);

// 문자열 열거형
// 문자열 열거형은 모든 값을 이니셜라이즈 해야한다.
enum DirectionString {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

// 가능하지만 권하지 않음
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES"
}

// enum의 member도 type이 된다.
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square, // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  radius: 100
};

// 엄격한 Enum
const enum Enum {
  A = 1,
  B = A * 2
}
