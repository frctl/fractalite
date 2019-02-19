module.exports = {
  scenarios: [
    {
      name: 'next',
      props: {
        label: 'Next',
        modifier: 'action',
        icon: './arrow-right.svg',
        iconPos: 'after'
      }
    },
    {
      name: 'prev',
      props: {
        label: 'Prev',
        modifier: 'action',
        icon: './arrow-left.svg',
        iconPos: 'before'
      },
      preview: [
        {
          label: 'Back'
        },
        {
          label: 'A prev button with a long label'
        }
      ]
    }
  ],

  preview: {
    wrapEach(html) {
      return `<div style="margin-bottom: 10px">${html}</div>`;
    }
  }
};
