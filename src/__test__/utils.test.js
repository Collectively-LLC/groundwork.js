import {
  urlJoin,
  only,
  epoch,
  max,
  mixin,
  isApiVersion
} from '../utils';

describe('(utils.test.js)', () => {
  describe('urlJoin', () => {
    it('should build urls', () => {
      const u = urlJoin('profiles', 'checkPassword');
      const uu = urlJoin('profiles/', 'checkPassword//', '?a=1');
      const uuu = urlJoin('profiles', undefined);
      expect(u).toEqual('profiles/checkPassword');
      expect(uu).toEqual('profiles/checkPassword?a=1');
      expect(uuu).toEqual('profiles/');
    });
  });

  describe('only', () => {
    it('should return an obj with only listed fields', () => {
      const orig = {
        foo: 1,
        bar: 2,
        baz: [1, 2, 3]
      };
      const filtered = only(['foo', 'bar'], orig);
      expect(filtered).toEqual(jasmine.objectContaining({
        foo: 1, bar: 2
      }));
      expect(filtered).not.toEqual(jasmine.objectContaining({
        baz: [1, 2, 3]
      }));
    });

    it('should return the whole object back', () => {
      const orig = {
        foo: 1
      };
      const filtered = only(['foo', 'bar'], orig);
      expect(filtered).toEqual(jasmine.objectContaining({
        foo: 1
      }));
      expect(filtered).not.toEqual(jasmine.objectContaining({
        baz: [1, 2, 3]
      }));
    });
  });

  describe('epoch', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('returns the epoch time without milliseconds', () => {
      const baseTime = new Date(2013, 9, 23);
      const unixEpoch = Math.floor(baseTime / 1000);

      jasmine.clock().mockDate(baseTime);
      expect(epoch()).toEqual(unixEpoch);
    });

    it('returns a specific date in epoch time without milliseconds', () => {
      const baseTime = new Date(2015, 10, 13);
      const unixEpoch = Math.floor(baseTime / 1000);

      expect(epoch(2015, 10, 13)).toEqual(unixEpoch);
    });
  });

  describe('max', () => {
    it('returns numbers below a threshold', () => {
      const xs = [0, -1, 20, 12, 40, 49, -1000];
      const ms = xs.map(x => max(x));
      ms.forEach((x) => {
        expect(x).toBeLessThan(50);
      });
    });

    it('locks numbers to a default threshold', () => {
      const xs = [50, 51, 2200342, 34234, 10000012323423];
      const ms = xs.map(x => max(x));
      ms.forEach((x) => {
        expect(x).toEqual(50);
      });
    });

    it('locks numbers to an arbitrary threshold', () => {
      const xs = [20, 51, 2200342, 34234, 10000012323423];
      const ms = xs.map(x => max(x, 20));
      ms.forEach((x) => {
        expect(x).toEqual(20);
      });
    });

    it('returns NaNs as 0', () => {
      const xs = [undefined, 'bob', false, { foo: 1 }, ['bil', 1]];
      const ms = xs.map(x => max(x));
      ms.forEach((x) => {
        expect(x).toEqual(0);
      });
    });
  });

  describe('mixin', () => {
    it('mixes in properties from a source into a target', () => {
      class Target { parent() { return true; }}
      class Foo { hello() { return this.parent(); } }
      class Bar { there() { return !this.hello(); } }

      mixin(Target, Foo, Bar);

      const t = new Target();
      expect([t.hello, t.there].every(f => typeof f === 'function')).toBe(true);
      expect(t.hello()).toBe(true);
      expect(t.there()).toBe(false);
    });
  });

  describe('isApiVersion', () => {
    it('matches a string against the api version format', () => {
      // all true
      const ts = [
        '2012-03-23',
        '1908-01-01',
        '3120-23-36', // doesn't check for valid dates
        '2016-03-29:12',
        '2016-03-29:1',
        '2016-03-29:122349923',
        'default'
      ];

      // all false
      const fs = [
        12,
        [],
        {},
        '2013',
        '1-1-1',
        '2012-',
        '2013-2-',
        '2013-2-1:a',
        '2013-02-01: 1a',
        '2013-02-01 a',
        '2013-02-01:',
        'DEFAULLT'
      ];

      ts.forEach((t) => {
        expect(isApiVersion(t)).toBe(true);
      });

      fs.forEach((f) => {
        expect(isApiVersion(f)).toBe(false);
      });
    });
  });
});
