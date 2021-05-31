import observe from './observe'
import Dep from './Dep'
// 数据拦截函数
// obj key: d
export default function defineReactive(data: any, key: string, val?: any) {
  const myDep = new Dep()
  if (arguments.length == 2) {
    val = data[key];
  }
  // 这里把val 也observe一下
  let co: any;
  co = observe(val)

  Object.defineProperty(data, key, {
    // 可枚举
    enumerable: true,
    // 可以被配置，比如可以被delete
    configurable: true,
    get(): any {
      // console.log('要读取 属性' + key)
      if (Dep.target) {
        myDep.depend()
        if (co && Array.isArray(val)) {
          co.dep.depend()
        }
      }
      return val
    },
    set(newValue: any) {
      // console.log('要给属性' + key + '赋值')
      if (val === newValue) {
        return
      }
      val = newValue
      // 新值也要 observe
      observe(newValue)
      // console.log(newValue)
      myDep.notify()
    }
  })
}