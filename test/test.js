'use strict'

const expect = require('expect.js')
const commandExists = require('../lib')

const windows = process.platform === 'win32'

describe('commandExists', () => {
  describe('promise', () => {
    it('should find a command named which or where', done => {
      let command = 'which'
      if (windows) {
        command = 'where'
      }

      commandExists(command).then(exists => {
        expect(exists).to.be(true)
        done()
      })
    })

    it('should not find a command named fdsafdsafdsafdsafdsa', done => {
      commandExists('fdsafdsafdsafdsafdsa').then(exists => {
        expect(exists).to.be(false)
        done()
      })
    })
  })

  describe('await', () => {
    it('should find a command named which or where', async () => {
      let command = 'which'
      if (windows) {
        command = 'where'
      }

      const exists = await commandExists(command)
      expect(exists).to.be(true)
    })

    it('should not find a command named fdsafdsafdsafdsafdsa', async () => {
      const exists = await commandExists('fdsafdsafdsafdsafdsa')
      expect(exists).to.be(false)
    })
  })

  describe('local file', () => {
    it('should report true if there is an executable file with that name', done => {
      commandExists('test/executable.js').then(exists => {
        expect(exists).to.be(true)
        done()
      })
    })

    it('should report false if there is a non-executable file with that name on linux and true on windows', done => {
      commandExists('test/nonexecutable.js').then(exists => {
        windows
          ? expect(exists).to.be(true)
          : expect(exists).to.be(false)
        done()
      })
    })

    it('should not find a file named test/fdsafdsafdsafdsafdsa', done => {
      commandExists('test/fdsafdsafdsafdsafdsa').then(exists => {
        expect(exists).to.be(false)
        done()
      })
    })
  })
})
