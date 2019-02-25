import VueJsonPretty from 'vue-json-pretty';

export default {
  template: `
    <div class="fr-json-explorer">
      <vue-json-pretty :data="data" class="fr-json-explorer__tree" />
    </div>
  `,
  props: ['data'],
  components: {
    VueJsonPretty
  }
};
