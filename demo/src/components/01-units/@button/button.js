const buttons = document.querySelectorAll('.button');

function clickLogger(event) {
  console.log('button clicked!');
  event.preventDefault();
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', clickLogger);
}

// If using the styleguide bundler plugin with
// Hot Module Replacement (HMR) enabled, the code needs to
// handle cleaning up event listeners etc when the module
// contents are replaced. See https://parceljs.org/hmr.html
if (module.hot) {
  module.hot.dispose(function() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].removeEventListener('click', clickLogger);
    }
  });
}
