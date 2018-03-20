import { flushToStyleTag, injectAndGetClassName } from 'aphrodite/lib/inject';
import { defaultSelectorHandlers } from 'aphrodite/lib/generate';

import cullResponsiveStylesForAmp from './utils/cullResponsiveStylesForAmp';

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

function withAmp(styles, create) {
  return {
    className: injectAndGetClassName(
      false,
      styles.map(cullResponsiveStylesForAmp).map(arg => cssArgNormalizer(arg, create)),
      defaultSelectorHandlers,
    ),
  };
}

export default aphroditeInterface => ({
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
    const { create } = aphroditeInterface;
    return withAmp(styles, create);
  },

  resolveLTR(styles) {
    const { createLTR } = aphroditeInterface;
    return withAmp(styles, createLTR);
  },

  resolveRTL(styles) {
    const { createRTL } = aphroditeInterface;
    return withAmp(styles, createRTL);
  },

  // Flushes all buffered styles to a style tag. Required for components
  // that depend upon previous styles in the component tree (i.e.
  // for calculating container width, including padding/margin).
  flush() {
    flushToStyleTag();
  },
});
