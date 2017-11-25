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
  
  describe('add player feature', () => {

    it('If there is no participant', () => {
      const response = game.sendCommand('add player Pippo')
      expect(response).to.be.eq('players: Pippo')
    })

    it('Adding two participants', () => {
      game.sendCommand('add player Pippo')
      const response = game.sendCommand('add player Pluto')

      expect(response).to.be.eq('players: Pippo, Pluto')
    })

    it('If there is already a participant', () => {
      game.sendCommand('add player Pippo')
      const response = game.sendCommand('add player Pippo')

      expect(response).to.be.eq('Pippo: already existing player')
    })
    
  })

  describe('move player feature', () => {
    
    beforeEach(() => {
      game.sendCommand('add player Pippo')
      game.sendCommand('add player Pluto')
    })

    it('do some moves from start', () => {
      var response = game.sendCommand('move Pippo 4, 2')
      expect(response).to.be.eq('Pippo rolls 4, 2. Pippo moves from Start to 6')

      response = game.sendCommand('move Pluto 2, 2')
      expect(response).to.be.eq('Pluto rolls 2, 2. Pluto moves from Start to 4')
    })
  })

})
