import Preview from './preview';
import eventBus from '../events';

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
      scenario: {},
      preview: '',
      panels: [],
      currentTab: 0,
      loaded: false
    };
  },
  computed: {
    split() {
      return this.$store.state.inspector.split;
    }
  },
  methods: {
    async load() {
      this.loaded = false;
      this.preview = '';
      this.scenario = {};
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
          eventBus.$emit('loading.stop');
        } catch (err) {
          this.$store.commit('setError', err);
        }
      }
    },
    selectTab(i) {
      this.currentTab = i;
    },
    onDrawerResize(sizes) {
      this.$store.commit('setInspectorSplit', sizes);
    }
  },
  async mounted() {
    await this.load();
  },
  watch: {
    componentName() {
      return this.load();
    },
    scenarioName() {
      return this.load();
    }
  }
};
