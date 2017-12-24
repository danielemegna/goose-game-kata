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

module.exports = AddPlayerCommand
