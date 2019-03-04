export default {
  name: 'navigation',
  template: '#navigation',
  props: {
    items: Array,
    depth: {
      default: 1
    }
  },
  async mounted() {
    if (this.depth === 1) {
      const expandItems = items => {
        items.forEach(item => {
          if (item.expanded === true) {
            this.toggleExpanded(item);
          }
          if (item.children) {
            expandItems(item.children);
          }
        });
      };
      expandItems(this.items);
    }
    this.$on('child-item-active', activeItem => {
      for (const item of this.items) {
        if (Array.isArray(item.children) && item.children.includes(activeItem)) {
          if (!this.isExpanded(item)) {
            this.toggleExpanded(item);
          }
          if (this.depth > 1) {
            this.$parent.$emit('child-item-active', item);
          }
          break;
        }
      }
    });
    for (const item of this.items) {
      if (item.url === this.$route.path) {
        this.$parent.$emit('child-item-active', item);
        break;
      }
    }
  },
  methods: {
    toggleExpanded(item) {
      if (item.collapsable) {
        this.$store.commit('toggleExpanded', item);
      }
    },
    isExpanded(item) {
      if (item.collapsable) {
        return this.$store.getters.isExpanded(item);
      }
      return true;
    }
  },
  watch: {
    $route(route) {
      for (const item of this.items) {
        if (item.url === route.path) {
          this.$parent.$emit('child-item-active', item);
          break;
        }
      }
    }
  }
};
