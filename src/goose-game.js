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
    const playerPosition = 0
    const newPlayerPosition = playerPosition + rollsSum

    return `${playerName} rolls ${firstRoll}, ${secondRoll}. ` +
      `${playerName} moves ` +
      `from ${playerPosition == 0 ? 'Start' : playerPosition} ` +
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
  this.players = []

  this.store = (playerName) => {
    this.players.push(playerName)
  }

  this.isStored = (playerName) => {
    return this.players.indexOf(playerName) >= 0
  }

  this.storedToString = () => {
    return 'players: ' + this.players.join(', ')
  }
}

module.exports = GooseGame
