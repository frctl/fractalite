<template>
  <Split class="viewer" :gutter-size="5">
    <SplitArea :size="60">
      <tabs>
        <tab name="Preview" :selected="true" class="preview-pane">
          <iframe class="preview" :src="preview" width="100%" height="100%"></iframe>
        </tab>
        <tab name="HTML" class="code-pane">
          <codemirror ref="html" :value="html" :options="htmlOpts"></codemirror>
        </tab>
      </tabs>
    </SplitArea>
    <SplitArea :size="40">
      <Split direction="vertical" :gutter-size="5">
        <SplitArea :size="50">
          <tabs>
            <tab name="Context" :selected="true" class="json-pane">
              <vue-json-pretty :data="context"></vue-json-pretty>
            </tab>
            <tab name="View" class="code-pane">
              <codemirror ref="view" :value="view" :options="htmlOpts"></codemirror>
            </tab>
          </tabs>
        </SplitArea>
        <SplitArea :size="50">
          <tabs>
            <tab name="Component" class="json-pane" :selected="true">
              <vue-json-pretty :data="component" :deep="1"></vue-json-pretty>
            </tab>
            <tab name="Event Log" v-if="$store.state.ui.dev">
              <log-viewer></log-viewer>
            </tab>
          </tabs>
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
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';
import LogViewer from './LogViewer.vue';

export default {
  name: 'viewer',
  props: ['component'],
  components: { Highlight, VueJsonPretty, Tabs, Tab, LogViewer },
  data() {
    return {
      htmlOpts: {
        mode: 'htmlmixed',
        lineNumbers: true,
        readOnly: true,
        lineWrapping: true,
        autoRefresh: true
      }
    };
  },
  asyncComputed: {
    async html() {
      try {
        const response = await axios.get(`/render/${this.component.name}`, {
          responseType: 'text'
        });
        return response.data;
      } catch (err) {
        return 'Error rendering component preview.';
      }
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
    },
    view() {
      return this.component.view.contents;
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

.json-pane {
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: auto;

  .vjs__tree {
    font-size: 15px;
    line-height: 1.3;
    font-family: monospace;
  }

  .vjs__tree .vjs__value__string {
    color: rgb(170, 17, 17);
  }
}

.vue-codemirror,
.vue-codemirror .CodeMirror {
  height: 100%;
  font-size: 15px;
  line-height: 1.3;
  font-family: monospace;
}

.preview {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
