module.exports = {
  buttons: {
    getRandomLabel() {
      const labels = ['Click here', 'DO NOT TOUCH', 'Press once'];
      return labels[Math.floor(Math.random() * labels.length)];
    }
  }
};
