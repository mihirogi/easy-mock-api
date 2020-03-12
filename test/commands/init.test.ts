import {expect, test} from '@oclif/test'
import enquirer = require('enquirer');
import {Response} from '../../src/commands/init'

describe('init', () => {
  test
  .stub(enquirer, 'prompt', () => (): Response => {
    return {value: '/hello'}
  })
  .stdout({print: true})
  .command('init')
  .it('runs init', ctx => {})
})
