import {DefaultJsonFormat} from '../commands/init'
import {dirPath, fileName} from '../constants/config'

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
