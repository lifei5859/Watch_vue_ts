import Observer from './Observer'

export function def(val: any, key: string, ob: any, enumerable) {
  Object.defineProperty(val, key, {
    value: ob, // 值
    enumerable, // 可枚举
    writable: true, // 可写
    configurable: true // 可配置（删除）
  })
}