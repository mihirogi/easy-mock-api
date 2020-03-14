import {expect, test} from '@oclif/test'
import enquirer = require('enquirer');
import {Response, DefaultJsonFormat} from '../../src/commands/init'
import * as fs from 'fs'
import * as config from '../../src/constants/config'

describe('init', () => {
  test
  .stub(enquirer, 'prompt', () => (): Response => {
    return {value: '/hello'}
  })
  .stdout({print: true})
  .command('init')
  .it('runs init', () => {
    expect(fs.existsSync(`${config.dirPath}/${config.fileName}`)).is.true
    const createdJson: DefaultJsonFormat = require(`${config.dirPath}/${config.fileName}`)
    expect(createdJson.port).to.have.equal(4200)
    expect(createdJson.data).to.have.keys(['/hello', '/sample'])
    Object.keys(createdJson.data).forEach(key => {
      expect(createdJson.data[key]).to.have.keys(['body', 'delay', 'statusCode'])
    })
  })
})
