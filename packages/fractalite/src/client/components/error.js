export default {
  template: '#error',
  props: ['error'],
  computed: {
    name() {
      return this.error.name;
    },
    message() {
      return this.error.message;
    },
    stack() {
      return this.error.stack;
    }
  }
};
