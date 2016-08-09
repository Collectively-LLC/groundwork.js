/*eslint-disable quote-props, one-var */

import * as constants from './constants';
import Dictionary from 'lib/Dictionary';
import Http from 'lib/Http';
import Subscription from 'lib/Subscription';
import schema from 'lib/schema/donation';
import { urlJoin } from 'lib/utils';

const SUBSCRIPTION = {
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

const SUBSCRIPTION_RESPONSE = {
  'donation': {
    'id': 'someDonationId123',
    'created': 14121958916,
    'deleted': null,
    'amount': 2000,
    currency: 'USD',
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

describe('(Subscription.test.js)', () => {
  let subscription = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    subscription = new Subscription(config, http);
  });

  afterEach(() => {
    subscription = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  it('fetch will send a url to fetchCollection', () => {
    const id = constants.TOKEN.gwid;
    const url = `payments/subscriptions/${ id }`;

    spyOn(subscription, 'fetchCollection');

    subscription.fetch(id);
    expect(subscription.fetchCollection).toHaveBeenCalledWith(url);
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

    const p = subscription.fetch().catch((err) => {
      expect(err).toEqual(jasmine.objectContaining(r));
      done();
    });

    expect(p).toEqual(jasmine.any(Promise));
  });

  it('create returns a rejected Promise for invalid forms', (done) => {
    const p = subscription.create({ foo: 1 });
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

    const d = Object.assign(SUBSCRIPTION, {});
    d.ccNum = '4242424242424242';
    d.ccCvc = '666';

    const server = Object.assign(constants.RESPONSE_200, {});
    server.responseText = JSON.stringify(SUBSCRIPTION_RESPONSE);

    const p = subscription.create(d).then((r) => {
      response = r;
    }).catch(I);

    // Returns a Promise
    expect(p).toEqual(jasmine.any(Promise));

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(server);
      setTimeout(() => {
        expect(response.data).toEqual(jasmine.objectContaining(SUBSCRIPTION_RESPONSE));
        done();
      }, 0);
    }, 0);
  });

  it('create will attach gwid to POST if present', (done) => {
    let request, response; // eslint-disable-line

    const d = Object.assign(SUBSCRIPTION, {});
    d.ccNum = '4242424242424242';
    d.ccCvc = '666';

    const gwid = constants.TOKEN.gwid;
    subscription.config.set('auth', constants.TOKEN);

    const p = subscription.create(d).then((r) => { // eslint-disable-line
      response = r;
    }).catch(I);

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      expect(JSON.parse(request.params).gwid).toEqual(gwid);
      done();
    }, 0);
  });


  it('list will whitelist opts and enforce gwid', () => {
    const url = 'payments/subscriptions';
    spyOn(subscription, 'fetchCollection');

    subscription.config.set('auth', {});

    subscription.list({});
    expect(subscription.fetchCollection).toHaveBeenCalledWith(url, {
      gwid: undefined
    });

    const o = { gwid: 123 };
    subscription.list(o);
    expect(subscription.fetchCollection).toHaveBeenCalledWith(url, o);

    const p = { gwid: 123, page: 1, perPage: 2 };
    subscription.list(p);
    expect(subscription.fetchCollection).toHaveBeenCalledWith(url, p);

    const q = { gwid: 123, page: 2, wutang: 'clan' };
    const s = { gwid: 123, page: 2 };
    subscription.list(q);
    expect(subscription.fetchCollection).toHaveBeenCalledWith(url, s);
    expect(subscription.fetchCollection).not.toHaveBeenCalledWith(url, q);
  });

  it('list will use gwid in auth if it can', () => {
    const url = 'payments/subscriptions';
    spyOn(subscription, 'fetchCollection');

    subscription.config.set('auth', constants.TOKEN);

    subscription.list({});
    expect(subscription.fetchCollection).toHaveBeenCalledWith(url, {
      gwid: constants.TOKEN.gwid
    });
  });

  it('list will overide the gwid from auth', () => {
    const url = 'payments/subscriptions';
    spyOn(subscription, 'fetchCollection');

    subscription.config.set('auth', constants.TOKEN);

    // Can be overridden
    const o = { gwid: 123 };
    subscription.list(o);
    expect(subscription.fetchCollection).toHaveBeenCalledWith(url, o);
  });

  it('listDonations will GET a url with the id', () => {
    const id = 'abc123';
    const url = `payments/subscriptions/${ id }/donations`;
    spyOn(subscription, 'fetchCollection');
    subscription.listDonations(id);
    expect(subscription.fetchCollection).toHaveBeenCalledWith(url);
  });

  it('listDonations will GET a busted url with no id', (done) => {
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

    const p = subscription.listDonations().catch((err) => {
      expect(err).toEqual(jasmine.objectContaining(r));
      done();
    });

    expect(p).toEqual(jasmine.any(Promise));
  });

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

      const p = subscription.del().catch((err) => {
        expect(err).toEqual(jasmine.objectContaining(r));
        done();
      });

      expect(p).toEqual(jasmine.any(Promise));
    });

    it('calls http.put with a specific date', () => {
      const url = 'payments/subscriptions/abc123';
      const unixEpoch = Math.floor((new Date(2015, 10, 13)) / 1000);
      const arg = { cancelled: unixEpoch };

      spyOn(subscription.http, 'put');

      const p = subscription.del('abc123', 2015, 10, 13); // eslint-disable-line
      expect(subscription.http.put).toHaveBeenCalledWith(url, arg);
    });

    it('calls http.put with a Date.now if no date given', () => {
      jasmine.clock().install();

      const url = 'payments/subscriptions/abc123';
      const unixEpoch = Math.floor((new Date) / 1000);
      const arg = { cancelled: unixEpoch };

      spyOn(subscription.http, 'put');

      const p = subscription.del('abc123'); // eslint-disable-line
      expect(subscription.http.put).toHaveBeenCalledWith(url, arg);

      jasmine.clock().uninstall();
    });
  });

  describe('updateAmount', () => {
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

      const p = subscription.updateAmount().catch((err) => {
        expect(err).toEqual(jasmine.objectContaining(r));
        done();
      });

      expect(p).toEqual(jasmine.any(Promise));
    });

    it('returns a rejected promise if missing amount', (done) => {
      const r = constants.RESPONSE_GENERIC;
      r.status = 400;
      r.statusText = 'Invalid Data';
      r.data = {
        error: jasmine.objectContaining({
          valid: false,
          fields: ['amount'],
          msg: ['Missing Argument: amount']
        })
      };

      const p = subscription.updateAmount('abc123').catch((err) => {
        expect(err).toEqual(jasmine.objectContaining(r));
        done();
      });

      expect(p).toEqual(jasmine.any(Promise));
    });

    it('calls http with id and set amount', () => {
      const id = 'N6FAB21416';
      const amount = 100;
      const url = urlJoin(subscription.namespace, 'subscriptions', id);
      spyOn(subscription.http, 'put');
      subscription.updateAmount(id, 100);
      expect(subscription.http.put).toHaveBeenCalledWith(url, { amount });
    });
  });
});
