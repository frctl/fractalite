module.exports = {
  variants: [
    {
      name: 'next',
      props: {
        label: 'Next',
        modifier: 'action'
      }
    },
    {
      name: 'prev',
      props: {
        label: 'Prev',
        modifier: 'action'
      }
    }
  ],
  preview: {
    scripts: ['./preview.js'],
    meta: {}
  }
};
