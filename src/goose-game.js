const MovePlayerCommand = require('./commands/move-player-command')
const AddPlayerCommand = require('./commands/add-player-command')
const InMemoryPlayerRepository = require('./repositories/memory-player-repository')

function GooseGame(dice) {
  this.dice = dice
  this.playerRepository = new InMemoryPlayerRepository()

  this.sendCommand = function(commandString) {
    return this.commandFor(commandString).run()
  }

  this.commandFor = (commandString, playerRepository) => {
    if(commandString.startsWith('move'))
      return new MovePlayerCommand(commandString, this.playerRepository, this.dice)

    return new AddPlayerCommand(commandString, this.playerRepository)
  }

}

module.exports = GooseGame
