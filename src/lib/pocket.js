
import { patch } from 'superfine'

/**
 * Spread an array of source objects into the target object
 * @function spread
 */

const spread = (target, batch) => {
  batch.forEach(source => {
    Object.assign(target, source)
  })
}

/**
 * Debounce wrapper around window.requestAnimationFrame
 * @function enqueue
 */

const enqueue = render => {
  let lock = false

  const callback = () => {
    lock = false
    render()
  }

  return () => {
    if (!lock) {
      lock = true
      window.requestAnimationFrame(callback)
    }
  }
}

/**
 * Collect state changes for batch updates
 * @function collect
 */

const collect = (state, render) => {
  let batch = []

  const schedule = enqueue(() => {
    spread(state, batch)
    batch = []
    render()
  })

  return result => {
    batch.push(result)
    schedule()
  }
}

/**
 * Minimalist state manager with agressive optimization
 * @function pocket
 */

const pocket = (state, render) => {
  const schedule = collect(state, render)

  const dispatch = (action, data) => {
    let result = action(state, dispatch)

    if (typeof result === 'function') {
      result = result(data)
    }

    schedule(result)
  }

  return dispatch
}

/**
 * Wire Pocket and Superfine together
 * @module app
 */

const node = document.getElementById('app')

export default ({ state, view, effects, mount }) => {
  const dispatch = pocket(state, () => {
    patch(node, view(state, dispatch))
    effects(state, dispatch)
  })

  mount(state, dispatch)
}
