module.exports = {
  label: 'Basic card',

  scenarios: [
    {
      name: 'standard',
      props: {
        title: 'A card title',
        content: '<p>Some content for the card.</p>'
      }
    },
    {
      name: 'cta',
      label: 'Call to action',
      props: {
        title: 'Sign up now',
        content: '<p>Click the button below to do this thing.</p>',
        cta: {
          text: 'Click me'
        }
      }
    }
  ]
};
