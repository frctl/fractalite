export default {
  template: '#page',
  data() {
    return {
      page: null,
      content: null,
      loaded: false
    };
  },
  props: ['path'],
  methods: {
    async load() {
      if (this.path) {
        try {
          const { page, content } = await this.$store.dispatch('fetchPage', this.path);
          this.page = page;
          this.content = content;
          this.loaded = true;
        } catch (err) {
          this.$store.commit('setError', err);
        }
      }
    }
  },
  async mounted() {
    await this.load();
  },
  watch: {
    async path() {
      await this.load();
    }
  }
};
