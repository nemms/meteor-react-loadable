import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'

export const createCaptureComponent = preloadableComponents => {
  return class Capture extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
    }

    report = (moduleId) => {
      preloadableComponents.moduleLoaded(moduleId)
    }

    componentWillMount () {
      preloadableComponents.reset()
    }

    render () {
      const { children } = this.props
      return (
        <Loadable.Capture report={this.report}>
          {children}
        </Loadable.Capture>
      )
    }
  }
}
