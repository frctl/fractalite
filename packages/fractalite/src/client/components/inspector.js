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
        try {
          this.component = await this.$store.dispatch('fetchComponent', this.componentName);
          const inspector = await this.$store.dispatch('fetchInspectorData', {
            component: this.componentName,
            scenario: this.scenarioName
          });
          const scenario = this.component.scenarios.find(scenario => scenario.name === this.scenarioName);
          if (!scenario) {
            const scenario = this.component.scenarios[0];
            this.$router.push(`/inspect/${this.component.name}/${scenario.name}`);
            return;
          }
          this.scenario = scenario;
          this.panels = inspector.panels;
          this.preview = inspector.preview;
          this.loaded = true;
        } catch (err) {
          this.$store.commit('setError', err);
        }
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
