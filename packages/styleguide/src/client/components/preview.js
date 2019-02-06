export default {
  template: '#preview',
  props: ['src', 'srcdoc'],
  methods: {
    reload: debounce(
      function() {
        console.log('reloading');
        this.$refs['window'].contentWindow.location.reload();
      },
      500,
      true
    )
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
