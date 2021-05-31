import Watcher from './Watcher'

let _id = 0
// 订阅发布模式
export default class Dep {
  static target: any = null
  _id: number;
  subs: Watcher[]
  constructor() {
    this._id = _id++
    this.subs = []
    console.log('创建一个Dep =' + this._id)
  }
  // 添加订阅
  addSub(sub: Watcher) {
    console.log('添加', this._id)
    this.subs.push(sub)
  }
  // 订阅
  depend() {
    if (Dep.target) { // 再次判断一下是否处于收集阶段
      this.addSub(Dep.target)
    }
  }
  // 发布
  notify() {
    console.log('触发发布',this._id, this.subs)
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++)  {
      subs[i].update()
    }
  }
}