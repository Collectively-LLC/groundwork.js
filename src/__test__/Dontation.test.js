/*eslint-disable quote-props, one-var, no-console */

import * as constants from './constants.test';
import Dictionary from '../Dictionary';
import Donation from '../Donation';
import Http from '../Http';
import schema from '../schema/donation';

import { cloneDeep, assign } from 'lodash';

const I = x => x;

const DONATION = {
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
  'ccCvc': 123,
  'agreeToTerms': true
};

const DONATION_RESPONSE = {
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

describe('(Donation.test.js)', () => {
  let donation = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    donation = new Donation(config, http);
  });

  afterEach(() => {
    donation = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  it('the donation schema will accept string values for ccExpMonth, ccExpYear, and amount', (done) => {
    let request, response;
    const donationStr = cloneDeep(DONATION);

    donationStr.ccExpMonth = '12';
    donationStr.ccExpYear = '2020';
    donationStr.amount = '2000';

    // See https://github.com/thegroundwork/groundwork.js/issues/47
    // The API should accept integers for these values
    donationStr.ccNum = '4242424242424242';
    donationStr.ccCvc = '666';

    const server = cloneDeep(constants.RESPONSE_200);
    server.responseText = JSON.stringify(DONATION_RESPONSE);

    const p = donation.create(donationStr)
          .then(r => response = r)
          .catch(err => console.log(err.data.error.fields));

    // Returns a Promise
    expect(p).toEqual(jasmine.any(Promise));

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(server);
      setTimeout(() => {
        expect(response.data).toEqual(jasmine.objectContaining(DONATION_RESPONSE));
        done();
      }, 0);
    }, 0);
  });

    it('the donation schema will accept integer values for ccExpMonth, ccExpYear, and amount', (done) => {
    let request, response;
    const donationInt = cloneDeep(DONATION);

    // See https://github.com/thegroundwork/groundwork.js/issues/47
    // The API should accept integers for these values
    donationInt.ccNum = '4242424242424242';
    donationInt.ccCvc = '666';

    const server = cloneDeep(constants.RESPONSE_200);
    server.responseText = JSON.stringify(DONATION_RESPONSE);

    const p = donation.create(donationInt)
          .then(r => response = r)
          .catch(err => console.log(err.data.error.fields));

    // Returns a Promise
    expect(p).toEqual(jasmine.any(Promise));

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(server);
      setTimeout(() => {
        expect(response.data).toEqual(jasmine.objectContaining(DONATION_RESPONSE));
        done();
      }, 0);
    }, 0);
  });

  it('create returns a rejected Promise for invalid forms', (done) => {
    const p = donation.create({ foo: 1 });
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

    const d = cloneDeep(DONATION);
    d.ccNum = '4242424242424242';
    d.ccCvc = '666';

    const server = cloneDeep(constants.RESPONSE_200);
    server.responseText = JSON.stringify(DONATION_RESPONSE);

    const p = donation.create(d)
      .then(r => response = r)
      .catch(err => console.log(err.data.error.fields));

    // Returns a Promise
    expect(p).toEqual(jasmine.any(Promise));

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(server);
      setTimeout(() => {
        expect(response.data).toEqual(jasmine.objectContaining(DONATION_RESPONSE));
        done();
      }, 0);
    }, 0);
  });

  it('create will attach gwid to POST if present', (done) => {
    let request, response; // eslint-disable-line

    const d = assign(DONATION, {});
    d.ccNum = '4242424242424242';
    d.ccCvc = '666';

    const gwid = constants.TOKEN.gwid;
    donation.config.set('auth', constants.TOKEN);

    const p = donation.create(d).then((r) => { // eslint-disable-line
      response = r;
    }).catch(I);

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      expect(JSON.parse(request.params).gwid).toEqual(gwid);
      done();
    }, 0);
  });

  it('list will deal with an empty auth object', (done) => {
    let request, response; // eslint-disable-line
    const server = constants.RESPONSE_200;
    const p = donation.list().then((r) => {
      response = r;
    }).catch(I);

    expect(p).toEqual(jasmine.any(Promise));

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(server);
      expect(request.url).toEqual('/payments/donations');
      expect(request.params).toEqual(undefined);
      done();
    });
  });

  it('list will pass filters to fetchCollection', () => {
    const gwid = constants.TOKEN.gwid;
    const sub = 'abc123';
    const qwk = 'def456';
    const email = 'foo@foobar.biz';

    donation.config.set('auth', constants.TOKEN);

    spyOn(donation, 'fetchCollection');

    const opts = [
      { gwid },
      { subscription: sub },
      { quickCard: qwk },
      { email },
      { page: 1, perPage: 25 }
    ];

    opts.forEach((o) => {
      donation.list(o);
      expect(donation.fetchCollection).toHaveBeenCalledWith(
        'payments/donations', o
      );
    });
  });

  it('list will whitelist opts', () => {
    const url = 'payments/donations';
    spyOn(donation, 'fetchCollection');

    donation.list({});
    expect(donation.fetchCollection).toHaveBeenCalledWith(url, {});

    const o = { gwid: 123 };
    donation.list(o);
    expect(donation.fetchCollection).toHaveBeenCalledWith(url, o);

    const p = { gwid: 123, page: 1, perPage: 2 };
    donation.list(p);
    expect(donation.fetchCollection).toHaveBeenCalledWith(url, p);

    const q = { gwid: 123, page: 2, wutang: 'clan' };
    const s = { gwid: 123, page: 2 };
    donation.list(q);
    expect(donation.fetchCollection).toHaveBeenCalledWith(url, s);
    expect(donation.fetchCollection).not.toHaveBeenCalledWith(url, q);
  });

  it('fetch will send a url to fetchCollection', () => {
    const id = constants.TOKEN.gwid;
    const url = `payments/donations/${ id }`;

    spyOn(donation, 'fetchCollection');

    donation.fetch(id);
    expect(donation.fetchCollection).toHaveBeenCalledWith(url);
  });
});
