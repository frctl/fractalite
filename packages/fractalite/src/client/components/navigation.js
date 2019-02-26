import axios from 'axios';

export default {
  name: 'navigation',
  template: '#navigation',
  props: {
    pages: Array,
    depth: {
      default: 1
    }
  },
  sockets: {
    async 'state.updated'(state) {
      if (this.depth === 1) {
        await this.update();
      }
    }
  },
  data() {
    return {
      items: [],
      open: []
    };
  },
  async mounted() {
    if (this.depth === 1) {
      await this.update();
    } else {
      this.items = this.pages;
    }
  },
  methods: {
    async update() {
      try {
        const response = await axios.get('/api/navigation.json');
        this.items = response.data.items;
      } catch (err) {
        this.$parent.$emit('error', err);
      }
    },
    toggleChildren(id) {
      this.$store.commit('toggleNavOpenId', id);
    },
    isOpen(id) {
      return this.$store.getters.hasNavOpenId(id);
    }
  },
  watch: {
    pages(pages) {
      this.items = pages;
    }
  }
};
