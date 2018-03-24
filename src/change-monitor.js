module.exports = class {
    constructor(objArr) {
      this.values = objArr
    }
  
    *[Symbol.iterator]() {
      let current = {}
      for (let value of this.values) {
        let changed = []
        for (let key in value) {
          if (current[key] !== value[key]) {
            current[key] = value[key]
            changed.push(key)
          }
        }
        yield { item: { ...value }, changed }
      }
    }
  }