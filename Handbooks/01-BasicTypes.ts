// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = "blue";
color = "red";

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let setence: string = `Hello, my name is ${fullName}.

I' ll be ${age + 1} years old next month.`;

// Array
let list: number[] = [1, 2, 3];

// or
let list2: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ["hello", 10];

console.log(x[0].substring(1));
console.log(x[1].substring(1)); // Error
x[3] = "world"; // Error

enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;

console.log(c); // print "2"

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

let anyList: any[] = [1, true, "free"];
list[1] = 100;

// Void
function warnUser(): void {
  console.log("This is my warning message");
}

let unusable: void = undefined;
unusable = null; // Ok if `--strictNullCheckes` is not given

// Null, Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error("Something failed");
}

function infiniteLoop(): never {
  while (true) {}
}

declare function create(o: object | null): void;

create({ prop: 0 });
create(null);
create("string");
create(false);
create(undefined);

// Type Assertion
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue2: any = "this is a string";
let strLength2: number = (someValue as string).length;
