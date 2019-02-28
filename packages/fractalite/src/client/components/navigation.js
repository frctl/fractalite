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
      opts: {},
      items: [],
      open: []
    };
  },
  async mounted() {
    if (this.depth === 1) {
      await this.update();
      const expandItems = items => {
        items.forEach(item => {
          if (item.expanded === true) {
            this.toggleChildren(item);
          }
          if (item.children) {
            expandItems(item.children);
          }
        });
      };
      expandItems(this.items);
    } else {
      this.items = this.pages;
    }
  },
  methods: {
    async update() {
      try {
        const response = await axios.get('/api/navigation.json');
        this.items = response.data.items;
        this.opts = response.data.opts;
      } catch (err) {
        this.$parent.$emit('error', err);
      }
    },
    toggleChildren(item) {
      if (item.collapsable) {
        this.$store.commit('toggleNavOpenId', item.id);
      }
    },
    isOpen(item) {
      if (item.collapsable) {
        return this.$store.getters.hasNavOpenId(item.id);
      }
      return true;
    }
  },
  watch: {
    pages(pages) {
      this.items = pages;
    }
  }
};
