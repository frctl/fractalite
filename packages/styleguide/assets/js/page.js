import axios from 'axios';

export default {
  template: '#page',
  data() {
    return {
      content: null
    };
  },
  props: ['path'],
  sockets: {
    async updated() {
      await this.load();
    }
  },
  methods: {
    async load() {
      if (this.path) {
        try {
          const response = await axios.get(`/api/pages/${this.path}.json`);
          this.content = response.data.content;
        } catch (err) {
          //TODO: render errors
          console.log(err);
        }
      }
    }
  },
  async mounted() {
    this.load();
  },
  watch: {
    async path() {
      this.load();
    }
  }
};
