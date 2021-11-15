import applyNodeProps from "./applyNodeProps";

export const componentPrefix = "v";
export const snapNodeMarker = "_snapNode";

export function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function createListener(obj) {
    const output = {};
    Object.keys(obj).forEach((eventName) => {
        output["on" + eventName] = obj[eventName];
    });
    return output;
}

export function findParentSnap(instance) {
    function re(instance) {
        if (instance._snapNode) {
            return instance;
        }
        if (instance.$parent) {
            return re(instance.$parent);
        }
        return {};
    }
    return re(instance.$parent);
}

export function findSnapNode(instance) {
    if (!instance) {
        return null;
    }
    if (instance.$options[snapNodeMarker]) {
        return instance.getNode();
    }
    if (instance.$children.length === 0) {
        return null;
    }
    return findSnapNode(instance.$children[0]);
}

export { applyNodeProps };
