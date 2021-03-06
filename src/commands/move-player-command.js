function MovePlayerCommand(playerRepository, dice) {

  const WIN_POSITION = 63

  this.canHandle = (command) => {
    return /move ([a-zA-Z]+)/.exec(command)
  }

  this.run = (command) => {
    const playerName = parsePlayerName(command) 
    const [firstRoll, secondRoll] = parseOrGenerateRolls(command, dice)

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
      isABridge: newPlayerPosition == 6,
      isAWinner: newPlayerPosition == WIN_POSITION
    }

    if(moveEvent.isABounce)
      moveEvent.newPlayerPosition -= 2*(moveEvent.newPlayerPosition - WIN_POSITION)
    if(moveEvent.isABridge)
      moveEvent.newPlayerPosition = 12

    playerRepository.updatePosition(moveEvent.playerName, moveEvent.newPlayerPosition)
    return buildResponseMessage(moveEvent)
  }

  function parsePlayerName(command) {
    return /move ([a-zA-Z]+)/.exec(command)[1]
  }

  function parseOrGenerateRolls(command, dice) {
    const parsedRolls = /move [a-zA-Z]+ ([1-6]{1}), ([1-6]{1})/.exec(command)
    if(parsedRolls != null)
      return [parseInt(parsedRolls[1]), parseInt(parsedRolls[2])]

    return dice.roll()
  }

  function buildResponseMessage(moveEvent) {
    const moveResponseMessage = moveMessage(moveEvent)

    if(moveEvent.isABounce)
      return moveResponseMessage + `. ` + bounceMessage(moveEvent.playerName, moveEvent.newPlayerPosition) 
    if(moveEvent.isABridge)
      return moveResponseMessage + `. ` + jumpMessage(moveEvent.playerName, moveEvent.newPlayerPosition) 
    if(moveEvent.isAWinner)
      return moveResponseMessage + `. ` + winMessage(moveEvent.playerName) 

    return moveResponseMessage
  }

  function moveMessage(moveEvent) {
    const oldPlayerPositionString = (moveEvent.oldPlayerPosition == 0 ? 'Start' : moveEvent.oldPlayerPosition)

    var newPlayerPositionString = moveEvent.newPlayerPosition
    if(moveEvent.isABounce)
      newPlayerPositionString = WIN_POSITION
    if(moveEvent.isABridge)
      newPlayerPositionString = "The Bridge"

    return `${moveEvent.playerName} rolls ${moveEvent.firstRoll}, ${moveEvent.secondRoll}. ` +
      `${moveEvent.playerName} moves ` +
      `from ${oldPlayerPositionString} ` +
      `to ${newPlayerPositionString}`
  }

  function bounceMessage(playerName, newPlayerPosition) {
    return `${playerName} bounces! ${playerName} returns to ${newPlayerPosition}`
  }

  function jumpMessage(playerName, newPlayerPosition) {
    return `${playerName} jumps to ${newPlayerPosition}`
  }

  function winMessage(playerName) {
    return `${playerName} Wins!!`
  }
}

module.exports = MovePlayerCommand
