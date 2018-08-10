import Loadable from 'react-loadable'

export const createLoadableComponent = preloadableComponents => {
  return ({ moduleId, ...props }) => {
    const LoadableComponent = Loadable({
      modules: [moduleId],
      ...props,
    })

    // If a moduleId is given we consider this component to be
    // possibly rendered on the server. Otherwise the component
    // won't be rendered successfully.
    if (moduleId) {
      preloadableComponents.registerComponent(LoadableComponent, moduleId)
    }

    return LoadableComponent
  }
}
