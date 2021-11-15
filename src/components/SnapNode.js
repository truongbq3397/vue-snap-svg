import {
    applyNodeProps,
    findParentSnap,
    createListener,
    snapNodeMarker
} from "../utils";

const CONTAINERS = {
    Group: true
};

export default function (nameNode) {
    return {
        // Mark it to detect whether an Vue instance is SnapNode or not later
        [snapNodeMarker]: true,

        render(createElement) {
            // containers should be able to draw children
            const isContainer = CONTAINERS[nameNode];
            if (isContainer) {
                return createElement("template", this.$slots.default);
            }
            // other elements are not containers
            return null;
        },
        watch: {
            config: {
                handler() {
                    this.uploadSnap();
                },
                deep: true
            }
        },
        props: {
            config: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        created() {
            this.initSnap();
        },
        mounted() {
            const parentVueInstance = findParentSnap(this);
            const parentSnapNode = parentVueInstance._snapNode;
            parentSnapNode.add(this._snapNode);
        },
        updated() {
            this.uploadSnap();
        },
        destroyed() {
            this._snapNode.remove();
        },
        methods: {
            getNode() {
                return this._snapNode;
            },
            getStage() {
                return this._snapNode;
            },
            initSnap() {
                const parentVueInstance = findParentSnap(this);
                const parentSnapNode = parentVueInstance._snapNode;
                const NodeClass = parentSnapNode[nameNode];
                if (!NodeClass) {
                    console.error("vue-snap error: Can not find node " + nameNode);
                    return;
                }
                this._snapNode = parentSnapNode[nameNode]();
                this._snapNode.VueComponent = this;
                this.uploadSnap();
            },
            uploadSnap() {
                const oldProps = this.oldProps || {};
                const props = {
                    ...this.$attrs,
                    ...this.config,
                    ...createListener(this.$listeners)
                };
                applyNodeProps(this, props, oldProps);
                this.oldProps = props;
            }
        }
    };
}
