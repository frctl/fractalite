import axios from 'axios';
import Preview from './preview';

export default {
  template: '#inspector',
  props: ['componentName', 'scenarioName'],
  components: { Preview },
  sockets: {
    async 'state.updated'() {
      await this.load();
    },
    refresh() {
      this.$refs.preview.reload();
    }
  },
  data() {
    return {
      component: null,
      scenario: null,
      preview: null,
      panels: [],
      currentTab: 0,
      loaded: false
    };
  },
  methods: {
    async load() {
      if (this.componentName) {
        this.$parent.$emit('loading', true);
        try {
          if (!this.scenarioName) {
            const response = await axios.get(`/api/components/${this.componentName}.json`);
            const component = response.data;
            const scenario = component.scenarios[0];
            this.$router.push(`/inspect/${component.name}/${scenario.name}`);
            return;
          }
          const response = await axios.get(`/api/inspect/${this.componentName}/${this.scenarioName}.json`);
          Object.keys(response.data).forEach(key => {
            this[key] = response.data[key];
          });
          this.loaded = true;
          this.error = null;
        } catch (err) {
          this.$parent.$emit('error', err);
        }
        this.$parent.$emit('loading', false);
      }
    },
    selectTab(i) {
      this.currentTab = i;
    }
  },
  async mounted() {
    await this.load();
  },
  watch: {
    async componentName() {
      await this.load();
    },
    async scenarioName() {
      await this.load();
    }
  }
};
