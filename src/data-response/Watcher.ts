import Dep from "./Dep"

let _id = 0 

export default class Watcher {
  target: any
  _id: number
  value: any
  getter: Function
  callback: (a: any, b?: any, c?: any) => any
  constructor(target: any, expression: string, callback: (a: any, b?: any, c?: any) => any) {
    this._id = _id++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }
  get() { // 收集阶段调用
    Dep.target = this // target有值时说明是收集阶段
    const data = this.target // 被监听的对象
    let value: any; // 返回的值
    try {
      value = this.getter(data)
    } finally {
      Dep.target = null
    }
    return value // 最后将取到的值返回
  }
  update() {
    this.run()
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb: (a: any, b?: any, c?: any) => any) {
    const val = this.get()
    const oldVal = this.value
    if (val !== oldVal || typeof val === 'object') {
      this.value = val
      cb.call(this.target, val, oldVal)
    }
  }
}

function parsePath(str: string): Function {
  var segments = str.split('.');
  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]]
    }
    return obj;
  };
}