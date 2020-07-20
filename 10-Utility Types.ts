/* Partial <T> */
// 모든 속성이 선택 사항 T로 설정된 유형을 구성한다.

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter"
};

// Todo interface의 부분을 제공했다.
const todo2 = updateTodo(todo1, {
  description: "throw out trash"
});

/* ReadOnly<T> */
// readonly로 설정된 속성을 가진 유형으로 정의
const todo3: Readonly<Todo> = {
  title: "Delete inactive users",
  description: "Not"
};

// todo3.title = "변경 불가";

/* Record<K, T> */
// T를 K의 프로퍼티로 사용한다.
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" }
};

/* Pick<T, K> */
// 속성 집한 선택
interface Todo2 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo4: TodoPreview = {
  title: "Clean Room",
  completed: false
};

/* Omit<T, K> */
// 선택한 속성을 제거하고 구성
type TodoPreview2 = Omit<Todo, "description">;

const todo5: TodoPreview2 = {
  title: "Clean room",
  completed: false
};

/* Exclude<T, U> */
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

/* Extract<T, U> */
type T02 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T12 = Extract<string | number | (() => void), Function>; // () => void

/* NonNullable<T> */
type T03 = NonNullable<string | number | undefined>; // string | number
type T13 = NonNullable<string[] | null | undefined>; // string[]

// 등등...
