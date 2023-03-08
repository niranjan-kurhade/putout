# @putout/plugin-maybe [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-maybe.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-maybe"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with `maybe` monad. Depends on [`@putout/declare`](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare#readme).

## Install

```
npm i @putout/plugin-maybe -D
```

## Rules

```json
{
    "rules": {
        "maybe/array": "on",
        "maybe/empty-array": "on",
        "maybe/fn": "on",
        "maybe/noop": "on"
    }
}
```

## array

### ❌ Example of incorrect code

```js
const array = isArray(a) ? a : [a];
```

### ✅ Example of correct code

```js
const maybeArray = (a) => isArray(a) ? a : [a];
const array = maybeArray(a);
```

## empty-array

### ❌ Example of incorrect code

```js
const array = !a ? [] : a;
```

### ✅ Example of correct code

```js
const maybeArray = (a) => !a ? [] : a;
const array = maybeEmptyArray(a);
```

## fn

### ❌ Example of incorrect code

```js
const fn = isFn(a) ? a : () => {};
```

### ✅ Example of correct code

```js
const noop = () => {};
const maybeFn = isFn(a) ? a : noop;
const fn = maybeFn(a);
```

## noop

### ❌ Example of incorrect code

```js
const fn = f || (() => {});
```

### ✅ Example of correct code

```js
const noop = () => {};
const fn = fn || noop;
```

## License

MIT