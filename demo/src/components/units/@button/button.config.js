const data = require('%/shared');

module.exports = {
  preview: {
    content: `
      {% for variant in variants %}
      <div style="margin-bottom: 10px;">{{ variant | render }}</div>
      {% endfor %}
    `,
    scripts: ['./preview.js']
  },
  defaults: {
    iconPos: 'after'
  },
  variants: [
    {
      name: 'next',
      context: {
        label: data.buttons.getRandomLabel(),
        icon: '@icon/next'
      }
    },
    {
      name: 'prev',
      context: {
        label: data.buttons.getRandomLabel(),
        icon: '@icon/prev',
        iconPos: 'before'
      }
    }
  ]
};
