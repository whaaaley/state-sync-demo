
import { div, input, text } from '../lib/vnodes/html'

const foobarAction = ({ demo }, dispatch) => data => {
  demo.foobar = data
  return { demo }
}

const Demo = (state, dispatch) => {
  return div({ class: 'demo' }, [
    div([
      text(state.sync.id)
    ]),
    div([
      text(state.demo.foobar),
      input({
        type: 'text',
        value: state.demo.foobar,
        oninput: event => {
          console.log('oninput')
          // console.log('bitch', state.stateSync)
          dispatch(foobarAction, event.target.value)
        }
      })
    ]),
    div(),
    div(),
    div(),
    div(),
    div()
  ])
}

export default {
  view: Demo,
  init: () => {
    console.log('/demo')
  }
}
