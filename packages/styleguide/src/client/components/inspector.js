/* global document */

import axios from 'axios';
import Preview from './preview';

const supportsSrcdoc = Boolean('srcdoc' in document.createElement('iframe'));

export default {
  template: '#inspector',
  props: ['componentName', 'contextName'],
  sockets: {
    async updated(state) {
      const previewSrc = this.preview;
      await this.load();
      if (supportsSrcdoc && previewSrc === this.preview) {
        this.$refs.preview.reload(); // Refresh iframe in case assets have changed
      }
    }
  },
  components: { Preview },
  data() {
    return {
      component: null,
      context: null,
      preview: null,
      panels: [],
      currentTab: 0,
      loaded: false
    };
  },
  methods: {
    async load() {
      if (this.componentName) {
        try {
          if (!this.contextName) {
            const response = await axios.get(`/api/components/${this.componentName}.json`);
            const component = response.data;
            const context = component.contexts[0];
            this.$router.push(`/inspect/${component.name}/${context.name}`);
            return;
          }

          const response = await axios.get(`/api/inspect/${this.componentName}/${this.contextName}.json`);
          Object.keys(response.data).forEach(key => {
            this[key] = response.data[key];
          });
          this.loaded = true;
          this.error = null;
        } catch (err) {
          this.$parent.$emit('error', err);
        }
      }
    },
    selectTab(i) {
      this.currentTab = i;
    }
  },
  async mounted() {
    await this.load();
  },
  watch: {
    async componentName() {
      await this.load();
    },
    async contextName() {
      await this.load();
    }
  }
};
