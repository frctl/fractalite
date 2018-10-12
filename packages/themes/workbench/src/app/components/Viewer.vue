<template>
  <Split class="viewer" :gutter-size="5">
    <SplitArea :size="60">
        <iframe class="preview" :src="preview" width="100%" height="100%"></iframe>
    </SplitArea>
    <SplitArea :size="40">
      <Split direction="vertical" :gutter-size="5">
        <SplitArea :size="50" class="code-pane">
          <highlight :code="html" language="html" v-if="html" class="code"></highlight>
        </SplitArea>
        <SplitArea :size="50" class="context-pane">
          <vue-json-pretty :data="context"></vue-json-pretty>
        </SplitArea>
      </Split>
    </SplitArea>
  </Split>
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
}

.code-pane {
  display: flex;
  flex-direction: column;
}

.code {
  height: 100%;
  .hljs {
    white-space: pre-wrap;
    height: 100%;
    background: #fff;
    font-size: 14px;
    line-height: 1.4;
    padding: 10px;
  }
}

.context-pane {
  display: flex;
  flex-direction: column;
  padding: 10px;

  .vjs__tree {
    font-size: 14px;
  }

  .vjs__tree .vjs__value__string {
    color: #d14;
  }
}

.preview {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
