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
          const [component, inspectorData] = await Promise.all([
            await this.$store.dispatch('fetchComponent', this.componentName),
            await this.$store.dispatch('fetchInspectorData', {
              component: this.componentName,
              scenario: this.scenarioName
            })
          ]);
          this.component = component;
          const scenario = this.component.scenarios.find(scenario => scenario.name === this.scenarioName);
          if (!scenario) {
            const scenario = this.component.scenarios[0];
            this.$router.push(`/inspect/${this.component.name}/${scenario.name}`);
            return;
          }
          this.scenario = scenario;
          this.panels = inspectorData.panels;
          this.preview = inspectorData.preview;
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
