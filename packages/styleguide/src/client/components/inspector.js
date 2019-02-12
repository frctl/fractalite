/* global document */

import axios from 'axios';
import Preview from './preview';

const supportsSrcdoc = Boolean('srcdoc' in document.createElement('iframe'));

export default {
  template: '#inspector',
  props: ['handle'],
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
      variant: null,
      preview: null,
      panels: [],
      currentTab: 0,
      loaded: false
    };
  },
  methods: {
    async load() {
      if (this.handle) {
        try {
          const response = await axios.get(`/api/inspect/${this.handle}.json`);
          if (!response.data.variant) {
            const variant = response.data.component.variants[0];
            this.$router.push(`/inspect/${variant.handle}`);
            return;
          }
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
  computed: {
    panel() {
      return {
        template: '<div>hello</div>'
        // Methods: this.$options.methods
      };
    }
  },
  async mounted() {
    await this.load();
  },
  watch: {
    async handle() {
      await this.load();
    }
  }
};
