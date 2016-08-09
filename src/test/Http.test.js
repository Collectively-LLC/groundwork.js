import Http from 'lib/Http';
import Dict from 'lib/Dictionary';
import * as constants from 'lib/constants';

import {
  TOKEN,
  RESPONSE_200,
  RESPONSE_400,
  RESPONSE_404
} from './constants';

const expectResponse = (env, done) => () => {
  // Request
  const request = jasmine.Ajax.requests.mostRecent();
  expect(request.url).toBe(env.url);
  request.respondWith(env.server);

  // Response
  setTimeout(() => {
    expect(env.response.data)
      .toEqual(jasmine.objectContaining(env.server.responseText));
    done();
  }, 0);
};

const I = x => x;

describe('(Http.test.js)', () => {
  let http = null;
  let config;

  beforeEach(() => {
    jasmine.Ajax.install();
    config = new Dict({
      api_url: 'http://foo.com',
      oauth_client_id: '1234'
    });
    http = new Http(config);
  });

  afterEach(() => {
    http = null;
    jasmine.Ajax.uninstall();
  });

  it('constructor sets up config', () => {
    expect(http.config.data()).toEqual(jasmine.objectContaining(config.data()));
  });

  it('constructor should call setupRequestInterceptors', () => {
    const H = Http;
    spyOn(H.prototype, 'setupRequestInterceptors');
    const h = new H();
    expect(h.setupRequestInterceptors).toHaveBeenCalled();
  });

  it('hasAuthToken returns boolean', () => {
    expect(http.hasAuthToken()).toEqual(false);

    http.config.set('auth', TOKEN);
    expect(http.hasAuthToken()).toEqual(true);
  });

  it('generateAuthorizationHeader makes a token header', () => {
    http.config.set('auth', {});
    expect(http.generateAuthorizationHeader()).toEqual(undefined);

    http.config.set('auth', TOKEN);
    const t = `${TOKEN.tokenType} ${TOKEN.accessToken}`;
    expect(http.generateAuthorizationHeader()).toEqual(t);
  });

  it('generateBasicAuthHeader makes a token header', () => {
    const b64 = btoa(`${config.get('oauth_client_id')}:`);
    expect(http.generateBasicAuthHeader()).toEqual(`Basic ${ b64 }`);

    http.config.del('oauth_client_id');
    expect(http.generateBasicAuthHeader()).toEqual(undefined);
  });

  it('defaultHeaders returns custom headers', () => {
    // vanilla
    expect(http.defaultHeaders()).toEqual(jasmine.objectContaining({
      'gw-js-client': jasmine.stringMatching(/js-\w/)
    }));

    // Ensure basic auth header IS present if no auth
    const hdr = http.generateBasicAuthHeader();
    expect(http.defaultHeaders()).toEqual(jasmine.objectContaining({
      Authorization: `${ hdr }`
    }));

    // with auth
    http.config.set('auth', TOKEN);
    expect(http.defaultHeaders()).toEqual(jasmine.objectContaining({
      Authorization: `${ TOKEN.tokenType } ${ TOKEN.accessToken }`
    }));
  });

  it('defaultHeaders returns API Version header if set', () => {
    const v = '2028-03-28';
    const config2 = new Dict({
      api_url: 'http://foo.com',
      oauth_client_id: '1234',
      [constants.API_VERSION]: '2028-03-28'
    });
    const http2 = new Http(config2);

    expect(http2.defaultHeaders()).toEqual(jasmine.objectContaining({
      'gw-js-client': jasmine.stringMatching(/js-\w/),
      'gw-api-version': v
    }));
  });

  it('defaultHeaders can switch off auth', (done) => {
    const env = {
      url: 'http://foo.com/',
      server: RESPONSE_200,
      request: {},
      response: {}
    };

    // If noauth is passed in into the config object then the Authorization
    // headers should be suppressed, even if the auth token is present
    http.config.set('auth', TOKEN);
    http.get('', { noauth: true }).then((r) => {
      env.response = r;
    }).catch(I);

    // Request
    setTimeout(() => {
      // Request
      const request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(env.url);
      request.respondWith(env.server);

      // Ensure the header is NOT present
      expect(request.requestHeaders).not.toEqual(jasmine.objectContaining({
        Authorization: `${ TOKEN.tokenType } ${ TOKEN.accessToken }`
      }));

      // Ensure basic auth header IS present
      expect(request.requestHeaders).toEqual(jasmine.objectContaining({
        Authorization: jasmine.stringMatching(/Basic/)
      }));

      // Response
      setTimeout(() => {
        expect(env.response.data)
          .toEqual(jasmine.objectContaining(env.server.responseText));
        done();
      }, 0);
    }, 0);
  });

  it('assembleUrl appends api_url to all urls', () => {
    // note the trailing slash
    expect(http.assembleUrl('')).toEqual('http://foo.com/');

    expect(http.assembleUrl('bar')).toEqual('http://foo.com/bar');
    expect(http.assembleUrl('bar.html?baz=2')).toEqual('http://foo.com/bar.html?baz=2');
  });

  it('get handles a 200', (done) => {
    const env = {
      url: 'http://foo.com/',
      server: RESPONSE_200,
      request: {},
      response: {}
    };

    http.get('').then((r) => {
      env.response = r;
    }).catch(I);

    // Request
    setTimeout(expectResponse(env, done), 0);
  });

  it('get handles a 400', (done) => {
    const env = {
      url: 'http://foo.com/',
      server: RESPONSE_400,
      request: {},
      response: {}
    };

    // Anything other than success is an error, and you have to use catch
    http.get('').catch((r) => {
      env.response = r;
    });

    // Request
    setTimeout(expectResponse(env, done), 0);
  });

  it('get handles a 404', (done) => {
    const env = {
      url: 'http://foo.com/baz',
      server: RESPONSE_404,
      request: {},
      response: {}
    };

    // Anything other than success is an error, and you have to use catch
    http.get('baz').catch((r) => {
      env.response = r;
    });

    // Request
    setTimeout(expectResponse(env, done), 0);
  });
});
