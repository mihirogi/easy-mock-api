import {DefaultJsonFormat} from '../commands/init'
import {dirPath, fileName} from '../constants/config'
import * as fs from 'fs'
import mkdirp = require('mkdirp');

export const loadDefinedApiMapFile = (path: string): DefaultJsonFormat => {
  return require(path)
}

export const generateApiMap = (): DefaultJsonFormat => {
  const defineApiMap = loadDefinedApiMapFile(`${dirPath}/${fileName}`)
  return {
    ...defineApiMap,
    data: {
      ...defineApiMap.data,
      _undefined: {
        // 定義されてないAPIのレスポンス用
        body: {message: 'undefined api'},
        delay: 0,
        statusCode: 200,
      },
    },
  }
}

export const generateJson = (endpoint: string): DefaultJsonFormat => {
  return {
    port: 4200,
    data: {
      [endpoint]: {
        body: {
          message: 'please rewrite with JSON format data',
        },
        delay: 1000,
        statusCode: 200,
      },
      '/sample': {
        body: {
          message: '/sample is example data',
        },
        delay: 1000,
        statusCode: 200,
      },
    },
  }
}

export const outputJson = (path: string, json: string) => {
  fs.writeFileSync(path, json)
}

export const createDir = (path: string) => {
  mkdirp.sync(path)
}
