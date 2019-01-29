module.exports = {
  variants: [
    {
      name: 'next',
      props: {
        label: 'Next',
        modifier: 'action',
        icon: './arrow-right.svg',
        iconPos: 'after',
        icons: ['./arrow-right.svg', './arrow-left.svg']
      }
    },
    {
      name: 'prev',
      props: {
        label: 'Prev',
        modifier: 'action',
        icon: './arrow-left.svg',
        iconPos: 'before'
      }
    }
  ]
};
