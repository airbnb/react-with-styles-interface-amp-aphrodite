import aphroditeInterface from 'react-with-styles-interface-aphrodite/no-important';
import {
  flushToStyleTag,
  injectAndGetClassName,
  defaultSelectorHandlers,
} from 'aphrodite/no-important';

import ampAphroditeInterfaceFactory from './ampAphroditeInterfaceFactory';

export default ampAphroditeInterfaceFactory(
  aphroditeInterface,
  injectAndGetClassName,
  defaultSelectorHandlers,
  flushToStyleTag,
);
