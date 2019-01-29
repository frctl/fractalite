module.exports = {
  variants: [
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
      previewProps: [
        {
          label: 'Go back'
        },
        {
          label: 'Return'
        }
      ]
    }
  ]
};
