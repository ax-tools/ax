# `@ax/state`

A different state management helper for [`zustand`](https://github.com/pmndrs/zustand) like libraries

```sh
yarn add -D -E @ax/state
# or
npm i -D -E @ax/state
# or
pnpm i -D -E @ax/state
```

## Introduction

This library allows you to use stores created by libraries like [`zustand`](https://github.com/pmndrs/zustand) with a reducer API. There is already a middleware created by `zustand` developers to do that, except this one allows reducers to be `async` functions.

## Concept

This library allows for state management with reducers with one important change - reducers can be async functions. There is a lot of discussion and general consensus on why reducers must not be "impure" (meaning - cant be async) functions, but this library tries to imagine "what if".

Here is a gist of how the reducer API for this library is different from redux's reducer API -

```ts
// Redux reducer
function reducer(state: S, action: A): S {
  // logic to calculate newState
  return newState;
}
```

```ts
// ax reducer
async function reducer(getState: () => S, action: A, dispatch: (action: A) => S): Promise<Partial<S> | undefined> {
  // logic to calculate newState lazily
  return newState; // this could be `Partial<S> | undefined`
}
```

To summarize -

1. Reducer is given `getState` function instead of a static reference to `state`.
2. Reducer can be `async` and can return `Partial<S> | undefined`, where `S` is your state's type.
3. `dispatch` is available within the reducer to allow for orchestration within the reducer

There are some bonuses if you use this library as well -

1. This is extremely lightweight for the scenarios it enables, especially when combined with `zustand`.
2. There are a few helpful utils -
3. `combine()` lets you split your reducer logic into smaller functions and then [`combine`](./src/lib/combine.ts) them later.
4. `tagDispatch()` lets you create a version of `dispatch` function that is pre-typed to accept only actions with a certain prefix. Example - `const authDispatch = tagDispatch(dispatch, 'auth')` will allow `authDispatch` to **only** dispatch actions of type `auth.<some-suffix>`. (see [`state.spec.ts`](./src/lib/state.spec.ts))

> Checkout the files in [`./src/test`]('./src/test') folder to find out more.

## Caveats (foot-guns)

1. Using a stale reference to `state` may lead to unexpected behavior like overwriting new state with old state
2. Recursively `dispatch`ing an action (or a sequence of actions) can lead to infinite loops. There is no in-built mechanism to detect it - neither is such a feature planned.
