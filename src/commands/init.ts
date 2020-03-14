import {Command, flags} from '@oclif/command'
import mkdirp = require('mkdirp');
import enquirer = require('enquirer');
import * as fs from 'fs'
import {dirPath, fileName} from '../constants/config'

export default class Init extends Command {
  static description = 'generate json file';

  static flags = {
    help: flags.help({char: 'h'}),
  };

  async run() {
    const response: Response = await enquirer.prompt({
      type: 'input',
      name: 'value',
      message: 'enter the api path',
      initial: '/sample',
    })
    mkdirp.sync(dirPath)
    fs.writeFileSync(
      `${dirPath}/${fileName}`,
      JSON.stringify(this.generateJson(response.value))
    )
  }

  generateJson(endpoint: string): DefaultJsonFormat {
    return {
      port: 4200,
      data: {
        [endpoint]: {
          body: {
            message: 'please rewrite with JSON format data',
          },
          delay: 5000,
          statusCode: 200,
        },
        '/sample': {
          body: {
            message: '/sample is example data',
          },
          delay: 5000,
          statusCode: 200,
        },
      },
    }
  }
}

export interface Response {
  value: string;
}
export interface DefaultJsonFormat {
  port: number;
  data: {
    [key: string]: {
      body: any;
      delay: number;
      statusCode: number;
    };
  };
}
