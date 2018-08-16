# Meteor Wrapper for React Loadable

[React Loadable](https://github.com/jamiebuilds/react-loadable) is great! 
And it works just perfectly fine with Meteor as long as you only use it on the client.

When using React Loadable with server side rendering things get tricky. This
package tries to solve that.


## Install / prerequisites

```
meteor add nemms:meteor-react-loadable
```

Make sure you also have the necessary NPM modules installed:

```
meteor npm install --save react-loadable prop-types
```

Of course, React needs to be installed as well, but I guess since you are looking
for this package you already have it ;)


## Usage

The usage is pretty similar to [react-loadable](https://github.com/jamiebuilds/react-loadable#------------server-side-rendering).

Always import the package like so:
```javascript
import MeteorLoadable from 'meteor/nemms:meteor-react-loadable'
```

### 1. Define your loadable components

Instead of the original `Loadable` component you have to use `MeteorLoadable`.

```javascript
const MyComponent = MeteorLoadable({
  loader: () => import('./components/MyComponent'),
  moduleId: require.resolve('./components/MyComponent'),
})
```

Additionally to the `loader` you need to provide the `moduleId`. This is the same as the
absolute path of the module (including the file extension). Alternatively to `require.resolve()`
your module you can also just pass the absolute path: `/imports/components/MyComponent.js`

If you ommit the `moduleId` server side rendering won't work properly.

> Note: You **don't** need to add the react-loadable babel plugin.

> Oh, but don't forget to pass your loading component.

### 2. Preloading all your loadable components on the server

All components which might be rendered on the server must be loaded beforehand. 
Since they will be imported asynchronously they otherwise wouldn't be available on render.

```javascript
onPageLoad(async (sink) => {
  await MeteorLoadable.preloadComponents()

  const html = renderToString(
    <MyApp />
  )
  
  // …
})
```

### 3. Finding out which components were rendered

Now we are done for the app to be rendered properly on the server. But there 
is still the client which also needs the same components preloaded before
rendering.

For preparation we need to wrap our app with `MeteorLoadable.Capture`.
This will receive the information which components got actually rendered.

After rendering we need to pass this information to the client. MeteorLoadable
takes care of it, you only need to append the generated script tag to the 
body. This contains all module ids the client can finally load.

```javascript
Meteor.startup(async () => {
  await MeteorLoadable.preloadComponents()

  onPageLoad((sink) => {
    const html = renderToString(
      <MeteorLoadable.Capture>
        <MyApp />
      </MeteorLoadable.Capture>
    )

    sink.appendToBody(MeteorLoadable.getLoadedModulesScriptTag())

    // …
  })
})
```

### 4. Preload components on the client

Similar to how we preloaded the components on the server we need to preload
them on the client before we hydrate the app.

```javascript
onPageLoad(async () => {
  await MeteorLoadable.preloadComponents()

  hydrate(<MyApp />, document.getElementById('root'))
})
```

That's it. Now it should work as expected.

## Remarks

- This is the very first version. We already use it in production. But
it might not be working for others. Feel free to contribute to it.
- Currently only one level of dynamic imports is working. If you define a 
`MeteorLoadable` in a component which is defined as a `MeteorLoadable` itself
they won't be preloaded properly and React will throw errors.
- Other than with Webpack it's currently not possible to integrate the 
dynamic components into the bundle so the client would have it immediately.
The client needs to import the components before the app can be hydrated.
But I would argue the benefit is still high enough in contrast to integrate
everything into one large bundle.
