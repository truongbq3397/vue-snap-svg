# Vue Snap [![Version](https://img.shields.io/npm/v/vue-snap-svg.svg)](https://www.npmjs.com/package/vue-snap-svg) [![License](https://img.shields.io/npm/l/vue-snap-svg.svg)](https://www.npmjs.com/package/vue-snap-svg)

![VueSnap Logo](https://raw.githubusercontent.com/truongbq3397/vue-snap-svg/master/vue-snapsvg.svg)

Vue Snap is a JavaScript library for drawing complex svg graphics using Vue.

It provides declarative and reactive bindings to the [Snap Framework](http://snapsvg.io/).

All `vue-snap-svg` components correspond to `Snap` components of the same name with the prefix 'v-'. All the parameters available for `Snap` objects can add as `config` in the prop for corresponding `vue-snap-svg` components.

Core shapes are: `v-rect`, `v-circle`, `v-ellipse`, `v-line`, `v-image`, `v-text`, `v-path`, `v-polyline`, `v-svg`.
Also you can create custom shape.

To get more info about `Snap` you can read [Snap Overview](http://snapsvg.io/docs/).

## Quick Start

[Vue.js](https://vuejs.org) version 2.4+ is required.

### 1 Install via npm

```npm
npm i vue-snap-svg
```

### 2 Import and use VueSnapSVG

```javascript
import Vue from "vue";
import VueSnapSVG from "vue-snap-svg";
Vue.use(VueSnapSVG);
```

### 3 Reference in your component templates

```html
<template>
  <v-stage :config="configSnap">
    <v-circle :config="configCircle"></v-circle>
  </v-stage>
</template>
```

```javascript
<script>
export default {
  data() {
    return {
      configSnap: {
        width: 200,
        height: 200
      },
      configCircle: {
        cx: 100,
        cy: 50,
        r: 40,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      }
    };
  }
};
</script>
```

# Core API

## Getting reference to Snap objects

You can use `ref` feature from `vue`.

```html
<template>
  <v-stage ref="stage" :config="configSnap">
    <v-circle ref="circle" :config="configCircle"></v-circle>
  </v-stage>
</template>

<script>
  export default {
    data() {
      return {
        configSnap: {
          width: 200,
          height: 200,
        },
        configCircle: {
          cx: 100,
          cy: 50,
          r: 40,
          fill: "red",
          stroke: "black",
          strokeWidth: 4,
        },
      };
    },
    mounted() {
      const stage = this.$refs.stage.getNode();
      const circle = this.$refs.circle.getNode();
    },
  };
</script>
```

## Configurable prefix

By default `vue-snap-svg` is using `v-` prefix for all components.

You can use your own prefix if default one conflicts with some other libs or your components.

```javascript
import Vue from 'vue';
import VueSnapSVG from 'vue-snap-svg'
Vue.use(VueSnapSVG, { prefix: 'Snap'});
// in template:
<snap-stage ref="stage" :config="stage">
```

## Change log

The change log can be found on the [Releases page](https://github.com/truongbq3397/vue-snap-svg/releases).
