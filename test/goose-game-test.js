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

    describe('if there is one participant "Pippo" on space "60"', () => {

      beforeEach(() => {
        const bestRolls = 6+6
        for(var i=0; i<(60/bestRolls); i++) {
          game.sendCommand('move Pippo 6, 6')
          game.sendCommand('move Pluto 1, 1')
        }
      })

      xit('with a move "Pippo 1, 2" the system should recognize Pippo victory', () => {
        const response = game.sendCommand('move Pippo 1, 2')
        expect(response).to.be.eq('Pippo rolls 1, 2. Pippo moves from 60 to 63. Pippo Wins!!')
      })

    })

  })

})
