/* eslint-disable max-len */

import Groundwork from 'lib/Groundwork';
import * as constants from 'lib/constants';

describe('(Groundwork.test.js)', () => {
  it('imports correctly', () => {
    const gw = new Groundwork();
    expect(Groundwork).toEqual(jasmine.any(Function));
    expect(gw).toEqual(jasmine.any(Object));
    expect(gw).toEqual(jasmine.any(Groundwork));
  });

  it('has the correct modules', () => {
    const gw = new Groundwork();
    const modules = ['auth', 'supporters', 'donations', 'profiles',
                     'subscriptions', 'quickcards'];
    modules.forEach(m => expect(gw[m]).toBeDefined());
  });

  describe('version', () => {
    it('returns a string', () => {
      const gw = new Groundwork();
      expect(gw.version).toEqual(jasmine.any(String));
    });
  });

  describe('clientId', () => {
    it('clientId getter returns oauth_client_id', () => {
      const gw = new Groundwork();
      expect(gw.clientId).toEqual(undefined);
      const gw2 = new Groundwork({ oauth_client_id: 'foo' });
      expect(gw2.clientId).toEqual('foo');
      const gw3 = new Groundwork({ oauth_client_id: [1, 2, 3] });
      expect(gw3.clientId).toEqual(jasmine.arrayContaining([1, 2, 3]));
    });

    it('clientId setter sets oauth_client_id', () => {
      const g = new Groundwork();
      expect(g.clientId).toEqual(undefined);
      g.clientId = 'foo';
      expect(g.clientId).toEqual('foo');
      expect(g.config.get('oauth_client_id')).toEqual('foo');
    });
  });

  describe('apiKey', () => {
    it('apiKey getter returns oauth_client_id', () => {
      const gw = new Groundwork();
      expect(gw.apiKey).toEqual(undefined);
      const gw2 = new Groundwork({ oauth_client_id: 'foo' });
      expect(gw2.apiKey).toEqual('foo');
      const gw3 = new Groundwork({ oauth_client_id: [1, 2, 3] });
      expect(gw3.apiKey).toEqual(jasmine.arrayContaining([1, 2, 3]));
      const gw4 = new Groundwork({ apiKey: 'foo' });
      expect(gw4.apiKey).toEqual('foo');
    });

    it('apiKey setter sets oauth_client_id', () => {
      const g = new Groundwork();
      expect(g.apiKey).toEqual(undefined);
      g.apiKey = 'foo';
      expect(g.apiKey).toEqual('foo');
      expect(g.config.get('oauth_client_id')).toEqual('foo');
    });
  });

  describe('apiUrl', () => {
    it('apiUrl getter returns api_url', () => {
      const gw = new Groundwork();
      expect(gw.apiUrl).toEqual(gw.config.get('api_url'));
      const gw2 = new Groundwork({ api_url: 'foo' });
      expect(gw2.apiUrl).toEqual('foo');
      const gw3 = new Groundwork({ api_url: [1, 2, 3] });
      expect(gw3.apiUrl).toEqual(jasmine.arrayContaining([1, 2, 3]));
      const gw4 = new Groundwork({ apiUrl: 'foo' });
      expect(gw4.apiUrl).toEqual('foo');
    });

    it('apiUrl setter sets api_url', () => {
      const g = new Groundwork();
      expect(g.apiUrl).toEqual(g.config.get('api_url'));
      g.apiUrl = 'foo';
      expect(g.apiUrl).toEqual('foo');
      expect(g.config.get('api_url')).toEqual('foo');
    });

    it('apiVersion setter sets api_version', () => {
      const g = new Groundwork();
      const v = '2028-03-28';
      expect(g.apiVersion).toEqual(undefined);
      g.apiVersion = v;
      expect(g.apiVersion).toEqual(v);
      expect(g.config.get(constants.API_VERSION)).toEqual(v);
    });

    it('apiVersion setter will throw on invalid versions', () => {
      const g = new Groundwork();
      const a = () => {
        g.apiVersion = [];
      };
      const b = () => {
        g.apiVersion = '2012-03-12:';
      };
      const c = () => {
        g.apiVersion = '2012-03-12: a';
      };

      const xs = [a, b, c];

      xs.forEach(x => expect(x).toThrowError('apiVersion must be formatted in either YYYY-MM-DD or with\nan optinal integer like 2028-03-23:12'));
    });
  });
});
