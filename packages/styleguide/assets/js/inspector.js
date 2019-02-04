import axios from 'axios';

const supportsSrcdoc = !!('srcdoc' in document.createElement('iframe'));

export default {
  template: '#inspector',
  props: ['handle'],
  sockets: {
    async updated(state) {
      const previewSrc = this.preview;
      await this.load();
      if (supportsSrcdoc && previewSrc === this.preview) {
        // refresh iframe in case assets have changed
        this.reloadPreview();
      }
    }
  },
  data() {
    return {
      title: null,
      variant: {},
      preview: null,
      actions: [],
      panels: [],
      currentTab: 0,
      loaded: false
    };
  },
  methods: {
    reloadPreview: debounce(
      function() {
        this.$refs['preview'].contentWindow.location.reload();
      },
      500,
      true
    ),
    async load() {
      if (this.handle) {
        try {
          const response = await axios.get(`/api/inspect/${this.handle}.json`);
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
    async handle() {
      await this.load();
    }
  }
};

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
