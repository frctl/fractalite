const data = require('%/shared');

module.exports = {
  variants: [
    {
      name: 'primary',
      props: {
        modifier: 'primary'
      },
      previewProps: [
        {
          label: data.buttons.getRandomLabel()
        },
        {
          label: 'A primary button with a long label'
        }
      ]
    },
    {
      name: 'secondary',
      props: {
        modifier: 'secondary'
      },
      previewProps: [
        {
          label: data.buttons.getRandomLabel()
        },
        {
          label: 'A secondary button with a long label'
        }
      ]
    },
    {
      name: 'next',
      props: {
        label: 'Next',
        modifier: 'action',
        icon: '@icon/next',
        iconPos: 'after'
      }
    },
    {
      name: 'prev',
      props: {
        label: 'Prev',
        modifier: 'action',
        icon: '@icon/prev',
        iconPos: 'before'
      }
    }
  ],

  preview: {
    scripts: ['./preview.js']
  }
};
