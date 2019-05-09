const expect = require('expect.js')
const commandExists = require('../lib')

module.exports = windows => {
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
}
