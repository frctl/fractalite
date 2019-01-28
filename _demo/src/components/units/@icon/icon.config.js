module.exports = function({ files }) {
  const svgs = files.filter(file => file.ext === '.svg');
  return {
    variants: svgs.map(file => {
      return {
        name: file.name,
        props: {
          icon: {
            path: `@icon/${file.relative}`,
            alt: file.name
          }
        }
      };
    })
  };
};
