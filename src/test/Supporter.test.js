/*global describe, it, expect, beforeEach, afterEach, jasmine, setTimeout, spyOn*/
/*eslint-disable quote-props, one-var, max-len */

import Supporter from 'lib/Supporter';
import Http from 'lib/Http';
import Dictionary from 'lib/Dictionary';
import * as constants from './constants';

const BUCKET_RESPONSE = {
  'data': {
    'uuid': '',
    'createdDate': '2015-08-20T21:25:44.897524Z',
    'modifiedDate': '2015-08-20T21:25:44.897565Z',
    'email': 'foo@bar.com',
    'givenName': null,
    'familyName': null,
    'address1': null,
    'address2': null,
    'city': null,
    'state': null,
    'country': null,
    'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
    'phone': null,
    'postalCode': '',
    'source': 'gwclient-js',
    'submittingUrl': '',
    'tags': '',
    'ipAddress': ''
  },
  'status': 201,
  'statusText': 'Created',
  'headers': {
    'content-type': 'application/json'
  },
  'config': {}
};

const I = x => x;

describe('(Supporter.test.js)', () => {
  let supporter = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    supporter = new Supporter(config, http);
  });

  afterEach(() => {
    supporter = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  it('has a create method', () => {
    expect(typeof supporter.create).toBe('function');
  });

  it('create returns a rejected Promise for invalid forms', (done) => {
    const data = {
      error: jasmine.objectContaining({
        valid: false,
        fields: jasmine.arrayContaining(['externalId']),
        msg: jasmine.arrayContaining(['Invalid type: number (expected string)'])
      })
    };

    const p = supporter.create({ externalId: 1 });
    expect(p).toEqual(jasmine.any(Promise));
    p.catch(err => {
      expect(err.data).toEqual(jasmine.objectContaining(data));
      done();
    });
  });

  it('create response with 200 on success', (done) => {
    let request, response;

    const server = constants.RESPONSE_200;
    server.responseText = JSON.stringify(BUCKET_RESPONSE.data);

    const p = supporter.create({
      email: 'foo@bar.com', source: 'gwclient-js'
    }).then((r) => {
      response = r;
    }).catch(I);

    // Returns a Promise
    expect(p).toEqual(jasmine.any(Promise));

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(server);
      setTimeout(() => {
        expect(response.data.email).toEqual('foo@bar.com');
        expect(response.data.source).toEqual('gwclient-js');
        done();
      }, 0);
    }, 0);
  });

  describe('list', () => {
    it('whitelists params', () => {
      spyOn(supporter.http, 'get');

      const a = {
        email: 'foo@email.com',
        page: 12,
        perPage: 10,
        foo: 'bar',
        baz: []
      };

      const aa = {
        params: {
          page: 12,
          perPage: 10
        }
      };

      supporter.list(a);
      expect(supporter.http.get)
        .toHaveBeenCalledWith('bucket/supporters', jasmine.objectContaining(aa));
    });
  });
});
