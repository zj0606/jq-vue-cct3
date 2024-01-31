type BusClass = {
  emit: (name: string) => void,
  on: (name:string, callback: Function) => void
}
type ParamsKey = string | number | symbol
type List = {
  [key:ParamsKey] : Array<Function>
}

class Bus implements BusClass {
  list:List
  constructor() {
    this.list = {}
  }
  on(name: string, callback: Function) {
    const fn: Array<Function> = this.list[name] || [] 
    fn.push(callback)
    this.list[name] = fn
  }
  emit(name: string, ...args:Array<any>) {
    const eventName: Array<Function> = this.list[name]
    eventName.forEach(fn => fn.apply(this, args)) 
  }
}

export default new Bus()