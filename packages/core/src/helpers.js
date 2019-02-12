const { extname } = require('path');
const { isString, find } = require('lodash');
const { defaultsDeep } = require('@fractalite/support/utils');
const Component = require('./entities/component');
const Asset = require('./entities/asset');
const Variant = require('./entities/variant');
const File = require('./entities/file');

function getComponent({ components }, target, throwOnNotFound = false) {
  if (isComponent(target)) return target;
  const component = find(components, { handle: target });
  if (!component && throwOnNotFound) {
    throw new Error(`Component '${target}' was not found`);
  }
  return component;
}

function getVariant({ variants }, target, throwOnNotFound = false) {
  if (isVariant(target)) return target;
  const variant = find(variants, { handle: target });
  if (!variant && throwOnNotFound) {
    throw new Error(`Variant '${target}' was not found`);
  }
  return variant;
}

function getComponentFromVariant(state, target) {
  const variant = getVariant(state, target, true);
  return state.components.find(component => {
    return component.variants.includes(variant);
  });
}

function getComponentFromFile(state, file) {
  file = getFile(state, file, true);
  return state.components.find(component => {
    return component.files.includes(file);
  });
}

function getTarget(state, target, throwOnNotFound) {
  const variant = getVariant(state, target);
  if (variant) {
    return variant;
  }
  const component = getComponent(state, target);
  if (!component && throwOnNotFound) {
    throw new Error(`Could not resolve target`);
  }
  return component;
}

function getFile({ files }, target, throwOnNotFound = false) {
  if (isFile(target)) return target;
  const file = find(files, { handle: target });
  if (!file && throwOnNotFound) {
    throw new Error(`File '${target}' was not found`);
  }
  return file;
}

function getAsset({ assets }, target, throwOnNotFound = false) {
  if (isAsset(target)) return target;
  const asset = find(assets, { handle: target });
  if (!asset && throwOnNotFound) {
    throw new Error(`Asset '${target}' was not found`);
  }
  return asset;
}

function mergeProps(state, ...args) {
  const targets = args.map(target => {
    if (isString(target)) {
      target = getTarget(state, target, true);
    }
    if (isComponent(target)) return {};
    return isVariant(target) ? target.props : target;
  });
  return defaultsDeep(...targets.reverse());
}

function resolveReference(state, ref) {
  if (extname(ref)) {
    const file = ref.startsWith('@') ? getFile(state, ref.replace('@', '')) : getAsset(state, ref.replace('@', ''));
    return file;
  }
  if (ref.startsWith('@')) {
    return getTarget(state, ref.replace('@', ''));
  }
}

function isComponent(component) {
  return Component.isComponent(component);
}

function isVariant(variant) {
  return Variant.isVariant(variant);
}

function isAsset(asset) {
  return Asset.isAsset(asset);
}

function isFile(file) {
  return File.isFile(file);
}

module.exports = {
  getComponent,
  getComponentFromVariant,
  getComponentFromFile,
  getTarget,
  getAsset,
  getFile,
  getVariant,
  mergeProps,
  resolveReference,
  isVariant,
  isComponent,
  isAsset,
  isFile
};
