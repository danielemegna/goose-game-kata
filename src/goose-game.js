function GooseGame() {

  this.playerRepository = new InMemoryPlayerRepository()

  this.sendCommand = function(command) {
    if(command.startsWith('move'))
      return this.movePlayerCommand(command)

    return this.addPlayerCommand(command)
  }

  this.movePlayerCommand = function(command) {
    const parsed = /move ([a-zA-Z]+) ([1-6]{1}), ([1-6]{1})/.exec(command)
    
    const playerName = parsed[1]
    const firstRoll = parseInt(parsed[2])
    const secondRoll = parseInt(parsed[3])
    const rollsSum = firstRoll + secondRoll

    const oldPlayerPosition = this.playerRepository.getPositionFor(playerName)
    const newPlayerPosition = oldPlayerPosition + rollsSum
    this.playerRepository.updatePosition(playerName, newPlayerPosition)

    return `${playerName} rolls ${firstRoll}, ${secondRoll}. ` +
      `${playerName} moves ` +
      `from ${oldPlayerPosition == 0 ? 'Start' : oldPlayerPosition} ` +
      `to ${newPlayerPosition}`
  }

  this.addPlayerCommand = function(command) {
    const newPlayer = extractPlayerFrom(command)

    if(this.playerRepository.isStored(newPlayer))
      return newPlayer + ': already existing player'

    this.playerRepository.store(newPlayer)
    return this.playerRepository.storedToString()
  }

  function extractPlayerFrom(command) {
    return /add player ([a-zA-Z]+)/.exec(command)[1]
  }

}

function InMemoryPlayerRepository() {
  this.positions = []

  this.store = (playerName) => {
    this.positions[playerName] = 0
  }

  this.isStored = (playerName) => {
    return playerName in this.positions
  }

  this.storedToString = () => {
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

module.exports = GooseGame
