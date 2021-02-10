
import app from './lib/sync'

import Home from './views/home'
import Demo from './views/demo'
import Missing from './views/missing'

app({
  state: {
    src: PROD ? 'http://localhost:3000/demo' : 'https://state-sync-demo.netlify.app/demo',
    demo: {
      foobar: 'foobar'
    }
  },
  pages: {
    '/': Home,
    '/demo': Demo,
    '/missing': Missing
  },
  rewrites: {
    // '/detail': /^\/dp\/[0-9a-f]{24}$/i,
    // '/user': /^\/user\/\w+$/i
  },
  effects: (state, dispatch) => {},
  mount: (state, dispatch) => {}
})
