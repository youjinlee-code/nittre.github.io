---
date: "2023-06-26"
title: "[타입스크립트] strictNullChecks 옵션 꼭 켜야할까?"
categories: ["Typescript"]
summary:
---

## strictNullChecks 옵션

`strictNullChecks` 옵션은 타입스크립트에서 null 또는 undefined를 엄격하게 제한하는 옵션이다. (왜 이름에 undefined는 포함이 안되어있을까? 🤔)

`strictNullChecks` 옵션을 true로 설정하게 되면, **변수에 암시적으로 undefined 또는 null이 입력될 가능성이 있는 경우** 컴파일 에러를 낸다.

<br/>

공식문서의 예제를 보자.

```js
declare const loggedInUsername: string;

const users = [
  { name: "Oby", age: 12 },
  { name: "Heera", age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser.age);
```

`loggedInUser` 함수는 `users` 배열을 순회하며 요소의 `name` 속성이 `loggedInUsername` 변수와 같은 경우 해당 요소를 반환한다. 그리고 반환된 값은 `loggedInUser` 변수에 할당되며, 콘솔에 출력한다.

여기서 중요한 것은 마지막 줄이다. 실제로 해당 코드를 컴파일하면 에러가 발생한다.

```js
console.log(loggedInUser.age) // semantic error TS2532: Object is possibly 'undefined'.
```

Object is possibly 'undefined', 즉 객체가 잠재적으로 "undefined"가 될 수 있다는 것을 의미한다.

<br/>

이렇게, `strictNullChecks` 옵션을 켜두면 **undefined 또는 null 값이 예기치 않게 변수에 할당되는 문제**를 막을 수 있다.

## strictNullChecks 옵션의 이점

chat gpt는 이렇게 말해주고 있다.

> **strictNullChecks 옵션을 켜면 다음과 같은 이점이 있습니다:**
>
> - 변수를 선언할 때 null 및 undefined를 명시적으로 허용해야 합니다. 이를 통해 **의도하지 않은 null 또는 undefined 값을 사용하는 버그를 방지할 수 있습니다.**
>
> - 옵셔널한 프로퍼티(?를 사용한 프로퍼티)나 선택적 매개변수를 사용할 때, 해당 값이 null 또는 undefined일 수 있다는 것을 명시적으로 표현해야 합니다.
>
> - 타입 가드나 타입 단언을 사용하여 **null 및 undefined 값의 존재 여부를 확인**하고, 안전하게 사용할 수 있습니다.
>
> - 컴파일러가 null 및 undefined 값을 엄격하게 추론하여 **타입 오류를 빠르게 감지**할 수 있습니다.
>
> 이와 같이 strictNullChecks 옵션을 켜면 코드의 안정성과 신뢰성을 향상시킬 수 있습니다.

정리하면, strictNullChecks 옵션을 사용하면

- 변수를 선언할 때 null, undefined를 명시적으로 허용해야 하기 때문에, 의도치 않게 null, undefined 값이 사용되어 버그가 발생하는 것을 방지할 수 있다.
- 타입스크립트의 타입 단언을 통해 null, undefined가 잠재적으로 사용될 수 있음을 확인할 수 있다.

## References

- [https://www.typescriptlang.org/tsconfig#strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)
- [https://chat.openai.com/](https://chat.openai.com/)
