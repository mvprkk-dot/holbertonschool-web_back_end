export default class Building {
  constructor(sqft) {
    this._sqft = sqft;
    // Check if the instance is created from a class that isn't Building
    // and ensure it has the required method.
    if (this.constructor !== Building) {
      if (typeof this.evacuationWarningMessage !== 'function') {
        throw new Error('Class extending Building must override evacuationWarningMessage');
      }
    }
  }

  get sqft() {
    return this._sqft;
  }
}
