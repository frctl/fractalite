module.exports = {
  scenarios: [
    {
      name: 'image',
      props: {
        type: 'image',
        src: './assets/placeholder.jpg',
        alt: 'Image alt text'
      }
    },
    {
      name: 'image-with-caption',
      props: {
        type: 'image',
        src: './assets/placeholder.jpg',
        alt: 'Image alt text',
        caption: 'A caption for the figure'
      }
    },
    {
      name: 'video',
      props: {
        type: 'video',
        src: 'https://www.youtube.com/embed/ScMzIvxBSi4'
      }
    }
  ]
};
