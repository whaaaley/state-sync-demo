
/**
 * Decodes a query string to an object.
 * @function decode
 * @param {string} data - Query string to decode
 */

const queryDelimeters = /[&=]/g

export const decode = data => {
  const query = data.slice(1).split(queryDelimeters)
  const result = {}

  for (let i = 0; i < query.length; i += 2) {
    result[query[i]] = query[i + 1]
  }

  return result
}

/**
 * Encodes an object into a query string.
 * @function encode
 * @param {Object} data - Query object to encode
 */

const uri = encodeURIComponent

export const encode = data => {
  let result = '?'

  for (const key in data) {
    if (data[key] != null) {
      result += uri(key) + '=' + uri(data[key]) + '&'
    }
  }

  return result.slice(0, -1)
}

/**
 * Sets router state based on the `window.location` property and apply route
 * rewrites if any.
 * @function routerInit
 * @example
 * dispatch(router.actions.routerInit, {
 *   '/detail': /^\/dp\/[0-9a-f]{24}$/i,
 *   '/user': /^\/user\/\w+$/i
 * })
 */

export const routerInit = ({ router }) => data => {
  const { pathname, search } = window.location

  if (typeof search === 'string') {
    router.query = decode(search)
  }

  for (const key in data) {
    const regexp = data[key]
    const result = regexp.exec(pathname)

    if (result != null) {
      router.id = result[0]
      router.to = key

      return { router }
    }
  }

  router.to = pathname

  return { router }
}

/**
 * Uses the History API to sync browser session history with router state.
 * @function routerLink
 * @example
 * dispatch(router.actions.routerLink, {
 *   to: '/foobar',
 *   query: {
 *     foo: 'bar'
 *   }
 * })
 */

const pushstateEvent = new CustomEvent('pushstate')

export const routerLink = state => data => {
  if (data.to === window.history.state) {
    window.history.back()
    return // stop execution
  }

  const to = typeof data.to === 'string' ? data.to : state.router.to
  const href = data.query ? to + encode(data.query) : to

  window.history.pushState(state.router.to, null, href)
  window.dispatchEvent(pushstateEvent)
}

/**
 *
 */

export const state = {
  id: null,
  query: null,
  to: '/'
}

/**
 * A minimal router using the History API.
 * @module router
 */

// export default {
//   state: {
//     id: null,
//     query: null,
//     to: '/'
//   },
//   actions: {
//     routerInit
//   },
//   effects: {
//     routerLink
//   },
//   lib: {
//     decode,
//     encode
//   }
// }
