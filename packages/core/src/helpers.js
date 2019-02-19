const { find } = require('lodash');
const { defaultsDeep } = require('@frctl/fractalite-support/utils');
const Component = require('./entities/component');
const Asset = require('./entities/asset');
const File = require('./entities/file');

function getComponent({ components }, target, throwOnNotFound = false) {
  if (isComponent(target)) return target;
  const component = find(components, { name: target });
  if (!component && throwOnNotFound) {
    throw new Error(`Component '${target}' was not found`);
  }
  return component;
}

function getScenario(component, name, throwOnNotFound = false) {
  const scenario = find(component.scenarios, { name });
  if (!scenario && throwOnNotFound) {
    throw new Error(`Scenario '${name}' for component '${component.name}' was not found`);
  }
  return scenario;
}

function getScenarioOrDefault(component, name, throwOnNotFound = false) {
  if (!name) {
    return component.scenarios[0];
  }
  const scenario = getScenario(component, name, throwOnNotFound);
  return scenario ? scenario : component.scenarios[0];
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
  // TODO: allow for resolving of string componet/scenario references?
  return defaultsDeep(...args.reverse());
}

function isComponent(component) {
  return Component.isComponent(component);
}

function isAsset(asset) {
  return Asset.isAsset(asset);
}

function isFile(file) {
  return File.isFile(file);
}

module.exports = {
  getComponent,
  getScenario,
  getScenarioOrDefault,
  getAsset,
  getFile,
  mergeProps,
  isComponent,
  isAsset,
  isFile
};
