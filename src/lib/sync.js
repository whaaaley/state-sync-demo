
import app from './router'

const update = ({ sync }) => data => {
  data.sync = sync
  return data
}

const init = ({ sync }) => {
  sync.id = Math.random().toString(16).substr(2)
  return { sync }
}

const sync = ({ state, pages, rewrites, effects, mount }) => {
  let updateLock = false
  let scrollLock = false

  const syncChannel = new BroadcastChannel('sync')

  state.sync = {
    id: null,
    src: 'http://localhost:3000'
  }

  state.pages = {
    '/sync': console.log()
  }

  app({
    state,
    pages,
    rewrites,
    effects: (state, dispatch) => {
      effects(state, dispatch)

      if (!updateLock) {
        syncChannel.postMessage({
          type: 'update',
          id: state.sync.id,
          state: state
        })
      }

      updateLock = false
    },
    mount: (state, dispatch) => {
      mount(state, dispatch)

      const el = document.documentElement

      syncChannel.onmessage = event => {
        const data = event.data

        if (data.id === state.sync.id) {
          console.log('onmessage event was ignored')
          return // do nothing
        }

        if (data.type === 'update') {
          updateLock = true
          dispatch(update, data.state)
        }

        if (data.type === 'scroll') {
          scrollLock = true

          const x = (el.scrollWidth - el.clientWidth) * data.x
          const y = (el.scrollHeight - el.clientHeight) * data.y

          window.scroll(x, y)
        }
      }

      const handler = () => {
        if (!scrollLock) {
          syncChannel.postMessage({
            type: 'scroll',
            id: state.sync.id,
            x: el.scrollLeft / (el.scrollWidth - el.clientWidth),
            y: el.scrollTop / (el.scrollHeight - el.clientHeight)
          })
        }

        scrollLock = false
      }

      if (state.router.to === '/demo') {
        dispatch(init)
        window.addEventListener('scroll', handler)
      } else {
        window.removeEventListener('scroll', handler)
      }
    }
  })
}

// NOTE
// + Should I swap PROD for NODE_ENV === 'production'?

// export default params => (PROD ? app : sync)(params)

// just for the demo, under normal conditions we'd use the other export
export default params => sync(params)
