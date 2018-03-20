import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import aphrodite from 'aphrodite';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';

import ampAphroditeInterfaceFactory from '../src/ampAphroditeInterfaceFactory';

describe('ampAphroditeInterfaceFactory', () => {
  const { StyleSheetTestUtils } = aphrodite;
  const ampAphroditeInterface = ampAphroditeInterfaceFactory(aphroditeInterface);

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    sinon.restore();
  });

  describe('.create()', () => {
    it('processes the styles with Aphrodite', () => {
      expect(ampAphroditeInterface.create({
        foo: {
          color: 'red',
        },
      })).to.eql({
        foo: {
          _definition: {
            color: 'red',
          },
          _len: 15,
          _name: 'foo_137u7ef',
        },
      });
    });
  });

  describe('.createLTR()', () => {
    it('processes the styles with Aphrodite', () => {
      expect(ampAphroditeInterface.createLTR({
        foo: {
          left: 10,
        },
      })).to.eql({
        foo: {
          _definition: {
            left: 10,
          },
          _len: 11,
          _name: 'foo_lg4jz7',
        },
      });
    });
  });

  describe('.createRTL()', () => {
    it('processes the styles with Aphrodite', () => {
      expect(ampAphroditeInterface.createRTL({
        foo: {
          left: 10,
        },
      })).to.eql({
        foo: {
          _definition: {
            right: 10,
          },
          _len: 12,
          _name: 'foo_6eoou0',
        },
      });
    });
  });

  describe('.resolve()', () => {
    it('converts inline styles to classNames', () => {
      expect(ampAphroditeInterface.resolve([
        {
          left: 10,
        },
      ])).to.eql({ className: 'inlineStyle_lg4jz7' });
    });
  });

  describe('.resolveLTR()', () => {
    it('converts inline styles to classNames', () => {
      expect(ampAphroditeInterface.resolveLTR([
        {
          left: 10,
        },
      ])).to.eql({ className: 'inlineStyle_lg4jz7' });
    });
  });

  describe('.resolveRTL()', () => {
    it('converts inline styles to classNames', () => {
      expect(ampAphroditeInterface.resolveRTL([
        {
          left: 10,
        },
      ])).to.eql({ className: 'inlineStyle_6eoou0' });
    });
  });
});
