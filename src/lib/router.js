
import app from './pocket'
import * as router from './routerStore'

export default ({ state, pages, rewrites, effects, mount }) => {
  let route

  state.router = {
    id: null,
    query: null,
    to: '/'
  }

  app({
    state,
    view: (state, dispatch) => {
      return route.view(state, dispatch)
    },
    effects,
    mount: (state, dispatch) => {
      const handler = () => {
        dispatch(router.routerInit, rewrites)
        route = pages[state.router.to] || pages['/missing']
      }

      handler()

      window.addEventListener('pushstate', handler)
      window.addEventListener('popstate', handler)

      mount(state, dispatch)
    }
  })
}
