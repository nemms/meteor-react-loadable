class PreloadableComponents {
  /**
   * Variable name to which all loaded module ids gets assigned.
   */
  static clientVariable = '__meteorReactLoadableModules__'

  /**
   * Holds all components as a key-value-pare of
   * [moduleId]: component
   */
  components = {}

  /**
   * Add a MeteorLoadable component with its corresponding module id.
   */
  registerComponent (component, moduleId) {
    this.components[moduleId] = component
  }

  /**
   * Preloads all given components.
   * It needs a different implementation for server and client!
   */
  preloadComponents () {
    throw new Error('`preloadComponents` must be implemented in subclass')
  }
}

export default PreloadableComponents
