import { def } from './utils'
import Dep from './Dep'
// 获取数组的原型
const arrayProto = Array.prototype
// 以数组的原型建立一个对象 用于重写数组方法
export const arrayMethods = Object.create(arrayProto)
// 要改写的数组方法
const arrayMethodsList = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'reverse',
  'splice'
]

arrayMethodsList.forEach(item => {
  // 将原始的方法保存下来
  const original = arrayProto[item]

  def(arrayMethods, item, function () {
    console.log('触发一下呢')
    const ob = this.__ob__
    // 先触发原始的方法实现基本功能

    original.apply(this, arguments)

    // 保存新增数组项
    let newly = []
    switch (item) {
      case 'push':
      case 'shift':
        newly = Array.prototype.slice.call(arguments, 0)
        break;
      case 'splice':
        newly = Array.prototype.slice.call(arguments, 2)
    }
    // 这时触发数据更新
    ob.dep.notify()

    // 将新增的项 也做成响应式
    ob.forArray(newly)
  }, false)

})

