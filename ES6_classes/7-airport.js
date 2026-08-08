export default class Airport {
  constructor(name, code) {
    this._name = name;
    this._code = code;
  }

  // Overrides the string representation when logging the object
  get [Symbol.toStringTag]() {
    return this._code;
  }

  // Returns the custom string representation
  toString() {
    return `[object ${this._code}]`;
  }
}
