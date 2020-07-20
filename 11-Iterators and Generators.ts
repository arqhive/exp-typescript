// for .. of
// 객체의 속성 호출
let someArray = [1, "string", false];

for (let entry of someArray) {
  console.log(entry); // 1, 'string', false
}

// for .. in
// 객체의 키 호출
for (let key in someArray) {
  console.log(key); // 0, 1, 2
}

let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
  console.log(pet); // "species"
}

for (let pet of pets) {
  console.log(pet); // "Cat", "Dog", "Hamster"
}
