import Observer from './Observer'

export default function observe(val) {
  if (typeof (val) !== 'object') return
  let ob: any
  if (val.__ob__) {
    ob = val.__ob__
  } else {
    ob = new Observer(val)
  }
  return ob
}