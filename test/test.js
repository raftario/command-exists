'use strict'

const expect = require('expect.js')
const commandExists = require('../lib')

const windows = process.platform === 'win32'
const testAwait = Number(process.version.replace(/[^0-9.]*/g, '').split('.')[0]) >= 7
  ? require('./await')
  : false

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

  if (testAwait) testAwait(windows)

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
