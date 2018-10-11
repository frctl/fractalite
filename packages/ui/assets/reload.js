function refreshCSS(path) {
  var sheets = [].slice.call(document.getElementsByTagName('link'));
  var head = document.getElementsByTagName('head')[0];
  for (var i = 0; i < sheets.length; ++i) {
    var elem = sheets[i];
    var rel = elem.rel;
    if (
      (elem.href && typeof rel != 'string') ||
      rel.length == 0 ||
      rel.toLowerCase() == 'stylesheet'
    ) {
      if (elem.href.indexOf(path) !== -1) {
        head.removeChild(elem);
        var url = elem.href.replace(/(&|\?)_cachebust=\d+/, '');
        elem.href =
          url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cachebust=' + new Date().valueOf();
        head.appendChild(elem);
      }
    }
  }
}

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

var socket = io();
var reload = debounce(state => window.location.reload(), 250, true);
socket.on('state_updated', reload);
socket.on('asset_updated', function(path) {
  if (path.indexOf('.css') === -1) {
    reload();
  } else {
    refreshCSS(path);
  }
});
