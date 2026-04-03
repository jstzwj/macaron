const listeners = new Map()

const getHandlers = event => {
  if (!listeners.has(event)) {
    listeners.set(event, new Set())
  }
  return listeners.get(event)
}

const bus = {
  $on (event, handler) {
    getHandlers(event).add(handler)
  },
  $off (event, handler) {
    if (!listeners.has(event)) {
      return
    }
    if (!handler) {
      listeners.delete(event)
      return
    }
    const handlers = listeners.get(event)
    handlers.delete(handler)
    if (!handlers.size) {
      listeners.delete(event)
    }
  },
  $emit (event, ...args) {
    if (!listeners.has(event)) {
      return
    }
    for (const handler of [...listeners.get(event)]) {
      handler(...args)
    }
  }
}

export default bus
