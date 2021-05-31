import defineReactive from './defineReactive'
import { def } from './utils'
import { arrayMethods } from './array'
import observe from './observe'
import Dep from './Dep'

export default class Observer {
  dep: Dep;
  constructor(val: object) {
    this.dep = new Dep()
    def(val, '__ob__', this, false)
    if (Array.isArray(val)) { // 如果是数组需要其他操作
      Object.setPrototypeOf(val, arrayMethods)
      this.forArray(<[]>val)
    } else { // 如果是对象 则遍历一下
      this.walk(val)
    }
  }
  walk(val) {
    for (let key in val) {
      defineReactive(val, key)
    }
  }
  forArray(val: []) {
    for (let i = 0, l = val.length; i < l; i++) {
      // 逐项进行observe
      observe(val[i]);
    }
  }
}