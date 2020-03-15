import {test} from '@oclif/test'
import * as fs from 'fs'
import * as config from '../../src/constants/config'

describe('start', () => {
  test
  .it('runs start', () => {
    fs.existsSync(`${config.dirPath}/${config.fileName}`)
  })
})
