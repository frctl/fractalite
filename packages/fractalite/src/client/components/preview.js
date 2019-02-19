export default {
  template: '#preview',
  props: ['src', 'srcdoc'],
  methods: {
    reload: debounce(
      function() {
        this.$refs.window.contentWindow.location.reload();
      },
      500,
      true
    )
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
