/*eslint-disable quote-props, one-var, no-console */

import Quickcard from '../Quickcard';
import Http from '../Http';
import Dictionary from '../Dictionary';
import * as constants from './constants.test';

import schema from '../schema/quickcard';

const QUICKCARD = {
  'amount': 2000,
  'givenName': 'John',
  'familyName': 'Doe',
  'address1': '123 Main St',
  'city': 'New York City',
  'state': 'NY',
  'zip': '11201',
  'country': 'US',
  'email': 'john@doe.com',
  'phone': '1231231234',
  'employer': 'Acme',
  'occupation': 'Coyote',
  'ccNum': '1234123412341234',
  'ccExpMonth': 12,
  'ccExpYear': 2020,
  'ccCvc': '123',
  'agreeToTerms': true
};

const QUICKCARD_RESPONSE = {
  'donation': {
    'id': 'someDonationId123',
    'created': 14121958916,
    'deleted': null,
    'amount': 2000,
    'currency': 'USD',
    'gwid': '',
    'subscription': '',
    'quickCard': '',
    'givenName': 'John',
    'familyName': 'Doe',
    'address1': '123 Main St',
    'address2': null,
    'city': 'New York City',
    'state': 'NY',
    'country': 'US',
    'zip': '11201',
    'email': 'john@doe.com',
    'phone': '1231231234',
    'employer': 'Acme',
    'occupation': 'Coyote',
    'tags': {},
    'processor': 'processorcompany',
    'processorPaymentData': {},
    'raiser': ''
  }
};

const I = x => x;

describe('(Quickcard.test.js)', () => {
  let quickcard = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    quickcard = new Quickcard(config, http);
  });

  afterEach(() => {
    quickcard = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  // FETCH
  // ========

  it('fetch will send a url to fetchCollection', () => {
    const id = constants.TOKEN.gwid;
    const url = `payments/quickcards/${ id }`;

    spyOn(quickcard, 'fetchCollection');

    quickcard.fetch(id);
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url);
  });

  it('fetch returns a rejected promise if missing id', (done) => {
    const r = constants.RESPONSE_GENERIC;
    r.status = 400;
    r.statusText = 'Invalid Data';
    r.data = {
      error: jasmine.objectContaining({
        valid: false,
        fields: ['id'],
        msg: ['Missing ID']
      })
    };

    const p = quickcard.fetch().catch((err) => {
      expect(err).toEqual(jasmine.objectContaining(r));
      done();
    });

    expect(p).toEqual(jasmine.any(Promise));
  });


  // CREATE
  // ======

  it('create returns a rejected Promise for invalid forms', (done) => {
    const p = quickcard.create({ foo: 1 });
    const r = constants.RESPONSE_GENERIC;

    r.status = 400;
    r.statusText = 'Invalid Data';
    r.data = {
      error: jasmine.objectContaining({
        valid: false,
        fields: jasmine.arrayContaining(schema.required),
        msg: jasmine.any(Array)
      })
    };

    expect(p).toEqual(jasmine.any(Promise));

    p.catch((err) => {
      expect(err).toEqual(jasmine.objectContaining(r));
      done();
    });
  });

  it('create response with 200 on success', (done) => {
    let request, response;

    const d = Object.assign(QUICKCARD, {});
    d.ccNum = '4242424242424242';
    d.ccCvc = '666';

    const server = Object.assign(constants.RESPONSE_200, {});
    server.responseText = JSON.stringify(QUICKCARD_RESPONSE);

    quickcard.config.set('auth', constants.TOKEN);

    const p = quickcard.create(d).then((r) => {
      response = r;
    }).catch((f) => { console.log(f.data.error); });

    // Returns a Promise
    expect(p).toEqual(jasmine.any(Promise));

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(server);
      setTimeout(() => {
        expect(response.data).toEqual(jasmine.objectContaining(QUICKCARD_RESPONSE));
        done();
      }, 0);
    }, 0);
  });

  it('create will attach gwid to POST if present', (done) => {
    let request, response; // eslint-disable-line

    const d = Object.assign(QUICKCARD, {});
    d.ccNum = '4242424242424242';
    d.ccCvc = '666';

    const gwid = constants.TOKEN.gwid;
    quickcard.config.set('auth', constants.TOKEN);

    const p = quickcard.create(d).then((r) => { // eslint-disable-line
      response = r;
    }).catch(I);

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      expect(JSON.parse(request.params).gwid).toEqual(gwid);
      done();
    }, 0);
  });

  // LIST
  // ====

  it('list will whitelist opts and enforce gwid', () => {
    const url = 'payments/quickcards';
    spyOn(quickcard, 'fetchCollection');

    quickcard.config.set('auth', {});

    quickcard.list({});
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url, {
      gwid: undefined
    });

    const o = { gwid: 123 };
    quickcard.list(o);
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url, o);

    const p = { gwid: 123, page: 1, perPage: 2 };
    quickcard.list(p);
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url, p);

    const q = { gwid: 123, page: 2, wutang: 'clan' };
    const s = { gwid: 123, page: 2 };
    quickcard.list(q);
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url, s);
    expect(quickcard.fetchCollection).not.toHaveBeenCalledWith(url, q);
  });

  it('list will use gwid in auth if it can', () => {
    const url = 'payments/quickcards';
    spyOn(quickcard, 'fetchCollection');

    quickcard.config.set('auth', constants.TOKEN);

    quickcard.list({});
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url, {
      gwid: constants.TOKEN.gwid
    });
  });

  it('list will overide the gwid from auth', () => {
    const url = 'payments/quickcards';
    spyOn(quickcard, 'fetchCollection');

    quickcard.config.set('auth', constants.TOKEN);

    // Can be overridden
    const o = { gwid: 123 };
    quickcard.list(o);
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url, o);
  });

  it('listDonations will GET a url with the id', () => {
    const id = 'abc123';
    const url = `payments/quickcards/${ id }/donations`;
    spyOn(quickcard, 'fetchCollection');
    quickcard.listDonations(id);
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url);
  });

  // LIST DONATIONS
  // ==============

  it('listDonations will GET an error object with no ID', (done) => {
    const r = constants.RESPONSE_GENERIC;

    r.status = 400;
    r.statusText = 'Invalid Data';
    r.data = {
      error: jasmine.objectContaining({
        valid: false,
        fields: ['id'],
        msg: ['Missing ID']
      })
    };

    const p = quickcard.listDonations().catch((err) => {
      expect(err).toEqual(jasmine.objectContaining(r));
      done();
    });

    expect(p).toEqual(jasmine.any(Promise));
  });

  it('listDonations will call fetchCollection with a url', () => {
    const url = 'payments/quickcards/abc123/donations';
    spyOn(quickcard, 'fetchCollection');
    quickcard.listDonations('abc123');
    expect(quickcard.fetchCollection).toHaveBeenCalledWith(url);
  });

  // DEL
  // ===

  describe('del', () => {
    it('returns a rejected promise if missing id', (done) => {
      const r = constants.RESPONSE_GENERIC;
      r.status = 400;
      r.statusText = 'Invalid Data';
      r.data = {
        error: jasmine.objectContaining({
          valid: false,
          fields: ['id'],
          msg: ['Missing ID']
        })
      };

      const p = quickcard.del().catch((err) => {
        expect(err).toEqual(jasmine.objectContaining(r));
        done();
      });

      expect(p).toEqual(jasmine.any(Promise));
    });

    it('calls http.put with a specific date', () => {
      const url = 'payments/quickcards/abc123';
      const unixEpoch = Math.floor((new Date(2015, 10, 13)) / 1000);
      const arg = { deleted: unixEpoch };

      spyOn(quickcard.http, 'put');

      quickcard.del('abc123', 2015, 10, 13);
      expect(quickcard.http.put).toHaveBeenCalledWith(url, arg);
    });

    it('calls http.put with a Date.now if no date given', () => {
      jasmine.clock().install();

      const url = 'payments/quickcards/abc123';
      const unixEpoch = Math.floor((new Date) / 1000);
      const arg = { deleted: unixEpoch };

      spyOn(quickcard.http, 'put');

      quickcard.del('abc123');
      expect(quickcard.http.put).toHaveBeenCalledWith(url, arg);

      jasmine.clock().uninstall();
    });
  });

  // PAY
  // ===

  it('pay will REJECT without an ID', (done) => {
    const r = constants.RESPONSE_GENERIC;
    r.status = 400;
    r.statusText = 'Invalid Data';
    r.data = {
      error: jasmine.objectContaining({
        valid: false,
        fields: ['id'],
        msg: ['Missing ID']
      })
    };

    const p = quickcard.pay().catch((err) => {
      expect(err).toEqual(jasmine.objectContaining(r));
      done();
    });

    expect(p).toEqual(jasmine.any(Promise));
  });

  it('pay will REJECT without an amount', (done) => {
    const r = constants.RESPONSE_GENERIC;
    r.status = 400;
    r.statusText = 'Invalid Data';
    r.data = {
      error: jasmine.objectContaining({
        valid: false,
        fields: ['amount'],
        msg: ['Missing required property: amount']
      })
    };

    const p = quickcard.pay('abc123', {}).catch((err) => {
      expect(err).toEqual(jasmine.objectContaining(r));
      done();
    });

    expect(p).toEqual(jasmine.any(Promise));
  });

  it('pay will REJECT without a gwid', (done) => {
    const r = constants.RESPONSE_GENERIC;
    r.status = 400;
    r.statusText = 'Invalid Data';
    r.data = {
      error: jasmine.objectContaining({
        valid: false,
        fields: ['gwid'],
        msg: ['Missing required property: gwid']
      })
    };

    quickcard.config.set('auth', {});

    const p = quickcard.pay('abc123', { amount: 2000 }).catch((err) => {
      expect(err).toEqual(jasmine.objectContaining(r));
      done();
    });

    expect(p).toEqual(jasmine.any(Promise));
  });

  it('pay will POST to url with payment object', (done) => {
    let request, response;

    const server = Object.assign(constants.RESPONSE_200, {});
    server.responseText = JSON.stringify(QUICKCARD_RESPONSE);

    quickcard.config.set('auth', constants.TOKEN);

    const params = {
      amount: 2000,
      gwid: constants.TOKEN.gwid
    };

    const p = quickcard.pay('abc123', { amount: 2000 }).then((r) => {
      response = r;
    }).catch((f) => { console.log(f.data.error); });

    // Returns a Promise
    expect(p).toEqual(jasmine.any(Promise));

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();

      expect(request.url).toEqual('/payments/quickcards/abc123/donations');
      expect(request.params).toEqual(JSON.stringify(params));

      request.respondWith(server);
      setTimeout(() => {
        expect(response.data).toEqual(jasmine.objectContaining(QUICKCARD_RESPONSE));
        done();
      }, 0);
    }, 0);
  });
});
