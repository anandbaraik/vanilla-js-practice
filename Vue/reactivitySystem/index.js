const targetMap = new WeakMap();
let activeEffect = null;

//track dependencies
function track(target, key) {
    if(!activeEffect) return;

    let depsMap = targetMap.get(target);

    if(!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }

    let dep = depsMap.get(key);

    if(!dep) {
        depsMap.set(key, (dep = new Set()));
    }

    dep.add(activeEffect);
}

// trigger effects
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    const dep = depsMap?.get(key);

    dep?.forEach((effect) => effect());
}

// reactive proxy
function reactive (obj) {
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

// computed with caching
function computed (getter) {
    let value;
    let dirty = true;

    const effect = () => {
        dirty = true;
    }

    return {
        get value () {
            if(dirty) {
                const prev = activeEffect;
                activeEffect = effect;

                value = getter();

                activeEffect = prev;
                dirty = false;
            }
            return value;
        }
    }
}

// Example

const state = reactive({count: 1});

const doubled = computed(() => {
    console.log("computed ran");
    return state.count * 2;
});

console.log(doubled.value); //computed ran -> 2
console.log(doubled.value) //cached -> 2

state.count++;

console.log(doubled.value); //computed ran -> 4