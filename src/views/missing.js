
import { div, text } from '../lib/vnodes/html'

const Text = (h, data) => h([text(data)])

const Missing = (state, dispatch) => {
  return div({ class: 'missing' }, [
    Text(div, '404 NOT FOUND')
  ])
}

export default {
  view: Missing,
  init: () => {
    console.log('missing')
  }
}
