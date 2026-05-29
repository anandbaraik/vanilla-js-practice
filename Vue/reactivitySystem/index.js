const targetMap = new WeakMap();
let activeEffect = null;

// Subscribes the currently-running effect to target[key].
// Called on every reactive GET. Skipped when no effect is active.
function track(target, key) {
    if (!activeEffect) return;

    let depsMap = targetMap.get(target);
    if (!depsMap) targetMap.set(target, (depsMap = new Map()));

    let dep = depsMap.get(key);
    if (!dep) depsMap.set(key, (dep = new Set()));

    dep.add(activeEffect);
}

// Re-runs every effect subscribed to target[key].
// Called on every reactive SET to propagate the change.
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    const dep = depsMap?.get(key);
    dep?.forEach((effect) => effect());
}

// Wraps obj in a Proxy so every GET calls track() and every SET calls trigger().
// This makes reads subscription-aware and writes notification-aware.
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key) {
            track(target, key);
            return target[key];
        },
        set(target, key, value) {
            target[key] = value;
            trigger(target, key);
            return true;
        }
    });
}

// Returns a lazy, cached derived value.
// The getter only re-runs when a dependency changed since the last read (dirty=true).
// An internal effect registered via track() marks dirty=true on change — no eager recompute.
function computed(getter) {
    let value;
    let dirty = true;

    const effect = () => { dirty = true; };

    return {
        get value() {
            if (dirty) {
                const prev = activeEffect;
                activeEffect = effect; // arm tracking so getter's reads subscribe `effect`
                value = getter();
                activeEffect = prev;
                dirty = false;
            }
            return value;
        }
    };
}

// Runs fn immediately and re-runs it automatically whenever a reactive dependency changes.
// Sets activeEffect before calling fn so track() can register fn as a subscriber.
// Push-based: runs eagerly on every change, unlike computed which is pull-based.
function watchEffect(fn) {
    activeEffect = fn;
    fn();
    activeEffect = null;
}

// ─── Example ─────────────────────────────────────────────────────────────────

const state = reactive({ count: 1 });

watchEffect(() => {
    console.log('[watchEffect] count is:', state.count);
});
// → [watchEffect] count is: 1

state.count = 5;  // → [watchEffect] count is: 5
state.count = 10; // → [watchEffect] count is: 10

const doubled = computed(() => {
    console.log('[computed] getter ran');
    return state.count * 2;
});

console.log(doubled.value); // getter ran → 20
console.log(doubled.value); // cached     → 20

state.count++; // → [watchEffect] count is: 11, computed marked dirty

console.log(doubled.value); // getter ran → 22
