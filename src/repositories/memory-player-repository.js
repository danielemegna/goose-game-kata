function InMemoryPlayerRepository() {
  this.positions = []

  this.store = (playerName) => {
    this.positions[playerName] = 0
  }

  this.isStored = (playerName) => {
    return playerName in this.positions
  }

  this.allToString = () => {
    return 'players: ' + this.getNames().join(', ')
  }

  this.getPositionFor = (playerName) => {
    return this.positions[playerName]
  }

  this.updatePosition = (playerName, position) => {
    this.positions[playerName] = position
  }

  this.getNames = () => {
    return Object.keys(this.positions)
  }

}

module.exports = InMemoryPlayerRepository
