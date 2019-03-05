import eventBus from '../events';

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
          eventBus.$emit('loading.stop');
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
      this.loaded = false;
      await this.load();
    }
  }
};
