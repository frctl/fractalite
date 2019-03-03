module.exports = {
  label: 'Card',

  scenarios: [
    {
      name: 'basic',
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
    },
    {
      name: 'image',
      label: 'Image card',
      props: {
        title: 'A kitten',
        content: '<p>Because every example needs a kitten in there somewhere.</p>',
        image: {
          src: 'http://placekitten.com/900/600',
          alt: 'Meow'
        }
      }
    }
  ]
};
