import { expect } from 'chai';
import sinon from 'sinon-sandbox';
import aphrodite from 'aphrodite';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';

import ampAphroditeInterfaceFactory from '../src/ampAphroditeInterfaceFactory';

describe('ampAphroditeInterfaceFactory', () => {
  const { StyleSheetTestUtils } = aphrodite;
  const ampAphroditeInterface = ampAphroditeInterfaceFactory(aphroditeInterface);
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
});