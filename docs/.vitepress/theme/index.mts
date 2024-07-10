import DefaultTheme from 'vitepress/theme'
import './tailwind.css'
import Player from './components/player.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Player', Player)
  }
}
