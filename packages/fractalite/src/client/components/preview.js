import resize from 'vue-resize-directive';

let statsTimer = null;

export default {
  template: '#preview',
  props: ['src', 'srcdoc'],
  data() {
    return {
      loaded: false,
      previewWidth: 0,
      previewHeight: 0,
      statsVisible: false
    };
  },
  computed: {
    split() {
      return this.$store.state.preview.split || [100, 0];
    }
  },
  directives: { resize },
  methods: {
    reload: debounce(
      function() {
        this.loaded = false;
        this.$refs.window.contentWindow.location.reload();
      },
      500,
      true
    ),
    onPreviewResize(el) {
      this.previewWidth = el.clientWidth;
      this.previewHeight = el.clientHeight;
      this.statsVisible = true;
      if (statsTimer) {
        clearTimeout(statsTimer);
      }
      statsTimer = setTimeout(() => {
        this.statsVisible = false;
      }, 1000);
    },
    onDrawerResize(sizes) {
      this.$store.commit('setPreviewSplit', sizes);
    }
  },
  mounted() {
    this.loaded = false;
    this.previewWidth = this.$refs['preview-wrapper'].clientWidth;
    this.previewHeight = this.$refs['preview-wrapper'].clientHeight;
    this.$refs.window.addEventListener('load', () => {
      if (this.srcdoc) {
        this.loaded = true;
      }
    });
  },
  watch: {
    srcdoc() {
      this.loaded = false;
    },
    src() {
      this.loaded = false;
    }
  }
};

function debounce(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
