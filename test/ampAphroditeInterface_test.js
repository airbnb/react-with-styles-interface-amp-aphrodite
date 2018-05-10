import { expect } from 'chai';
import wrap from 'mocha-wrap';
import React from 'react';
import { StyleSheetServer } from 'aphrodite';
import ReactDOMServer from 'react-dom/server';
import ampAphroditeInterface from '../src/ampAphroditeInterface';

describe('ampAphroditeInterface', () => {
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
      ReactDOMServer.renderToString(React.createElement('div', { ...ampAphroditeInterface.resolve([styles.foo]) }))
    ));

    expect(result.css.content).to.include('!important');
  });

  wrap()
    .withOverride(() => process.env, 'AMP', () => '1')
    .it('does not use !important', () => {
      const styles = ampAphroditeInterface.create({
        foo: {
          color: 'red',
        },
      });
      const result = StyleSheetServer.renderStatic(() => (
        ReactDOMServer.renderToString(React.createElement('div', { ...ampAphroditeInterface.resolve([styles.foo]) }))
      ));

      expect(result.css.content).not.to.include('!important');
    });
});
