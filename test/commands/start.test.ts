import {test, expect} from '@oclif/test'
import ApiServer from '../../src/singletons/api-server'
import * as request from 'request-promise-native'

describe('start', () => {
  test
  .stub('loadDefinedApiMapFile', () => ({
    port: 4200,
    data: {
      '/hello': {
        body: {message: 'please rewrite with JSON format data'},
        delay: 5000,
        statusCode: 200,
      },
      '/sample': {
        body: {message: '/sample is example data'},
        delay: 2000,
        statusCode: 200,
      },
    },
  }))
  .stdout({print: true})
  .command('start')
  .it('runs start', async () => {
    const response = await request.get('http://localhost:4200/sample')
    expect(JSON.parse(response)).have.to.key('message')
    expect(JSON.parse(response).message).have.to.contain('/sample is example data')
  })
}).afterEach(() => ApiServer.close())
