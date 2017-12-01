const
  chai = require('chai')
  sinon = require('sinon')
  expect = chai.expect
  GooseGame = require('../src/goose-game')

describe('GooseGame', () => {

  var game = null
  beforeEach(() => {
    game = new GooseGame()
  })
  
  describe('with no participant', () => {

    it('add a player', () => {
      const response = game.sendCommand('add player Pippo')
      expect(response).to.be.eq('players: Pippo')
    })

    it('add two players', () => {
      game.sendCommand('add player Pippo')
      const response = game.sendCommand('add player Pluto')

      expect(response).to.be.eq('players: Pippo, Pluto')
    })

    it('add a player twice', () => {
      game.sendCommand('add player Pippo')
      const response = game.sendCommand('add player Pippo')

      expect(response).to.be.eq('Pippo: already existing player')
    })
    
  })

  describe('with two player Pippo and Pluto added', () => {
    
    beforeEach(() => {
      game.sendCommand('add player Pippo')
      game.sendCommand('add player Pluto')
    })

    it('do some moves from start', () => {
      var response = game.sendCommand('move Pippo 4, 2')
      expect(response).to.be.eq('Pippo rolls 4, 2. Pippo moves from Start to 6')

      response = game.sendCommand('move Pluto 2, 2')
      expect(response).to.be.eq('Pluto rolls 2, 2. Pluto moves from Start to 4')

      response = game.sendCommand('move Pippo 2, 3')
      expect(response).to.be.eq('Pippo rolls 2, 3. Pippo moves from 6 to 11')
    })

  })

})
