import Vue from "vue";
import { applyNodeProps, createListener } from "../utils";
export default Vue.component("v-stage", {
    render: function (createElement) {
        return createElement("div", this.$slots.default);
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
        this._snapNode = new window.Snap(this.config.width, this.config.height);
    },
    mounted() {
        this.$el.innerHTML = "";
        this.uploadSnap();
    },
    updated() {
        this.uploadSnap();
    },
    beforeDestroy() {
        this._snapNode.remove();
    },
    methods: {
        getNode() {
            return this._snapNode;
        },
        getStage() {
            return this._snapNode;
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
});
