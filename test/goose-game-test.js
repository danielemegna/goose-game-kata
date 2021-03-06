const
  chai = require('chai')
  sinon = require('sinon')
  expect = chai.expect
  GooseGame = require('../src/goose-game')
  LoadedDice = require('../src/dice/loaded-dice')

describe('GooseGame', () => {

  var game = null, loadedDice = null
  beforeEach(() => {
    loadedDice = new LoadedDice()
    game = new GooseGame(loadedDice)
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
      var response = game.sendCommand('move Pippo 4, 3')
      expect(response).to.be.eq('Pippo rolls 4, 3. Pippo moves from Start to 7')

      response = game.sendCommand('move Pluto 2, 2')
      expect(response).to.be.eq('Pluto rolls 2, 2. Pluto moves from Start to 4')

      response = game.sendCommand('move Pippo 2, 3')
      expect(response).to.be.eq('Pippo rolls 2, 3. Pippo moves from 7 to 12')
    })

    describe('if there is one participant "Pippo" on space "60"', () => {

      beforeEach(() => {
        const bestRolls = 6+6
        for(var i=0; i<(60/bestRolls); i++) {
          game.sendCommand('move Pippo 6, 6')
          game.sendCommand('move Pluto 1, 1')
        }
      })

      it('with a move "Pippo 1, 2" the system should recognize Pippo victory', () => {
        const response = game.sendCommand('move Pippo 1, 2')
        expect(response).to.be.eq('Pippo rolls 1, 2. Pippo moves from 60 to 63. Pippo Wins!!')
      })

      it('with a move "Pippo 3, 2" the system should recognize the bounce', () => {
        const response = game.sendCommand('move Pippo 3, 2')
        expect(response).to.be.eq('Pippo rolls 3, 2. Pippo moves from 60 to 63. Pippo bounces! Pippo returns to 61')
      })

    })

    describe('if there is one participant "Pippo" on space "4"', () => {
      beforeEach(() => {
        game.sendCommand('move Pippo 3, 1')
        game.sendCommand('move Pluto 1, 1')
      })

      it('let the game throws the dice for me to save effort', () => {
        loadedDice.setNext(1, 2)
        var response = game.sendCommand('move Pippo')
        expect(response).to.be.eq('Pippo rolls 1, 2. Pippo moves from 4 to 7')
      })

      it('when a player gets to the space "The Bridge" (space 6), it jumps to the space "12"', () => {
        loadedDice.setNext(1, 1)
        var response = game.sendCommand('move Pippo')
        expect(response).to.be.eq('Pippo rolls 1, 1. Pippo moves from 4 to The Bridge. Pippo jumps to 12')
      })

    })
  })

})
