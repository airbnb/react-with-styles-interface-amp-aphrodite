// Should this be configurable?
export const AMP_MAX_WIDTH = 743;

// removes all media query styles >= AMP_MAX_WIDTH
// and when it finds rules that match @media (max-width:___px)
// where ___ >= AMP_MAX_WIDTH, it will merge in those rules without the media query
export default function cullResponsiveStylesForAmp(arg) {
  if (Array.isArray(arg)) return arg.map(cullResponsiveStylesForAmp);
  if (!arg) return arg;

  // eslint-disable-next-line no-underscore-dangle
  const definition = arg._definition;
  if (!definition) return arg;

  const newDefinition = Object.keys(definition).reduce((acc, key) => {
    if (!key.startsWith('@media')) {
      acc[key] = definition[key];
      return acc;
    }

    let matches = key.match(/^@media \(max-width: ([\d.]+)px\)$/);
    if (matches && parseInt(matches[1], 10) >= AMP_MAX_WIDTH) {
      return Object.assign(acc, definition[key]);
    }

    matches = key.match(/min-width: ([\d.]+)/);
    if (matches && parseInt(matches[1], 10) >= AMP_MAX_WIDTH + 1) {
      return acc;
    }

    acc[key] = definition[key];
    return acc;
  }, {});

  return {
    ...arg,
    _definition: newDefinition,
  };
}
