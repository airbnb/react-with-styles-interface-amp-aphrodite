import cullResponsiveStylesForAmp from './utils/cullResponsiveStylesForAmp';
import isAmp from './utils/isAmp';

const INLINE_STYLE_KEY = 'inlineStyle';

// Replaces inlines styles with styles that will be converted to
// class names. We do this because AMP doesn't support inline styles.
const cssArgNormalizer = (arg, create) => {
  if (Array.isArray(arg)) return arg.map(style => cssArgNormalizer(style, create));

  // NOTE: We rely on the ducktype of style objects as defined in StyleSheet#create,
  // https://github.com/Khan/aphrodite/blob/35e22c4db3e6de451272284ddf811fb54e04f447/src/exports.js#L27
  //       it's always possible that this will change in the future and then
  //       this code will have to be updated to match...
  // eslint-disable-next-line no-underscore-dangle
  if (!arg || arg._definition) return arg;
  return create({ [INLINE_STYLE_KEY]: arg })[INLINE_STYLE_KEY];
};

function withAmp(
  styles,
  resolve,
  create,
  injectAndGetClassName,
  defaultSelectorHandlers,
) {
  if (isAmp()) {
    return {
      className: injectAndGetClassName(
        false,
        styles.map(cullResponsiveStylesForAmp).map(arg => cssArgNormalizer(arg, create)),
        defaultSelectorHandlers,
      ),
    };
  }

  return resolve(styles);
}

export default (
  aphroditeInterface,
  injectAndGetClassName,
  defaultSelectorHandlers,
  flushToStyleTag,
) => {
  // In case someone is calling this function directly without supplying these
  // aphrodite function arguments, we want to add a fallback behavior to avoid
  // breaking them.
  // TODO: Remove this block in next semver-major change
  if (!injectAndGetClassName || !defaultSelectorHandlers || !flushToStyleTag) {
    console.warn('You appear to be using ampAphroditeInterfaceFactory in a deprecated a buggy way. Please pass in `injectAndGetClassName`, `defaultSelectorHandlers`, and `flushToStyleTag` as arguments to this function.');
    ({
      injectAndGetClassName, // eslint-disable-line no-param-reassign
      defaultSelectorHandlers, // eslint-disable-line no-param-reassign
      flushToStyleTag, // eslint-disable-line no-param-reassign
    } = require('aphrodite')); // eslint-disable-line global-require
  }

  return {
    create(styleHash) {
      return aphroditeInterface.create(styleHash);
    },

    createLTR(styleHash) {
      return aphroditeInterface.createLTR(styleHash);
    },

    createRTL(styleHash) {
      return aphroditeInterface.createRTL(styleHash);
    },

    resolve(styles) {
      const { resolve, create } = aphroditeInterface;
      return withAmp(
        styles,
        resolve,
        create,
        injectAndGetClassName,
        defaultSelectorHandlers,
      );
    },

    resolveLTR(styles) {
      const { resolveLTR, createLTR } = aphroditeInterface;
      return withAmp(
        styles,
        resolveLTR,
        createLTR,
        injectAndGetClassName,
        defaultSelectorHandlers,
      );
    },

    resolveRTL(styles) {
      const { resolveRTL, createRTL } = aphroditeInterface;
      return withAmp(
        styles,
        resolveRTL,
        createRTL,
        injectAndGetClassName,
        defaultSelectorHandlers,
      );
    },

    // Flushes all buffered styles to a style tag. Required for components
    // that depend upon previous styles in the component tree (i.e.
    // for calculating container width, including padding/margin).
    flush() {
      flushToStyleTag();
    },
  };
};
