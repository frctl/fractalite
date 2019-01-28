const pupa = require('pupa');
const multimatch = require('multimatch');
const {
  compact,
  find,
  filter,
  reject,
  iteratee,
  sortBy,
  orderBy,
  uniq,
  uniqBy,
  cloneDeep,
  flatMap
} = require('lodash');

const iter = (...args) => iteratee(args.length === 2 ? [...args] : args[0]);

class Collection {
  constructor(items = []) {
    if (Collection.isCollection(items)) {
      items = items.toArray();
    }

    this._items = compact(items);
  }

  get length() {
    return this.count();
  }

  get items() {
    return this.toArray();
  }

  push(item) {
    const { items } = this;
    items.push(item);
    return this._new(items);
  }

  pop() {
    const { items } = this;
    items.pop();
    return this._new(items);
  }

  shift() {
    const { items } = this;
    items.shift();
    return this._new(items);
  }

  unshift(...args) {
    const { items } = this;
    items.unshift(...args);
    return this._new(items);
  }

  slice(...args) {
    return this._new(this.items.slice(...args));
  }

  splice(...args) {
    return this._new(this.items.splice(...args));
  }

  concat(items) {
    if (Collection.isCollection(items)) {
      items = items.toArray();
    }
    items = this.items.concat(items);
    return this._new(items);
  }

  count() {
    return this._items.length;
  }

  first() {
    return this._items[0];
  }

  last() {
    return this._items[this._items.length - 1];
  }

  nth(pos) {
    if (pos < 0) {
      pos = this.count() + pos;
    }
    return this._items[pos];
  }

  forEach(fn) {
    this._items.forEach(fn);
  }

  find(...args) {
    return find(this._items, iter(...args));
  }

  findOrFail(...args) {
    const item = this.find(...args);
    if (!item) {
      throw new Error('Collection item not found [item-not-found]');
    }
    return item;
  }

  match(prop, matcher, replacements = {}) {
    matcher = [].concat(matcher).map(match => pupa(match, replacements));
    return this.filter(item => {
      return multimatch(item[prop], matcher).length;
    });
  }

  matchOne(...args) {
    const matches = this.match(...args);
    return matches.length ? matches.first() : null;
  }

  filter(...args) {
    const items = filter(this._items, iter(...args));
    return this._new(items);
  }

  reject(...args) {
    const items = reject(this._items, iter(...args));
    return this._new(items);
  }

  sort(comparator) {
    const { items } = this;
    items.sort(comparator);
    return this._new(items);
  }

  sortBy(...args) {
    const sorter = args.length === 1 ? sortBy : orderBy;
    const items = sorter(this.items, ...args);
    return this._new(items);
  }

  uniq(by) {
    const filter = by ? uniqBy : uniq;
    const items = filter(this._items, by);
    return this._new(items);
  }

  map(...args) {
    return this._items.map(...args);
  }

  mapToCollection(...args) {
    return this._new(this.map(...args));
  }

  flatMap(...args) {
    return flatMap(this._items, ...args);
  }

  flatMapToCollection(...args) {
    return this._new(this.flatMap(...args));
  }

  reduce(...args) {
    return this._items.reduce(...args);
  }

  includes(...args) {
    return this._items.includes(...args);
  }

  reverse() {
    return this._new(this.items.reverse());
  }

  all() {
    return this.toArray();
  }

  clone() {
    return this._new(this.toArray().map(item => cloneDeep(item)));
  }

  toArray() {
    return this._items.slice(0);
  }

  toJSON() {
    return this.toArray().map(item => {
      if (item && typeof item.toJSON === 'function') {
        return item.toJSON();
      }
      return item;
    });
  }

  inspect(depth, opts) {
    return `${this[Symbol.toStringTag]} [${this._items.map(
      i => (i && i.inspect && i.inspect()) || i
    )}]`;
  }

  _new(...args) {
    return new this.constructor(...args);
  }

  [Symbol.iterator]() {
    return this._items[Symbol.iterator]();
  }

  get [Symbol.toStringTag]() {
    return 'Collection';
  }

  static get [Symbol.species]() {
    return this;
  }

  static isCollection(item) {
    return item instanceof Collection;
  }

  static from(...args) {
    return new this(...args);
  }
}

module.exports = Collection;
