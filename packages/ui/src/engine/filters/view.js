module.exports = function view(target, args, ui) {
  let component;
  if (target._component) {
    component = ui.state.components.find(c => c.name === target._component);
  } else {
    component = target;
  }

  if (!component.view) {
    return null;
  }

  return ui.utils.resolveUrlRefs(component.view.contents);
};
