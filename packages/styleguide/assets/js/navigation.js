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
    async updated(state) {
      if (this.depth === 1) {
        await this.update();
      }
    }
  },
  data() {
    return {
      items: []
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
        //TODO: render errors
        console.log(err);
      }
    }
  },
  watch: {
    pages(pages) {
      this.items = pages;
    }
  }
};
