import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

const strats = Object.create(null)

function defaultStrat(defVal: any, userVal: any): any {
  return typeof userVal !== 'undefined' ? userVal : defVal
}

function userStrat(defVal: any, userVal: any): any {
  if (typeof userVal !== 'undefined') {
    return userVal
  }
}

function deepMergeStrat(defVal: any, userVal: any): any {
  if (isPlainObject(userVal)) {
    return deepMerge(defVal, userVal)
  } else if (typeof userVal !== 'undefined') {
    return userVal
  } else if (isPlainObject(defVal)) {
    return deepMerge(defVal)
  } else if (typeof defVal !== 'undefined') {
    return defVal
  }
}

const stratKeysFromDefaults = ['url', 'params', 'data']

stratKeysFromDefaults.forEach(key => {
  strats[key] = userStrat
})

const stratKeysFromMerged = ['headers']

stratKeysFromMerged.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  userConfig?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!userConfig) {
    userConfig = {}
  }

  const config = Object.create(null)

  for (let key in userConfig) {
    mergeField(key)
  }

  for (let key in defaultConfig) {
    if (!(key in userConfig)) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(defaultConfig[key], userConfig![key])
  }

  return config
}
