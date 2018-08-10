import { createLoadableComponent } from '../both/create-loadable-component'
import { createCaptureComponent } from './create-capture-component'
import PreloadableComponents from './PreloadableComponents'

const preloadableComponents = new PreloadableComponents()

const MeteorLoadable = createLoadableComponent(preloadableComponents)

MeteorLoadable.Capture = createCaptureComponent(preloadableComponents)

MeteorLoadable.preloadComponents = () => {
  return preloadableComponents.preloadComponents()
}

MeteorLoadable.getLoadedModulesScriptTag = () => {
  return preloadableComponents.getLoadedModulesScriptTag()
}

export default MeteorLoadable
