
import * as router from '../lib/routerStore'
import { a, text } from '../lib/vnodes/html'

const onclick = (state, data) => event => {
  event.preventDefault()

  console.log(data)

  // NOTE: Using this action directly rather than through dispatch prevents
  // scheduling an unessecary render since router.actions.link doesn't return
  // any state. Now we're only triggering the event lisenters for the custom
  // pushstate event or the History API's popstate event.

  // router.effects.routerLink(state.router, { to: data.to, query: data.query })()
  router.routerLink(state)({ to: data.to, query: data.query })
}

const Link = state => (data, content) => {
  const props = {
    class: state.router.to === data.to && '-active',
    href: data.to,
    onclick: onclick(state, data)
  }

  return a(props, [text(content)])
}

export default Link
