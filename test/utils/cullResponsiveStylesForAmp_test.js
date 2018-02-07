import { expect } from 'chai';
import cullResponsiveStylesForAmp, { AMP_MAX_WIDTH } from '../../src/utils/cullResponsiveStylesForAmp';

describe('cullResponsiveStylesForAmp', () => {
  it('culls (1)', () => {
    expect(cullResponsiveStylesForAmp({
      _name: 'foo',
      _definition: {
        position: 'relative',
        marginLeft: -12,
        marginRight: -12,
        [`@media (min-width: ${AMP_MAX_WIDTH + 1}px)`]: {
          margin: 0,
        },
        [`@media (max-width: ${AMP_MAX_WIDTH}px)`]: {
          margin: 10,
        },
      },
    })).to.eql({
      _name: 'foo',
      _definition: {
        position: 'relative',
        marginLeft: -12,
        marginRight: -12,
        margin: 10,
      },
    });
  });

  it('culls (2)', () => {
    expect(cullResponsiveStylesForAmp({
      _name: 'bar',
      _definition: {
        position: 'absolute',
        marginRight: -12,
        '@media (min-width: 844px)': {
          margin: 0,
        },
        '@media (max-width: 800px)': {
          margin: 1,
        },
        [`@media (min-width: ${AMP_MAX_WIDTH}px) and (max-width: 900px)`]: {
          margin: 2,
        },
        [`@media (max-width: ${AMP_MAX_WIDTH - 1}px)`]: {
          margin: 5,
        },
      },
    })).to.eql({
      _name: 'bar',
      _definition: {
        position: 'absolute',
        marginRight: -12,
        margin: 1,
        [`@media (min-width: ${AMP_MAX_WIDTH}px) and (max-width: 900px)`]: {
          margin: 2,
        },
        [`@media (max-width: ${AMP_MAX_WIDTH - 1}px)`]: {
          margin: 5,
        },
      },
    });
  });

  it('culls max-width', () => {
    expect(cullResponsiveStylesForAmp({
      _name: 'bar',
      _definition: {
        position: 'absolute',
        marginRight: -12,
        '@media (max-width: 900px)': {
          margin: 1,
        },
      },
    })).to.eql({
      _name: 'bar',
      _definition: {
        position: 'absolute',
        marginRight: -12,
        margin: 1,
      },
    });
  });

  it('culls decimals', () => {
    expect(cullResponsiveStylesForAmp({
      _name: 'bar',
      _definition: {
        position: 'absolute',
        marginRight: -12,
        '@media (min-width: 744.444px)': {
          margin: 0,
        },
        '@media (max-width: 666666.6666px)': {
          margin: 999,
        },
        '@media (min-width: 8888.111px) and (max-width: 99999px)': {
          margin: 2,
        },
      },
    })).to.eql({
      _name: 'bar',
      _definition: {
        position: 'absolute',
        marginRight: -12,
        margin: 999,
      },
    });
  });

  it('culls: leaves styles alone', () => {
    expect(cullResponsiveStylesForAmp({
      position: 'absolute',
    })).to.eql({
      position: 'absolute',
    });
  });

  it('culls: preserves arrays', () => {
    expect(cullResponsiveStylesForAmp([{
      position: 'absolute',
    }])).to.eql([{
      position: 'absolute',
    }]);
  });

  it('empty array', () => {
    expect(cullResponsiveStylesForAmp([])).to.eql([]);
  });

  it('[null]', () => {
    expect(cullResponsiveStylesForAmp([null])).to.eql([null]);
  });

  it('null', () => {
    expect(cullResponsiveStylesForAmp(null)).to.equal(null);
  });

  it('undefined', () => {
    expect(cullResponsiveStylesForAmp(undefined)).to.equal(undefined);
  });
});
