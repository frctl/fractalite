module.exports = {
  stylesheet(url) {
    return `<link rel="stylesheet" href="${url}">`;
  },
  script(url) {
    return `<script src="${url}"></script>`;
  }
};
