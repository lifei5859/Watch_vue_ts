import observe from './data-response/observe'
import Watcher from './data-response/Watcher'
let obj: any = {
  a: 1,
  b: 'ssss',
  c: {
    d: {
      e: 66
    }
  },
  d: [{name: '111'}, {name: '222'},{name: '333'},{name: '4444'},{name: '5555'}]
}

observe(obj)


new Watcher(obj, 'c', (newV, oldV) => {
  console.log('走你---------------c.d', newV, oldV)
})
new Watcher(obj, 'd', (newV, oldV) => {
  console.log('走你---------------dddddd', newV, oldV)
})
obj.c.d = { e: 99 }
obj.c = {d: {e: 1000}}
// obj.c = { e: 99 }
obj.d.push({name: 99999999})
console.log(obj)

