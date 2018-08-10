import PreloadableComponents from '../both/PreloadableComponents'

class PreloadableComponentsServer extends PreloadableComponents {
  /**
   * All modules by id which are actually rendered in the current
   * rendering tree.
   */
  loadedModules = []

  /**
   * Preload all components which are flagged for server side rendering
   * and therefore are registered for preloading.
   */
  preloadComponents () {
    const components = Object.values(this.components)
    const promises = components.map(component => component.preload())
    return Promise.all(promises)
  }

  moduleLoaded (moduleId) {
    this.loadedModules.push(moduleId)
  }

  /**
   * Assign all loaded modules to a variable which must be passed in a
   * script tag to the client. This might be added either to head or body.
   */
  getLoadedModulesScriptTag () {
    return `<script>window.${PreloadableComponents.clientVariable} = ${JSON.stringify(this.loadedModules)}</script>`
  }

  // Must be reset before modules get rendered again
  reset () {
    this.loadedModules = []
  }
}

export default PreloadableComponentsServer
