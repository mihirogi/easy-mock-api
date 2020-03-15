import {Command} from '@oclif/command'
import {createServer, IncomingMessage, ServerResponse} from 'http'
import {DefaultJsonFormat} from './init'
import {dirPath, fileName} from '../constants/config'

export default class Start extends Command {
  static description = 'start mock api server';

  async run() {
    const apiMap = this.generateApiMap()

    const httpServer = createServer(
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
        }, apiMap.data[url].delay)
      }
    )
    httpServer.listen(apiMap.port, () => {
      this.log(`Mock Server on port ${apiMap.port}`)
    })
  }

  generateApiMap(): DefaultJsonFormat {
    const defineApiMap = this.loadDefinedApiMapFile(`${dirPath}/${fileName}`)
    return {
      ...defineApiMap,
      data: {
        ...defineApiMap.data,
        _undefined: {
          // 定義されてないAPIのレスポンス用
          body: {message: 'undefined api'},
          delay: 0,
          statusCode: 404,
        },
      },
    }
  }

  loadDefinedApiMapFile(path: string): DefaultJsonFormat {
    return require(path)
  }
}
