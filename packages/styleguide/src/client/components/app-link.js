export default {
  name: 'app-link',
  template: `<component v-bind="linkProps(to)"><slot></slot></component>`,
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (url.match(/^(http(s)?|ftp):\/\//)) {
        return { is: 'a', href: url, target: '_blank', rel: 'noopener' };
      }
      return { is: 'router-link', to: url };
    }
  }
};
