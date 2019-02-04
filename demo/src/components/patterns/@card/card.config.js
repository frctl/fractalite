module.exports = {
  variants: [
    {
      name: 'cta',
      label: 'Call to action',
      props: {
        title: 'Sign up now',
        content: '<p>Click the button below to do this thing.</p>',
        button: {
          label: 'Click me',
          href: '@button/prev'
        }
      }
    }
  ]
};
