/* eslint array-callback-return:"off", no-labels: "off" */

export default {
  name: 'search',
  template: '#search',
  props: ['components'],
  data() {
    return {
      searchTerm: ''
    };
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
            if (component.aliases.length > 0) {
              aliasMatches = component.aliases
                .map(alias => {
                  const matches = fuzzysearch(this.term, alias);
                  if (matches) {
                    return highlight(alias, matches);
                  }
                })
                .filter(alias => alias);
            }

            if (labelMatches || aliasMatches.length > 0 || scenarios.length > 0) {
              return {
                scenarios: scenarios.length > 0 ? scenarios : component.scenarios,
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
  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = needle.charCodeAt(i);
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
  let highlighted = '';
  let matchesIndex = 0;
  let opened = false;
  const targetLen = target.length;
  for (let i = 0; i < targetLen; ++i) {
    const char = target[i];
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
    } else if (opened) {
      opened = false;
      highlighted += hClose;
    }
    highlighted += char;
  }
  return highlighted;
}
