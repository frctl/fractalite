<template>
  <main class="viewer">
    <ul class="toolbar">
      <li class="toolbar__item" @click="selected = 'preview'" :class="{active:isSelected('preview')}">Preview</li>
      <li class="toolbar__item" @click="selected = 'html'" :class="{active:isSelected('html')}">HTML</li>
      <li class="toolbar__item" @click="selected = 'context'" :class="{active:isSelected('context')}">Context</li>
    </ul>
    <div  class="panel panel--preview" v-if="selected === 'preview'">
      <iframe class="preview" :src="preview" width="100%" height="100%"></iframe>
    </div>
    <div class="panel panel--html" v-else-if="selected === 'html'">
      <highlight :code="html" language="html"></highlight>
    </div>
    <div class="panel panel--context" v-else-if="selected === 'context'">
      <vue-json-pretty :data="context"></vue-json-pretty>
    </div>
  </main>
</template>

<script>
import { sortBy } from 'lodash';
import hljs from 'highlight.js';
import axios from 'axios';
import VueJsonPretty from 'vue-json-pretty';
import Highlight from 'vue-highlight-component';

export default {
  name: 'viewer',
  props: ['component'],
  components: { Highlight, VueJsonPretty },
  data() {
    return {
      selected: 'preview'
    };
  },
  asyncComputed: {
    async html() {
      const response = await axios.get(`/render/${this.component.name}`, {
        responseType: 'text'
      });
      return response.data;
    }
  },
  computed: {
    context() {
      const ctx = {};
      for (const variant of this.component.variants) {
        ctx[`@${this.component.name}/${variant.name}`] = variant.context;
      }
      return ctx;
    },
    preview() {
      if (this.component) {
        return `preview/${this.component.name}`;
      }
      return null;
    }
  },
  methods: {
    isSelected(name) {
      return name === this.selected;
    }
  }
};
</script>

<style lang="scss">
@import 'highlight.js/styles/github.css';

.viewer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 0 20px;
  list-style: none;
  display: flex;
  flex: none;
  background: #f4f4f4;
  border-bottom: 1px solid #ddd;
  justify-content: flex-end;

  &__item {
    user-select: none;
    color: #666;
    padding: 7px 2px 5px 2px;
    font-size: 13px;
    text-transform: uppercase;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    margin-left: 20px;
  }

  &__item.active {
    color: #222;
    border-bottom-color: #2ecc40;
  }

  &__item:hover {
    color: #222;
  }
}

.panel {
  flex: 1 1 auto;
  width: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  overflow: auto;

  &--html,
  &--context {
    padding: 10px;
  }

  &--context {
    line-height: 1.5;

    .vjs__tree .vjs__value__string {
      color: #d14;
    }

    .vjs__tree .vjs__tree__node {
      // color: #008080;
    }
  }
}

.preview {
  border: 0;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
}

.hljs {
  background: #fff;
  font-size: 16px;
  line-height: 1.4;
}
</style>
