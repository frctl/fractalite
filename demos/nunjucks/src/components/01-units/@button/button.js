/* global document */

const buttons = document.querySelectorAll('.button');

function clickLogger(event) {
  console.log('button clicked!');
  event.preventDefault();
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', clickLogger);
}

// If using the styleguide bundler plugin with
// Hot Module Replacement (HMR) enabled, the code needs to
// handle cleaning up event listeners etc when the module
// contents are replaced. See https://parceljs.org/hmr.html
if (module.hot) {
  module.hot.dispose(() => {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].removeEventListener('click', clickLogger);
    }
  });
}
