import Vue from 'vue/dist/vue';

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
            this.expand(item);
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
    expand(item) {
      if (!this.isExpanded(item)) {
        this.$store.commit('toggleExpanded', item);
      }
    },
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
    },
    handleClick(item) {

      if (item.url && (!item.children || (item.children && !this.isExpanded(item)))) {
        if (item.url.match(/^(http(s)?|ftp):\/\//)) {
          this.toggleExpanded(item);
          window.open(item.url, '_blank');
        } else {
          this.$router.push(item.url);
        }
      }


      if (item.children) {
        this.toggleExpanded(item);
      }

      // if (item.children) {
      //   Vue.nextTick(() =>{
      //     this.toggleExpanded(item);
      //   });
      // }


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
