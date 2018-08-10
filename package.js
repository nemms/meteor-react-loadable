/* global Package */

Package.describe({
  name: 'nemms:meteor-react-loadable',
  version: '0.1.0',
  summary: 'Wrapper for react-loadable to enable server side rendering with proper hydration on the client.',
  git: 'https://github.com/nemms/meteor-react-loadable',
  documentation: 'README.md',
})

Package.onUse(api => {
  api.versionsFrom('1.7')

  api.use('ecmascript')

  api.mainModule('client/index.js', 'client')
  api.mainModule('server/index.js', 'server')
})
