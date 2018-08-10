import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'

export const createCaptureComponent = reloadableComponents => {
  return class Capture extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
    }

    report = (moduleId) => {
      reloadableComponents.moduleLoaded(moduleId)
    }

    componentWillMount () {
      reloadableComponents.reset()
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
