import { createLoadableComponent } from '../both/create-loadable-component'
import PreloadableComponents from './PreloadableComponents'

const preloadableComponents = new PreloadableComponents()

const MeteorLoadable = createLoadableComponent(preloadableComponents)

MeteorLoadable.preloadComponents = () => {
  return preloadableComponents.preloadComponents()
}

export default MeteorLoadable
