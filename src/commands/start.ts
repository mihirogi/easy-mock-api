import {Command, flags} from '@oclif/command'
import {createServer} from 'http'

export default class Start extends Command {
  static description = 'start mock api server';

  static flags = {
    port: flags.integer({char: 'p'}),
  };

  async run() {
    const {flags} = this.parse(Start)
    if (!flags.port) {
      flags.port = 3000
    }

    const httpServer = createServer((req, res) => console.log('hello server'))

    httpServer.listen(flags.port, () => {
      console.log(` Mock Server on port ${flags.port}`)
    })
  }
}
