import resize from 'vue-resize-directive';

export default {
  template: '#preview',
  props: ['src', 'srcdoc'],
  data() {
    return {
      previewWidth: 0,
      previewHeight: 0
    };
  },
  methods: {
    reload: debounce(
      function() {
        this.$refs.window.contentWindow.location.reload();
      },
      500,
      true
    )
  },
  directives: { resize },
  methods: {
    onPreviewResize(el) {
      this.previewWidth = el.clientWidth;
      this.previewHeight = el.clientHeight;
    }
  },
  mounted() {
    this.previewWidth = this.$refs['preview-wrapper'].clientWidth;
    this.previewHeight = this.$refs['preview-wrapper'].clientHeight;
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
