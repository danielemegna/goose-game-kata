function LoadedDice() {
  this.first = 1
  this.second = 1

  this.setNext = (first, second) => {
    this.first = first
    this.second = second
  }

  this.roll = () => {
    return [this.first, this.second]
  }
}

module.exports = LoadedDice
