module.exports = {
  init() {
    document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('click', () => {
        console.log('clicked');
      });
    });
  }
};
