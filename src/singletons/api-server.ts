import {Server, createServer, RequestListener} from 'http'
const httpTerminator = require('http-terminator')
class ApiServer {
  private httpServer: Server;

  constructor() {
    this.httpServer = new Server()
  }

  createServer(callback: RequestListener) {
    this.httpServer = createServer(callback)
  }

  listen(_port: number, _listeningListener?: Function) {
    this.httpServer.listen(_port, _listeningListener)
  }

  async close() {
    const _server = httpTerminator.createHttpTerminator({
      server: this.httpServer,
    })
    await _server.terminate()
  }
}

export default new ApiServer()
