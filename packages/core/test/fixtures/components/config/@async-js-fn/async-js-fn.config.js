async function loadData() {
  return { isLoaded: true };
}

module.exports = async function(component) {
  const data = await loadData();
  return data;
};
