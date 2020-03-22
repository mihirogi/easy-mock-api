import {Command} from '@oclif/command'
import {IncomingMessage, ServerResponse} from 'http'
import ApiServer from '../singletons/api-server'
import {generateApiMap} from '../functions/api'

export default class Start extends Command {
  static description = 'start mock api server';

  async run() {
    const apiMap = generateApiMap()
    ApiServer.createServer(
      (request: IncomingMessage, response: ServerResponse) => {
        this.log(`Request to ${request.url}`)
        // レスポンス定義の中にリクエストされたAPIの定義がなければ、_undefinedとする
        const url =
          (apiMap.data[request.url as string] && request.url) || '_undefined'
        setTimeout(() => {
          response.writeHead(apiMap.data[url].statusCode, {
            'Content-type': 'application/json',
          })
          response.write(JSON.stringify(apiMap.data[url].body))
          response.end()
          request.on('end', () => request.connection.end())
        }, apiMap.data[url].delay)
      }
    )
    ApiServer.listen(apiMap.port, () => {
      this.log(`Mock Server on port ${apiMap.port}`)
    })
  }
}
