# Vue Reactivity System — from scratch

A minimal, from-scratch re-implementation of Vue 3's reactivity core in plain JavaScript. No build tools, no dependencies.

## What it is

Vue's reactivity system is the engine behind `ref`, `reactive`, `computed`, and `watchEffect`. When you change a piece of state, the UI updates automatically — this file shows exactly how that happens under the hood, stripped down to ~60 lines.

## Why implement it from scratch

Using Vue's built-in APIs is a black box. Building it yourself answers:

- How does Vue *know* which component to re-render when state changes?
- How does `computed` avoid recomputing when nothing changed?
- What is `activeEffect` and why does it exist?
- How do `track` and `trigger` connect reads to writes?

This is a learning exercise to build a precise mental model before working with Vue's actual internals.

## How it works

### Core idea

Three things work together:

```
reactive object (Proxy)
    GET → track()   — "who is reading me right now? subscribe them."
    SET → trigger() — "I changed. re-run everyone subscribed to me."

activeEffect        — global pointer to the currently-running effect
                      track() uses this to know *who* to subscribe

targetMap           — the subscription store
                      WeakMap<object, Map<key, Set<effectFn>>>
```

### Data structure

```
targetMap (WeakMap)
  └── state  →  depsMap (Map)
                  └── 'count'  →  dep (Set)
                                    └── effectFn1
                                    └── effectFn2
```

Every reactive object gets a map of its properties. Each property holds a set of effect functions that depend on it.

### Step-by-step flow

**Setup**
```js
const state = reactive({ count: 1 });
```
Wraps the object in a Proxy. No subscriptions yet.

**watchEffect runs**
```js
watchEffect(() => console.log(state.count));
```
1. `activeEffect = fn`
2. `fn()` runs — reads `state.count`
3. Proxy GET fires → `track(state, 'count')`
4. `track` sees `activeEffect` is not null → stores `fn` in `targetMap[state]['count']`
5. `activeEffect = null`

Now `fn` is subscribed to `state.count`.

**State changes**
```js
state.count = 5;
```
1. Proxy SET fires → `trigger(state, 'count')`
2. `trigger` finds `Set{ fn }` → calls `fn()`
3. `fn` re-runs automatically

**computed is lazy**
```js
const doubled = computed(() => state.count * 2);
```
- Getter is **not** called yet
- On first `doubled.value` read: `activeEffect` is set to computed's internal effect, getter runs, dependencies are tracked, result is cached
- On next `doubled.value` read: returns cached value (no recompute)
- When `state.count` changes: computed's internal effect runs → sets `dirty = true` → getter will recompute on next `.value` read

### watchEffect vs computed

| | `watchEffect` | `computed` |
|---|---|---|
| Runs | Immediately + on every change | Only when `.value` is read |
| Caching | None | Yes — dirty flag |
| Returns | Nothing | `.value` with result |
| Use for | Side effects (logging, DOM, API) | Derived data |

Both use the same `activeEffect → track → trigger` pipeline.

## Files

- `index.js` — full implementation + runnable example

## Run it

```bash
node index.js
```

Expected output:
```
[watchEffect] count is: 1
[watchEffect] count is: 5
[watchEffect] count is: 10
[computed] getter ran
20
20
[watchEffect] count is: 11
[computed] getter ran
22
```
