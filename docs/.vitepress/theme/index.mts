import DefaultTheme from 'vitepress/theme'
import './tailwind.css'

// Auto load all components from components level folder
import * as Components from './components/index'
const ComponentNames = Object.getOwnPropertyNames(Components)

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    ComponentNames.map((name) => {
      app.component(name, Components[name])
    })
  }
}
