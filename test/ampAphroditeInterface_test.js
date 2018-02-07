import { expect } from 'chai';
import React from 'react';
import { css, StyleSheetServer, StyleSheetTestUtils } from 'aphrodite';
import ReactDOMServer from 'react-dom/server';
import ampAphroditeInterface from '../src/ampAphroditeInterface';

describe('ampAphroditeInterface', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('is an interface', () => {
    expect(typeof ampAphroditeInterface.create).to.equal('function');
    expect(typeof ampAphroditeInterface.createLTR).to.equal('function');
    expect(typeof ampAphroditeInterface.createRTL).to.equal('function');
    expect(typeof ampAphroditeInterface.resolve).to.equal('function');
    expect(typeof ampAphroditeInterface.resolveLTR).to.equal('function');
    expect(typeof ampAphroditeInterface.resolveRTL).to.equal('function');
  });

  it('uses !important', () => {
    const styles = ampAphroditeInterface.create({
      foo: {
        color: 'red',
      },
    });
    const result = StyleSheetServer.renderStatic(() => (
      ReactDOMServer.renderToString(React.createElement('div', { className: css(styles.foo) }))
    ));
    expect(result.css.content.includes('!important')).to.equal(true);
  });
});
