function AddPlayerCommand(playerRepository) {

  this.canHandle = (command) => {
    return /add player ([a-zA-Z]+)/.exec(command)
  }

  this.run = (command) => {
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

module.exports = AddPlayerCommand
