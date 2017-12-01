function GooseGame() {

  this.playerRepository = new InMemoryPlayerRepository()

  this.sendCommand = function(commandString) {
    return this.commandFor(commandString).run()
  }

  this.commandFor = (commandString, playerRepository) => {
    if(commandString.startsWith('move'))
      return new MovePlayerCommand(commandString, this.playerRepository)

    return new AddPlayerCommand(commandString, this.playerRepository)
  }


}

function MovePlayerCommand(command, playerRepository) {

  const WIN_POSITION = 63

  this.run = () => {
    const parsed = /move ([a-zA-Z]+) ([1-6]{1}), ([1-6]{1})/.exec(command)
    const playerName = parsed[1]
    const firstRoll = parseInt(parsed[2])
    const secondRoll = parseInt(parsed[3])
    const rollsSum = firstRoll + secondRoll

    const oldPlayerPosition = playerRepository.getPositionFor(playerName)
    const newPlayerPosition = oldPlayerPosition + rollsSum
    playerRepository.updatePosition(playerName, newPlayerPosition)

    return buildResponseMessage(playerName, firstRoll, secondRoll, oldPlayerPosition, newPlayerPosition)
  }

  function buildResponseMessage(playerName, firstRoll, secondRoll, oldPlayerPosition, newPlayerPosition) {
    var responseMessage = moveMessage(playerName, firstRoll, secondRoll, oldPlayerPosition, newPlayerPosition)
    if(newPlayerPosition == WIN_POSITION)
      responseMessage += `. ` + winMessage(playerName) 

    return responseMessage
  }

  function moveMessage(playerName, firstRoll, secondRoll, oldPlayerPosition, newPlayerPosition) {
    return `${playerName} rolls ${firstRoll}, ${secondRoll}. ` +
      `${playerName} moves ` +
      `from ${oldPlayerPosition == 0 ? 'Start' : oldPlayerPosition} ` +
      `to ${newPlayerPosition}`
  }

  function winMessage(playerName) {
    return `${playerName} Wins!!`
  }
}

function AddPlayerCommand(command, playerRepository) {
  this.run = () => {
    const newPlayer = extractPlayerFrom(command)

    if(playerRepository.isStored(newPlayer))
      return newPlayer + ': already existing player'

    playerRepository.store(newPlayer)
    return playerRepository.allToString()
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

module.exports = GooseGame
