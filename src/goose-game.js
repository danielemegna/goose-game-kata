const MovePlayerCommand = require('./commands/move-player-command')
const AddPlayerCommand = require('./commands/add-player-command')
const InMemoryPlayerRepository = require('./repositories/memory-player-repository')

function GooseGame(dice) {
  this.playerRepository = new InMemoryPlayerRepository()
  this.commands = [
    new MovePlayerCommand(this.playerRepository, dice),
    new AddPlayerCommand(this.playerRepository)
  ]

  this.sendCommand = function(commandString) {
    return this.commands
      .find((command) => command.canHandle(commandString))
      .run(commandString)
  }

}

module.exports = GooseGame
