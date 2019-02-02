import axios from 'axios';

export default {
  template: '#inspector',
  props: ['handle'],
  sockets: {
    async updated(state) {
      await this.load();
    }
  },
  data() {
    return {
      title: {},
      variant: {},
      actions: [],
      panels: [],
      currentTab: 0
    };
  },
  methods: {
    async load() {
      if (this.handle) {
        try {
          const response = await axios.get(`/api/inspect/${this.handle}.json`);
          Object.keys(response.data).forEach(key => {
            this[key] = response.data[key];
          });
        } catch (err) {
          //TODO: render errors
          console.log(err);
        }
      }
    },
    selectTab(i) {
      this.currentTab = i;
    }
  },
  async mounted() {
    this.load();
  },
  watch: {
    async handle() {
      this.load();
    }
  }
};
