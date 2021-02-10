
import { div, iframe, input } from '../lib/vnodes/html'

const updateSrc = (state, dispatch) => data => {
  state.src = data
  return state
}

const Home = (state, dispatch) => {
  return div({ class: 'home' }, [
    div({ class: 'home-main' }, [
      input({
        type: 'text',
        placeholder: 'https://example.com',
        value: state.src,
        onchange: event => {
          dispatch(updateSrc, event.target.value)
        }
      }),
      div({ class: 'home-iframes' }, [
        div([
          iframe({ width: '320', height: '568.889', src: state.src })
        ]),
        div([
          iframe({ width: '375', height: '666.667', src: state.src })
        ]),
        div([
          iframe({ width: '425', height: '755.556', src: state.src })
        ])
      ])
    ])
  ])
}

export default {
  view: Home,
  init: () => {
    console.log('/home')
  }
}
