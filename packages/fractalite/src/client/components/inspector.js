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
          const [component, inspector] = await Promise.all([
            await axios.get(`/api/components/${this.componentName}.json`),
            await axios.get(`/api/inspect/${this.componentName}/${this.scenarioName}.json`)
          ]);
          this.component = component.data;
          const scenario = this.component.scenarios.find(scenario => scenario.name === this.scenarioName);
          if (!scenario) {
            const scenario = this.component.scenarios[0];
            this.$router.push(`/inspect/${this.component.name}/${scenario.name}`);
            return;
          }
          this.scenario = scenario;
          this.panels = inspector.data.panels;
          this.preview = inspector.data.preview;
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
