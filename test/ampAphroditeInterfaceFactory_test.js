import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import {
  StyleSheetTestUtils,
  injectAndGetClassName,
  defaultSelectorHandlers,
  flushToStyleTag,
} from 'aphrodite';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';

import * as isAmp from '../src/utils/isAmp';

import ampAphroditeInterfaceFactory from '../src/ampAphroditeInterfaceFactory';

describe('ampAphroditeInterfaceFactory', () => {
  const ampAphroditeInterface = ampAphroditeInterfaceFactory(
    aphroditeInterface,
    injectAndGetClassName,
    defaultSelectorHandlers,
    flushToStyleTag,
  );
  let aphroditeInterfaceResolveSpy;
  let aphroditeInterfaceResolveLTRSpy;
  let aphroditeInterfaceResolveRTLSpy;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    aphroditeInterfaceResolveSpy = sinon.spy(aphroditeInterface, 'resolve');
    aphroditeInterfaceResolveLTRSpy = sinon.spy(aphroditeInterface, 'resolveLTR');
    aphroditeInterfaceResolveRTLSpy = sinon.spy(aphroditeInterface, 'resolveRTL');
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
    it('calls aphroditeInterface.resolve method', () => {
      ampAphroditeInterface.resolve([]);
      expect(aphroditeInterfaceResolveSpy.callCount).to.equal(1);
    });
  });

  describe('.resolveLTR()', () => {
    it('calls aphroditeInterface.resolveLTR method', () => {
      ampAphroditeInterface.resolveLTR([]);
      expect(aphroditeInterfaceResolveLTRSpy.callCount).to.equal(1);
    });
  });

  describe('.resolveRTL()', () => {
    it('calls aphroditeInterface.resolveRTL method', () => {
      ampAphroditeInterface.resolveRTL([]);
      expect(aphroditeInterfaceResolveRTLSpy.callCount).to.equal(1);
    });
  });

  describe('isAmp set to true', () => {
    beforeEach(() => {
      sinon.stub(isAmp, 'default').returns(true);
    });

    afterEach(() => {
      sinon.restore();
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
});
