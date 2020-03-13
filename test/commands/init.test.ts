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
    const createdJsonFile: DefaultJsonFormat = require(`${config.dirPath}/${config.fileName}`)
    expect(createdJsonFile.endpoint).to.equal('/hello')
    expect(createdJsonFile.delay).to.equal(5000)
    expect(createdJsonFile.body).to.have.property('greeting')
    expect(createdJsonFile.body.greeting).to.equal('hello')
  })
})
