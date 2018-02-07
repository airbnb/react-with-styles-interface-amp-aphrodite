# react-with-styles-interface-amp-aphrodite <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Interface to use [react-with-styles][react-with-styles] with [Aphrodite][aphrodite] and [Amp][amp].

[package-url]: https://npmjs.org/package/react-with-styles-interface-amp-aphrodite
[npm-version-svg]: http://versionbadg.es/airbnb/react-with-styles-interface-amp-aphrodite.svg
[travis-svg]: https://travis-ci.org/airbnb/react-with-styles-interface-amp-aphrodite.svg
[travis-url]: https://travis-ci.org/airbnb/react-with-styles-interface-amp-aphrodite
[deps-svg]: https://david-dm.org/airbnb/react-with-styles-interface-amp-aphrodite.svg
[deps-url]: https://david-dm.org/airbnb/react-with-styles-interface-amp-aphrodite
[dev-deps-svg]: https://david-dm.org/airbnb/react-with-styles-interface-amp-aphrodite/dev-status.svg
[dev-deps-url]: https://david-dm.org/airbnb/react-with-styles-interface-amp-aphrodite#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/react-with-styles-interface-amp-aphrodite.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/react-with-styles-interface-amp-aphrodite.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/react-with-styles-interface-amp-aphrodite.svg
[downloads-url]: http://npm-stat.com/charts.html?package=react-with-styles-interface-amp-aphrodite

[react-with-styles]: https://github.com/airbnb/react-with-styles
[aphrodite]: https://github.com/khan/aphrodite
[amp]: https://www.ampproject.org/

## Import

```js
import ampAphroditeInterface from 'react-with-styles-interface-amp-aphrodite';
```

or when you need to [disable `!important`](https://github.com/Khan/aphrodite#disabling-important):

```js
import ampAphroditeInterface from 'react-with-styles-interface-amp-aphrodite/no-important';
```

## Amp Support

If your app is being rendered with Amp, `react-with-styles-interface-amp-aphrodite` expects you to set
`process.env.AMP` to `'true'` at compile time. This can readily be accomplished by using the following
option in your webpack config:
```
{
  name: 'amp',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.AMP': 'true',
    }),
  ],
}
```

## Built-in RTL support

`react-with-styles-interface-amp-aphrodite` has built-in LTR/RTL context support. Specifically, it uses [rtl-css-js](https://github.com/kentcdodds/rtl-css-js) to automatically flip styles (`margin`, `padding`, `float`, `textAlign`, etc.) that were written for an LTR page when your app is wrapped in [react-with-direction](https://github.com/airbnb/react-with-direction)'s `DirectionProvider` with direction set to `DIRECTIONS.RTL`.

It accomplishes this by providing a directional `create` and `resolve` method. `react-with-styles` automatically uses the correct create method based on the direction value set in context and then passes down the appropriate `resolve` method as a prop named `css`.

For instance, if you were to write your styles as follows:

```jsx
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import ampAphroditeInterface from 'react-with-styles-interface-amp-aphrodite';
import { withStyles, css } from 'react-with-styles';

ThemedStyleSheet.registerTheme({});
ThemedStyleSheet.registerInterface(ampAphroditeInterface);

...
mp-a
function MyComponent({ css }) {
  return <div {...css(styles.container)}>Hello World</div>;
}

export default withStyles(() => ({
  container: {
    background: '#fff',
    float: 'left',
  },
}))(MyComponent);
```

The generated css for an app where you set `<DirectionProvider direction={DIRECTIONS.LTR}>` at the top would look like:

```css
.container_r5r4of {
  background: #fff !important;
  float: 'left' !important;
}
```

whereas if you had set `<DirectionProvider direction={DIRECTIONS.RTL}>`, the generated css would be:
```css
.container_kui6s4 {
  background: #fff !important;
  float: 'right' !important;
}
```

If you used an inline style instead:

```jsx
import { css } from 'react-with-styles';

export default function MyComponent() {
  return <div {...css({ background: '#fff', float: 'left' })}>Hello World</div>;
}
```

In the case where `<DirectionProvider direction={DIRECTIONS.LTR}>` is wrapping your component, this would map to a `style={{ background: '#fff', float: 'left' }}` on the div in question. If `<DirectionProvider direction={DIRECTIONS.RTL}>` is present instead, this would simply apply `style={{ background: '#fff', float: 'right' }}` to the div.
