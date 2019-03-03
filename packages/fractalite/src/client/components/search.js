import axios from 'axios';

export default {
  name: 'search',
  template: '#search',
  sockets: {
    async 'state.updated'() {
      this.update();
    }
  },
  data() {
    return {
      opts: {},
      components: [],
      searchTerm: ''
    };
  },
  async mounted() {
    this.update();
  },
  computed: {
    isActive() {
      return this.term !== '';
    },
    term() {
      return this.searchTerm.trim().toLowerCase();
    },
    results() {
      if (this.isActive) {
        return this.components
          .map(component => {
            const scenarios = component.scenarios
              .map(scenario => {
                const matches = fuzzysearch(this.term, scenario.label.toLowerCase());
                if (matches) {
                  return {
                    ...scenario,
                    label: highlight(scenario.label, matches)
                  };
                }
              })
              .filter(scenario => scenario);

            const labelMatches = fuzzysearch(this.term, component.label.toLowerCase());

            let aliasMatches = [];
            if (component.aliases.length) {
              aliasMatches = component.aliases
                .map(alias => {
                  const matches = fuzzysearch(this.term, alias);
                  if (matches) {
                    return highlight(alias, matches);
                  }
                })
                .filter(alias => alias);
            }

            if (labelMatches || aliasMatches.length || scenarios.length) {
              return {
                scenarios: scenarios.length ? scenarios : component.scenarios,
                label: labelMatches ? highlight(component.label, labelMatches) : component.label,
                aliases: aliasMatches.join(', ')
              };
            }
          })
          .filter(component => component);
      }
      return [];
    }
  },
  methods: {
    async update() {
      try {
        const response = await axios.get('/api/search.json');
        this.components = response.data.components;
      } catch (err) {
        this.$parent.$emit('error', err);
      }
    },
    resetSearch() {
      this.searchTerm = '';
    }
  }
};

// Adapted from https://github.com/bevacqua/fuzzysearch/blob/master/index.js
function fuzzysearch(needle, haystack) {
  const hlen = haystack.length;
  const nlen = needle.length;
  const indexes = [];
  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    if (needle === haystack) {
      return Array.from({ length: needle.length }, (_, k) => k);
    }
    return false;
  }
  const pos = haystack.indexOf(needle);
  if (pos > -1) {
    return Array.from({ length: needle.length }, (_, k) => k + pos);
  }
  outer: for (var i = 0, j = 0; i < nlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        indexes.push(j - 1);
        continue outer;
      }
    }
    return false;
  }
  return indexes;
}

// Adapted from https://github.com/farzher/fuzzysort/blob/master/fuzzysort.js
function highlight(target, indexes, hOpen, hClose) {
  if (hOpen === undefined) hOpen = '<span class="highlight">';
  if (hClose === undefined) hClose = '</span>';
  var highlighted = '';
  var matchesIndex = 0;
  var opened = false;
  var targetLen = target.length;
  for (var i = 0; i < targetLen; ++i) {
    var char = target[i];
    if (indexes[matchesIndex] === i) {
      ++matchesIndex;
      if (!opened) {
        opened = true;
        highlighted += hOpen;
      }
      if (matchesIndex === indexes.length) {
        highlighted += char + hClose + target.substr(i + 1);
        break;
      }
    } else {
      if (opened) {
        opened = false;
        highlighted += hClose;
      }
    }
    highlighted += char;
  }
  return highlighted;
}
