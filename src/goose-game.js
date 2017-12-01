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
    var newPlayerPosition = oldPlayerPosition + rollsSum

    const moveEvent = {
      playerName: playerName,
      firstRoll: firstRoll,
      secondRoll: secondRoll,
      oldPlayerPosition: oldPlayerPosition,
      newPlayerPosition: newPlayerPosition,
      isABounce: newPlayerPosition > WIN_POSITION,
      isAWinner: newPlayerPosition == WIN_POSITION
    }

    if(moveEvent.isABounce)
      moveEvent.newPlayerPosition -= 2*(moveEvent.newPlayerPosition - WIN_POSITION)

    playerRepository.updatePosition(moveEvent.playerName, moveEvent.newPlayerPosition)

    return buildResponseMessage(moveEvent)
  }

  function buildResponseMessage(moveEvent) {
    const moveResponseMessage = moveMessage(moveEvent)

    if(moveEvent.isABounce)
      return moveResponseMessage + `. ` + bounceMessage(moveEvent.playerName, moveEvent.newPlayerPosition) 
    if(moveEvent.isAWinner)
      return moveResponseMessage + `. ` + winMessage(moveEvent.playerName) 

    return moveResponseMessage
  }

  function moveMessage(moveEvent) {
    const oldPlayerPositionString = (moveEvent.oldPlayerPosition == 0 ? 'Start' : moveEvent.oldPlayerPosition)
    const newPlayerPositionString = moveEvent.isABounce ? WIN_POSITION : moveEvent.newPlayerPosition
    return `${moveEvent.playerName} rolls ${moveEvent.firstRoll}, ${moveEvent.secondRoll}. ` +
      `${moveEvent.playerName} moves ` +
      `from ${oldPlayerPositionString} ` +
      `to ${newPlayerPositionString}`
  }

  function bounceMessage(playerName, newPlayerPosition) {
    return `${playerName} bounces! ${playerName} returns to ${newPlayerPosition}`
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
