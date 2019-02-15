module.exports = {
  contexts: [
    {
      name: 'next',
      props: {
        label: 'Next',
        modifier: 'action',
        icon: './arrow-right.svg',
        iconPos: 'after'
      },
      previewProps: [
        {
          label: 'Go forward'
        },
        {
          label: 'This way'
        }
      ]
    },
    {
      name: 'prev',
      props: {
        label: 'Prev',
        modifier: 'action',
        icon: './arrow-left.svg',
        iconPos: 'before'
      },
      previewProps: [
        {
          label: 'Go back'
        },
        {
          label: 'Return'
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
