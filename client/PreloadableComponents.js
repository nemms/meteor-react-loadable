import PreloadableComponents from '../both/PreloadableComponents'

class PreloadableComponentsClient extends PreloadableComponents {
  /**
   * Preload all components which were also loaded on the server
   * for the given DOM representation.
   */
  preloadComponents () {
    const modules = window[PreloadableComponents.clientVariable]
    const promises = modules.map(moduleId => this.components[moduleId].preload())
    return Promise.all(promises)
  }
}

export default PreloadableComponentsClient
