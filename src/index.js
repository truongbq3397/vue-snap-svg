import Snap from "snapsvg-cjs";
import Stage from "./components/Stage";
import SnapNode from "./components/SnapNode";
import { componentPrefix } from "./utils";

if (typeof window !== "undefined" && !window.Snap) {
    window.Snap = Snap;
}

const SNAP_NODES = [
    "Group",
    "Rect",
    "Circle",
    "Ellipse",
    "Line",
    "Image",
    "Text",
    "Path",
    "Polyline",
    "SVG"
];

const components = [
    {
        name: "Stage",
        component: Stage
    },
    ...SNAP_NODES.map((name) => ({
        name,
        component: SnapNode(name.toLowerCase())
    }))
];

const VueSnap = {
    install: (Vue, options) => {
        let prefixToUse = componentPrefix;
        if (options && options.prefix) {
            prefixToUse = options.prefix;
        }
        components.forEach((s) => {
            Vue.component(`${prefixToUse}${s.name}`, s.component);
        });
    }
};

export default VueSnap;
