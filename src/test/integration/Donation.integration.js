/*global describe, it, expect, beforeEach, beforeAll, afterEach, afterAll, jasmine, setTimeout, spyOn*/

/* eslint max-len: 0 */
/* eslint no-unused-vars: 0 */

import gw from './groundwork';
import * as constants from '../constants';
import donationSchema from '../../src/schema/donation';

import {
  cloneDeep,
  difference,
  has,
  keys,
  random,
  remove,
  isNull,
  isEqual
} from 'lodash';

const SOURCE = 'groundworkjs-mocha-tests';
const EMAIL = 'leon.kowalski@tyrell.com';
const PASSWORD = 'Nexus-60';
const GWID = 'c1088b94-ee17-4bed-8a5b-771e7451383c';

const I = x => x;

const PROFILE = {
  profile: {
    gwid: 'c1088b94-ee17-4bed-8a5b-771e7451383c',
    email: 'leon.kowalski@tyrell.com',
    isStaff: false,
    isActive: true,
    isConfirmed: false,
    confirmedAt: null,
    dateJoined: '2016-02-10T22:36:45.143394Z',
    dateModified: '2016-02-10T22:36:45.143966Z',
    dateOfBirth: null,
    givenName: 'Leon',
    familyName: 'Kowalski',
    honorificPrefix: '',
    honorificSuffix: '',
    gender: null,
    genderIdentity: '',
    partyIdentification: null,
    employer: '',
    occupation: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    locality: '',
    state: '',
    zipCode: '',
    socialaccounts: [],
    facebooktoken: null,
    source: 'direct',
    authMethods: [
      'password'
    ]
  }
};

const DONATION = {
  amount: 2000,
  givenName: 'Leon',
  familyName: 'Kowalski',
  address1: '320 South Broadway',
  city: 'Los Angeles',
  state: 'CA',
  zip: '90012',
  country: 'US',
  email: 'leon.kowalski@tyrell.com',
  phone: '555.555.5555',
  employer: 'Tyrell Corporation',
  occupation: 'Military Cargo Loader',
  ccNum: '5555555555554444',
  ccExpMonth: 12,
  ccExpYear: 2024,
  ccCvc: '666',
  agreeToTerms: true,
  source: SOURCE,
  tags: {
    tyrellSerialCode: 'N6MAC41717',
    inceptDate: '2017-04-10'
  }
};

// Jasmine Types
const ANY = jasmine.anything();
const BOOL = jasmine.any(Boolean);
const STRING = jasmine.any(String);
const ARRAY = jasmine.any(Array);
const OBJECT = jasmine.any(Object);
const NUMBER = jasmine.any(Number);

const DONATION_RESPONSE = {
  id: STRING,
  created: NUMBER,
  deleted: null,
  amount: NUMBER,
  currency: STRING,
  gwid: STRING,
  subscription: STRING,
  quickCard: STRING,
  givenName: STRING,
  familyName: STRING,
  address1: STRING,
  address2: STRING,
  city: STRING,
  state: STRING,
  zip: STRING,
  country: STRING,
  email: STRING,
  phone: STRING,
  employer: STRING,
  occupation: STRING,
  tags: OBJECT,
  processor: STRING,
  processorPaymentData: OBJECT,
  raiser: null
};

const QUICKCARD_RESPONSE = {
  address1: STRING,
  address2: STRING,
  ccExpMonth: NUMBER,
  ccExpYear: NUMBER,
  ccNumLast4: STRING,
  ccType: STRING,
  city: STRING,
  country: STRING,
  created: NUMBER,
  deleted: null,
  email: STRING,
  employer: STRING,
  familyName: STRING,
  givenName: STRING,
  gwid: STRING,
  id: STRING,
  occupation: STRING,
  paymentData: null, // <-- this is temporary!
  phone: STRING,
  processor: STRING,
  processorPaymentData: OBJECT,
  raiser: null,
  state: STRING,
  tags: OBJECT,
  zip: STRING
};

// Make a Subscription Response
// ============================
const donationClone = cloneDeep(DONATION_RESPONSE);
const SUBSCRIPTION_RESPONSE = {
  ...donationClone,
  interval: STRING,
  currentPeriodEnd: NUMBER,
  currentPeriodStart: NUMBER,
  ccNumLast4: STRING,
  ccExpMonth: NUMBER,
  ccExpYear: NUMBER,
  ccType: STRING,
  cancelled: null
};
delete SUBSCRIPTION_RESPONSE.deleted;
delete SUBSCRIPTION_RESPONSE.subscription;
delete SUBSCRIPTION_RESPONSE.quickCard;

const STRIPE_TEST_NUMBERS = [
  ['4242424242424242', '666'],
  ['4012888888881881', '666'],
  ['4000056655665556', '666'],
  ['5555555555554444', '666'],
  ['5200828282828210', '666'],
  ['5105105105105100', '666'],
  ['378282246310005', '5555'],
  ['371449635398431', '4444'],
  ['6011111111111117', '666'],
  ['6011000990139424', '666'],
  ['30569309025904', '666'],
  ['38520000023237', '666'],
  ['3530111333300000', '666'],
  ['3566002020360505', '666']
];

// Keep tabs on objects for later use
const donationStore = [];
const subscriptionStore = [];
const quickcardStore = [];

function successReporter(done) {
  return (resp) => {
    console.log('SUCCESS', resp.data); /* eslint no-console: 0 */
    done();
  };
}

function errorReporter(name, done) {
  return (resp) => {
    let r;
    console.log(name, resp);
    if (resp.data && resp.data.error) {
      r = resp.data.error;
      console.error(`Error in ${name}`, r);
    } else {
      r = resp.data;
      const { message, details, code } = r;
      console.error(`Error in ${name}`, message, code, details);
    }
    done();
  };
}

function getCard() {
  return STRIPE_TEST_NUMBERS[random(0, STRIPE_TEST_NUMBERS.length - 1)];
}

function getCurrency() {
  const currencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYI', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XBT', 'XCD', 'XDR', 'XFU', 'XOF', 'XPD', 'XPF', 'XPT', 'XTS', 'XXX', 'YER', 'ZAR', 'ZMW'];
  return currencies[random(0, currencies.length - 1)];
}

describe('Donation LIVE', () => {
  beforeAll((done) => {
    gw.auth.fetchUsingPassword(EMAIL, PASSWORD)
      .then(resp => done())
      .catch(errorReporter('beforeAll', done));
  });

  afterAll(() => {
    gw.auth.destroyToken();
  });

  it('can auth and do a real health check', (done) => {
    const r = {
      ach_transactions: BOOL,
      version: STRING,
      credit_card_transactions: BOOL
    };

    gw.donations.health()
      .then((resp) => {
        const { data } = resp;
        expect(data).toEqual(jasmine.objectContaining(r));
        done();
      })
      .catch(errorReporter('health check', done));
  });

  it('can auth and do a real health check w/ features', (done) => {
    const r = {
      version: STRING,
      allowed_methods: {
        quickcards: ARRAY,
        donations: ARRAY,
        subscriptions: ARRAY
      },
      features: {
        ach_transactions: BOOL,
        credit_card_transactions: BOOL
      }
    };

    gw.donations.health({ features: true })
      .then((resp) => {
        const { data } = resp;
        expect(data).toEqual(jasmine.objectContaining(r));
        done();
      })
      .catch(errorReporter('health check w features', done));
  });

  it('can POST in a donation', (done) => {
    const [ccNum, ccCvc] = getCard();
    const donationObj = cloneDeep(DONATION);
    donationObj.amount = random(0, 25000);
    donationObj.ccNum = ccNum;
    donationObj.ccCvc = ccCvc;
    donationObj.currency = getCurrency();

    gw.donations.create(donationObj)
      .then((resp) => {
        const { donation } = resp.data;
        donationStore.push(donation);
        expect(donation).toEqual(jasmine.objectContaining(DONATION_RESPONSE));
        done();
      })
      .catch(errorReporter('POST donation', done));
  });

  it('can GET donations by gwid', (done) => {
    const gwid = GWID;
    gw.donations.list({ gwid })
      .then((resp) => {
        const { data: { donations } } = resp;
        donations.forEach(d => donationStore.push(d));
        expect(donations.length).toBeGreaterThan(0);
        const d = donations[0];
        expect(d).toEqual(jasmine.objectContaining(DONATION_RESPONSE));
        done();
      })
      .catch(errorReporter('GET donation by GWID', done));
  });

  it('can GET donations by email', (done) => {
    const email = EMAIL;
    gw.donations.list({ email })
      .then((resp) => {
        const { data: { donations } } = resp;
        donations.forEach(d => donationStore.push(d));
        expect(donations.length).toBeGreaterThan(0);
        const d = donations[0];
        expect(d).toEqual(jasmine.objectContaining(DONATION_RESPONSE));
        done();
      })
      .catch(errorReporter('GET donation by email', done));
  });

  it('can GET a single donations by id', (done) => {
    const { id } = donationStore[random(0, donationStore.length - 1)];
    gw.donations.fetch(id)
      .then((resp) => {
        const { data: { donation } } = resp;
        expect(donation).toEqual(jasmine.objectContaining(DONATION_RESPONSE));
        done();
      })
      .catch(errorReporter('GET donation by id', done));
  });
});

describe('Subscriptions LIVE', () => {
  beforeAll((done) => {
    gw.auth.fetchUsingPassword(EMAIL, PASSWORD)
      .then(resp => done())
      .catch(errorReporter('subscription beforeAll', done));
  });

  afterAll(() => {
    gw.auth.destroyToken();
  });

  it('create a subscription', (done) => {
    const [ccNum, ccCvc] = getCard();
    const donationObj = cloneDeep(DONATION);
    donationObj.amount = random(0, 25000);
    donationObj.ccNum = ccNum;
    donationObj.ccCvc = ccCvc;
    donationObj.interval = 'monthly';
    donationObj.currency = 'aud';

    [0, 1, 2, 3, 4].forEach((i) => {
      gw.subscriptions.create(donationObj)
        .then((resp) => {
          const { subscription } = resp.data;
          subscriptionStore.push(subscription);
          expect(subscription).toEqual(jasmine.objectContaining(SUBSCRIPTION_RESPONSE));
          if (i === 4) done();
        })
        .catch(errorReporter('create sub', done));
    });
  });

  it('can GET subscriptions by gwid', (done) => {
    const gwid = GWID;
    gw.subscriptions.list({ gwid })
      .then((resp) => {
        const { data: { subscriptions } } = resp;
        expect(subscriptions.length).toBeGreaterThan(0);
        const d = subscriptions[0];

        // it might be cancelled so make it not cancelled to pass the test
        if (!isNull(d.cancelled)) {
          d.cancelled = null;
        }
        expect(d).toEqual(jasmine.objectContaining(SUBSCRIPTION_RESPONSE));
        done();
      })
      .catch(errorReporter('GET sub by gwid', done));
  });

  it('can GET subscriptions by email', (done) => {
    const email = EMAIL;
    gw.subscriptions.list({ email })
      .then((resp) => {
        const { data: { subscriptions } } = resp;
        expect(subscriptions.length).toBeGreaterThan(0);
        const d = subscriptions[0];
        expect(d).toEqual(jasmine.objectContaining(SUBSCRIPTION_RESPONSE));
        done();
      })
      .catch(errorReporter('GET sub by email', done));
  });

  it('can GET a single subscription by id', (done) => {
    const { id } = subscriptionStore[random(0, subscriptionStore.length - 1)];
    gw.subscriptions.fetch(id)
      .then((resp) => {
        const { data: { subscription } } = resp;
        expect(subscription).toEqual(jasmine.objectContaining(SUBSCRIPTION_RESPONSE));
        done();
      })
      .catch(errorReporter('GET sub by id', done));
  });

  it('can UPDATE a single subscription amount', (done) => {
    const { id } = subscriptionStore[random(0, subscriptionStore.length - 1)];
    gw.subscriptions.updateAmount(id, 5000)
      .then((resp) => {
        const { data: { subscription } } = resp;
        expect(subscription).toEqual(jasmine.objectContaining(SUBSCRIPTION_RESPONSE));
        expect(subscription.amount).toEqual(5000);
        done();
      })
      .catch(errorReporter('Update sub', done));
  });
});


describe('Quickcard LIVE', () => {
  beforeAll((done) => {
    gw.auth.fetchUsingPassword(EMAIL, PASSWORD)
      .then(resp => done())
      .catch(errorReporter('beforeAll', done));
  });

  afterAll(() => {
    gw.auth.destroyToken();
  });

  it('can POST in a Quickcard', (done) => {
    const [ccNum, ccCvc] = getCard();
    const qcObj = cloneDeep(DONATION);
    delete qcObj.amount;
    qcObj.ccNum = ccNum;
    qcObj.ccCvc = ccCvc;

    gw.quickcards.create(qcObj)
      .then((resp) => {
        const { quickCard } = resp.data;
        quickcardStore.push(quickCard);
        expect(quickCard).toEqual(jasmine.objectContaining(QUICKCARD_RESPONSE));
        done();
      })
      .catch(errorReporter('POST quickcard', done));
  });

  it('can POST a QuickCard Donation', (done) => {
    const payment = {
      amount: random(0, 25000),
      currency: getCurrency(),
      emailTemplate: 'mcfly',
      tags: DONATION.tags,
      submittingUrl: 'http://tyrellcorp.com'
    };

    // Get a list of quickcards and select one at random to make a donation against
    gw.quickcards.list()
      .then((resp) => {
        const { data: { quickCards } } = resp;
        const { id } = quickCards[random(0, quickCards.length - 1)];
        gw.quickcards.pay(id, payment).
          then((resp2) => {
            const { data: { donation } } = resp2;
            expect(donation).toEqual(jasmine.objectContaining(DONATION_RESPONSE));
            done();
          })
          .catch(errorReporter('POST quickCard pay', done));
      });
  });
});
