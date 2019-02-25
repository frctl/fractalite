import { codemirror } from 'vue-codemirror';

import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/display/autorefresh';

const defaultOpts = {
  lineNumbers: true,
  readOnly: true,
  lineWrapping: true,
  autoRefresh: true
};

export default {
  template: `
    <div class="fr-source-code">
      <codemirror :value="value" :options="opts" />
    </div>
  `,
  props: ['options', 'value'],
  computed: {
    opts() {
      return {  ...defaultOpts, ...this.options }
    }
  },
  components: { codemirror }
};
