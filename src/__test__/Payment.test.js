/*eslint-disable quote-props, one-var */

import { clone } from 'lodash';
import Payment from '../Payment';
import Http from '../Http';
import Dictionary from '../Dictionary';
import * as constants from './constants.test';

import schema from '../schema/donation';

const PAYMENT = {
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

// TODO: Implement donation response or remove
const DONATION_RESPONSE = { // eslint-disable-line
  'donation': {
    'id': 'someDonationId123',
    'created': 14121958916,
    'deleted': null,
    'amount': 2000,
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

describe('(Payment.test.js)', () => {
  let payment = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    payment = new Payment(config, http);
    payment.schema = schema;
  });

  afterEach(() => {
    payment = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  describe('formatCurrency', () => {
    it('coerces cents to be a number', () => {
      const p = payment.formatCurrency('  1000 ', 'USD');
      expect(p).toEqual('$10.00');
    });

    it('returns USD format', () => {
      const p = payment.formatCurrency(1000, 'USD');
      expect(p).toEqual('$10.00');
    });

    it('returns USD format w cents', () => {
      const p = payment.formatCurrency(100023, 'USD');
      expect(p).toEqual('$1,000.23');
    });

    it('returns JPY format', () => {
      const p = payment.formatCurrency(1000, 'JPY');
      expect(p).toEqual('¥1,000');
    });

    it('removes cents from JPY format', () => {
      const p = payment.formatCurrency(1000.23, 'JPY');
      expect(p).toEqual('¥1,000');
    });
  });

  describe('validateCurrencyCode', () => {
    it('validateCurrencyCode returns a rejected Promise if value is falsy', () => {
      const xs = [null, undefined, false];
      const errs = {
        msg: [],
        fields: []
      };
      xs.forEach((x) => {
        const e = payment.validateCurrencyCode(x, errs);
        expect(e).toEqual({
          msg: ['currency is not a valid ISO-4217 country code'],
          fields: ['currency']
        });
      });
    });

    it('validateCurrencyCode returns a rejected Promise if value is invalid', () => {
      const xs = [12, 'a', 'XXX', [], {}];
      const errs = {
        msg: [],
        fields: []
      };
      xs.forEach((x) => {
        const e = payment.validateCurrencyCode(x, errs);
        expect(e).toEqual({
          msg: ['currency is not a valid ISO-4217 country code'],
          fields: ['currency']
        });
      });
    });

    it('validateCurrencyCode returns true is code is valid', () => {
      const xs = ['usd', 'euR', 'JPY', 'aUd'];
      const errs = {
        msg: [],
        fields: []
      };
      xs.forEach((x) => {
        const e = payment.validateCurrencyCode(x, errs);
        expect(e).toEqual(errs);
      });
    });
  });

  describe('validation methods', () => {
    it('validateArg returns a rejected Promise if value is falsy', () => {
      const xs = [null, undefined, false];
      xs.forEach((x) => {
        const [, p] = payment.validateArg(x, 'arg');
        p.then(I).catch(I);
        expect(p).toEqual(jasmine.any(Promise));
      });
    });

    it('validateInterval returns a rejected Promise if value is falsy', () => {
      const xs = ['roy', 'pris', 1, {}, []];
      xs.forEach((x) => {
        const [, p] = payment.validateInterval(x);
        p.then(I).catch(I);
        expect(p).toEqual(jasmine.any(Promise));
      });
    });

    it('validateId returns a tuple with true on success', () => {
      const [a, b] = payment.validateId('abc123');
      expect(a).toBe(true);
      expect(b).toBe(undefined);
    });

    it('validateId returns a tuple with false/promise on fail', () => {
      const [a, b] = payment.validateId();
      b.catch(I);
      expect(a).toBe(false);
      expect(b).toEqual(jasmine.any(Promise));
    });

    it('validateSchema returns a tuple with true on success', () => {
      const [a, b] = payment.validateSchema(PAYMENT, schema);
      expect(a).toBe(true);
      expect(b).toBe(undefined);
    });

    it('validateSchema returns a tuple with false/promise on fail', () => {
      const [a, b] = payment.validateSchema({}, schema);
      expect(a).toBe(false);
      expect(b).toEqual(jasmine.any(Promise));
      b.catch(I);
    });
  });

  it('toCents will convert currencies to cents', () => {
    const fn = payment.toCents.bind(payment);
    expect(fn(1)).toBe(100);
    expect(fn('$1')).toBe(100);
    expect(fn(1.99)).toBe(199);
    expect(fn('$.99')).toBe(99);
    expect(fn('$12.04')).toBe(1204);
    expect(fn('$12.34')).toBe(1234);
    expect(fn('$12.34423523')).toBe(1234);
    expect(fn('$1,332.34423523')).toBe(133234);
    expect(fn('$.34')).toBe(34);
    expect(fn('0.2')).toBe(20);
    expect(fn(0.5)).toBe(50);
    expect(fn('$0.34423523')).toBe(34);
    expect(fn('€12.34423523')).toBe(1234);
    expect(fn('£12.34423523')).toBe(1234);
    expect(fn('-¥12.34423523')).toBe(1234);
    expect(fn('-1')).toBe(100);
    expect(fn('-11234.332')).toBe(1123433);
    expect(fn(1000)).toBe(100000);
    expect(fn(1000.00)).toBe(100000);
  });

  it('toIndivisible will convert currencies to Integers', () => {
    const fn = payment.toIndivisible.bind(payment);
    expect(fn('¥12,300.55')).toBe(12301); // Rounds up
    expect(fn('¥12,300')).toBe(12300);
    expect(fn('-¥12,300')).toBe(12300);
  });

  it('validateCreditCard will return an object of bools', () => {
    const fn = payment.validateCreditCard;

    // Total fail
    expect(fn()).toEqual(jasmine.objectContaining({
      validCardNumber: false,
      validExpiryMonth: false,
      validExpiryYear: false,
      validCvv: false,
      isExpired: true
    }));

    // Should pass
    const d = clone(PAYMENT);
    d.ccNum = '4242424242424242';
    d.ccCvc = '666';
    expect(fn(d)).toEqual(jasmine.objectContaining({
      validCardNumber: true,
      validExpiryMonth: true,
      validExpiryYear: true,
      validCvv: true,
      isExpired: false
    }));

    // Should NOT pass
    const e = clone(PAYMENT);
    e.ccNum = '4242421111424242';
    e.ccCvc = '666';
    expect(fn(e)).toEqual(jasmine.objectContaining({
      validCardNumber: false,
      validExpiryMonth: true,
      validExpiryYear: true,
      validCvv: true,
      isExpired: false
    }));
  });

  describe('validatePayment', () => {
    it('validatePayment should return a standard object', () => {
      const invalid = payment.validatePayment();
      expect(invalid).toEqual(jasmine.objectContaining({
        valid: false,
        fields: jasmine.any(Array),
        msg: jasmine.any(Array)
      }));

      const d = clone(PAYMENT);
      d.ccNum = '4242424242424242';
      d.ccCvc = '666';
      d.currency = 'aud';

      const valid = payment.validatePayment(d);
      expect(valid).toEqual(jasmine.objectContaining({
        valid: true,
        fields: jasmine.any(Array),
        msg: jasmine.any(Array)
      }));
    });

    it('validatePayment should return default required fields on empty {}', () => {
      const invalid = payment.validatePayment();
      expect(invalid).toEqual(jasmine.objectContaining({
        valid: false,
        fields: jasmine.any(Array),
        msg: jasmine.any(Array)
      }));
      expect(invalid.fields.length).toEqual(payment.schema.required.length);
      expect(invalid.msg[0]).toEqual('Required fields missing');
    });

    it('validatePayment should return specific type errors', () => {
      const d = clone(PAYMENT);
      d.ccNum = '4242424242424242';
      d.ccCvc = '666';
      d.amount = '1200';

      const invalid = payment.validatePayment(d);
      expect(invalid).toEqual(jasmine.objectContaining({
        valid: false,
        fields: jasmine.any(Array),
        msg: jasmine.any(Array)
      }));
      expect(invalid.fields.length).toEqual(1);
      expect(invalid.fields[0]).toEqual('amount');
      expect(invalid.msg[0]).toEqual('Invalid type: string (expected integer)');
    });

    it('validatePayment should return missing errors', () => {
      const d = clone(PAYMENT);
      d.ccNum = '4242424242424242';
      d.ccCvc = '666';
      delete d.amount;

      const invalid = payment.validatePayment(d);
      expect(invalid).toEqual(jasmine.objectContaining({
        valid: false,
        fields: jasmine.any(Array),
        msg: jasmine.any(Array)
      }));

      expect(invalid.fields.length).toEqual(1);
      expect(invalid.fields[0]).toEqual('amount');
      expect(invalid.msg[0]).toEqual('Missing required property: amount');
    });

    it('validatePayment should return CC errors', () => {
      const d = clone(PAYMENT);
      d.ccNum = '4242421111424242';
      d.ccCvc = '666';

      const invalid = payment.validatePayment(d);
      expect(invalid).toEqual(jasmine.objectContaining({
        valid: false,
        fields: jasmine.any(Array),
        msg: jasmine.any(Array)
      }));

      expect(invalid.fields.length).toEqual(1);
      expect(invalid.fields[0]).toEqual('ccNum');
      expect(invalid.msg[0]).toEqual(`${ invalid.fields[0]} is invalid`);
    });

    it('validatePayment should return currency code errors', () => {
      const d = clone(PAYMENT);
      d.ccNum = '4242424242424242';
      d.ccCvc = '666';
      d.currency = 'a';

      const invalid = payment.validatePayment(d);
      expect(invalid).toEqual(jasmine.objectContaining({
        valid: false,
        fields: jasmine.any(Array),
        msg: jasmine.any(Array)
      }));

      expect(invalid.fields.length).toEqual(1);
      expect(invalid.fields[0]).toEqual('currency');
      expect(invalid.msg[0]).toEqual('currency is not a valid ISO-4217 country code');
    });
  });

  it('fetchCollection will return a promise', () => {
    let request, response; //eslint-disable-line
    const gwid = '123abc';

    const p = payment.fetchCollection(null, gwid).then((r) => {
      response = r;
    }).catch(I);

    expect(p).toEqual(jasmine.any(Promise));
  });

  it('fetchCollection will return attach parameters', (done) => {
    let request, response; //eslint-disable-line
    const server = constants.RESPONSE_200;
    const gwid = '123abc';

    payment.fetchCollection('payments/donations', { gwid }).then((r) => {
      response = r;
    }).catch(I);

    setTimeout(() => {
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(server);
      expect(request.url).toEqual(`/payments/donations?gwid=${ gwid }`);
      done();
    });
  });

  it('health calls the health endpoint', () => {
    spyOn(payment.http, 'get');

    payment.health();
    expect(payment.http.get).toHaveBeenCalledWith('payments/health');
  });

  it('health calls the health endpoint and gets feature status', () => {
    spyOn(payment.http, 'get');

    payment.health({ features: true });
    expect(payment.http.get).toHaveBeenCalledWith('payments/health/features');
  });
});
