import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import {
  flushToStyleTag,
  injectAndGetClassName,
  defaultSelectorHandlers,
} from 'aphrodite';

import ampAphroditeInterfaceFactory from './ampAphroditeInterfaceFactory';

export default ampAphroditeInterfaceFactory(
  aphroditeInterface,
  injectAndGetClassName,
  defaultSelectorHandlers,
  flushToStyleTag,
);
