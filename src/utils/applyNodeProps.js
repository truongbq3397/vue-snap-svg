const propsToSkip = { key: true, style: true, elm: true, isRootInsert: true };

export default function applyNodeProps(
    vueComponent,
    props = {},
    oldProps = {}
) {
    const instance = vueComponent._snapNode;
    var updatedProps = {};
    var hasUpdates = false;
    for (let key in oldProps) {
        if (propsToSkip[key]) {
            continue;
        }
        var isEvent = key.slice(0, 2) === "on";
        var propChanged = oldProps[key] !== props[key];
        if (isEvent && propChanged) {
            var eventName = key.substr(2).toLowerCase();
            if (eventName.substr(0, 7) === "content") {
                eventName =
                    "content" +
                    eventName.substr(7, 1).toUpperCase() +
                    eventName.substr(8);
            }
            instance[`un${eventName}`](oldProps[key]);
        }
        // eslint-disable-next-line no-prototype-builtins
        var toRemove = !props.hasOwnProperty(key);
        if (toRemove) {
            instance.attr(key, undefined);
        }
    }
    for (let key in props) {
        if (propsToSkip[key]) {
            continue;
        }
        let isEvent = key.slice(0, 2) === "on";
        var toAdd = oldProps[key] !== props[key];
        if (isEvent && toAdd) {
            let eventName = key.substr(2).toLowerCase();
            if (eventName.substr(0, 7) === "content") {
                eventName =
                    "content" +
                    eventName.substr(7, 1).toUpperCase() +
                    eventName.substr(8);
            }
            if (props[key]) {
                instance[`un${eventName}`]();
                instance[`${eventName}`](($event) => {
                    props[key]($event, instance);
                });
            }
        }
        if (!isEvent && props[key] !== oldProps[key]) {
            hasUpdates = true;
            updatedProps[key] = props[key];
        }
    }

    if (hasUpdates) {
        instance.attr(updatedProps);
    }
}
