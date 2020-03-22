import {Command, flags} from '@oclif/command'
import enquirer = require('enquirer');
import {dirPath, fileName} from '../constants/config'
import {generateJson, outputJson, createDir} from '../functions/api'

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
    createDir(dirPath)
    outputJson(
      `${dirPath}/${fileName}`,
      JSON.stringify(generateJson(response.value))
    )
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
