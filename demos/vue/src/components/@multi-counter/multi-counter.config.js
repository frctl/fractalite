module.exports = {
  scenarios: [
    {
      name: 'default',
      props: {
        'total-label': 'Sum of A and B',
        counters: [
          {
            label: 'A'
          },
          {
            label: 'B'
          },
          {
            label: 'C'
          }
        ]
      }
    }
  ]
};
