/*eslint-disable one-var */
import Auth from '../Auth';
import Dict from '../Dictionary';
import Http from '../Http';
import { merge } from 'lodash';

import {
  TOKEN,
  RESPONSE_200,
  RESPONSE_400
} from './constants.test';

const I = (x) => x;

describe('(Auth.test.js)', () => {
  let auth = null;
  let http = null;

  const config = new Dict({
    api_url: '',
    oauth_client_id: '1234',
    auth: {}
  });

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    auth = new Auth(config, http);
  });

  afterEach(() => {
    auth = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  // GETTERS
  // =======

  describe('getters', () => {
    beforeEach(() => {
      auth.config.set('auth', TOKEN);
    });
    afterEach(() => {
      auth.config.set('auth', {});
    });

    it('auth should return the auth object', () => {
      expect(auth.auth).toEqual(TOKEN);
    });

    it('token should return the accessToken', () => {
      expect(auth.token).toEqual(TOKEN.accessToken);
    });

    it('tokenType should return the tokenType', () => {
      expect(auth.tokenType).toEqual(TOKEN.tokenType);
    });

    it('gwid should return the gwid', () => {
      expect(auth.gwid).toEqual(TOKEN.gwid);
    });

    it('authorizationHeader should return a combined string', () => {
      expect(auth.authorizationHeader).toEqual(`${TOKEN.tokenType} ${TOKEN.accessToken}`);
    });
  });

  // SETTERS
  // =======

  describe('setters', () => {
    beforeEach(() => {
      auth.config.set('auth', {});
    });

    it('auth should set the auth config object', () => {
      auth.auth = TOKEN;
      expect(auth.auth).toEqual(TOKEN);
    });

    it('token should set the accessToken in auth config object', () => {
      const t = { accessToken: TOKEN.accessToken };
      const u = merge({}, TOKEN);
      delete u.accessToken;
      const r = auth.token = TOKEN.accessToken;

      expect(r).toEqual(TOKEN.accessToken);
      expect(auth.auth).toEqual(jasmine.objectContaining(t));
      expect(auth.auth).not.toEqual(jasmine.objectContaining(u));

      // Setter guards against crap values
      auth.token = null;
      expect(auth.auth).toEqual(jasmine.objectContaining(t));
    });

    it('auth should set the tokenType in auth config object', () => {
      auth.tokenType = TOKEN.tokenType;
      expect(auth.auth)
        .toEqual(jasmine.objectContaining({ tokenType: TOKEN.tokenType }));
    });

    it('gwid should set the gwid in auth config object', () => {
      auth.gwid = TOKEN.gwid;
      expect(auth.auth)
        .toEqual(jasmine.objectContaining({ gwid: TOKEN.gwid }));
    });
  });

  it('fetchUsingPassword should make a request to /oauth/token', (done) => {
    let request = undefined;
    auth.fetchUsingPassword('foo@mail.com', 'abc123').catch(I);
    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/oauth/token');
      expect(request.requestHeaders).toEqual(jasmine.objectContaining({
        'gw-js-client': jasmine.stringMatching(/js-\w/),
        Authorization: jasmine.stringMatching(/Basic/)
      }));
      expect(JSON.parse(request.params)).toEqual(jasmine.objectContaining({
        email: 'foo@mail.com',
        password: 'abc123',
        grant_type: 'password'
      }));
      done();
    }, 0);
  });

  it('fetchUsingPassword should get a TOKEN back on success', (done) => {
    let request, response;

    auth.fetchUsingPassword('foo@mail.com', 'abc123').then((resp) => {
      response = resp;
    }).catch(err => {
      console.log(err); // eslint-disable-line
      done();
    });

    const authResp = RESPONSE_200;
    authResp.responseText = TOKEN;

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.method).toEqual('POST');
      request.respondWith(authResp);
      setTimeout(() => {
        expect(response.data)
         .toEqual(jasmine.objectContaining(RESPONSE_200.responseText));
        expect(response.status).toEqual(200);
        expect(response.statusText).toEqual('OK');
        expect(response.headers['content-type']).toEqual('application/json');
        // Ensure config was updated
        expect(auth.config.get('auth')).toEqual(jasmine.objectContaining(TOKEN));
        done();
      }, 0);
    }, 0);
  });

  it('getToken should get an Error back on failed requests', (done) => {
    let request, response;

    auth.fetchUsingPassword('foo@mail.com', 'abc123').catch((resp) => {
      response = resp;
    });

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.method).toEqual('POST');
      request.respondWith(RESPONSE_400);
      setTimeout(() => {
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual('invalid_request');
        done();
      }, 0);
    }, 0);
  });

  it('destroy token prevents additional authed reqs', (done) => {
    let requestA, requestB, responseA, responseB; // eslint-disable-line

    auth.destroyToken();
    auth.config.set('auth', TOKEN);

    auth.http.get('foo').then((resp) => {
      responseA = resp;
    }).catch(I);

    setTimeout(() => {
      requestA = jasmine.Ajax.requests.mostRecent();
      expect(requestA.requestHeaders).toEqual(jasmine.objectContaining({
        Authorization: `${ TOKEN.tokenType } ${ TOKEN.accessToken }`
      }));

      const d = auth.destroyToken();
      expect(d.auth).toEqual({});

      auth.http.get('foo').then((resp) => {
        responseB = resp;
      }).catch(I);

      setTimeout(() => {
        requestB = jasmine.Ajax.requests.mostRecent();
        expect(requestB.requestHeaders).not.toEqual(jasmine.objectContaining({
          Authorization: `${ TOKEN.tokenType } ${ TOKEN.accessToken }`
        }));
        done();
      }, 0);
    }, 0);
  });
});
