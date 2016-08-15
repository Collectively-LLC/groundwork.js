/*eslint-disable quote-props */

import SchemaUtils from '../SchemaUtils';
import donationSchema from '../schema/donation';

const PAYMENT = {
  'amount': 2000,
  'givenName': 'Roy',
  'familyName': 'Batty',
  'address1': '320 South Broadway',
  'city': 'Los Angeles',
  'state': 'CA',
  'zip': '90012',
  'country': 'US',
  'email': 'roy.batty@tyrell.com',
  'phone': '555.555.5555',
  'employer': 'Tyrell Corporation',
  'occupation': 'Military',
  'ccNum': '1234123412341234',
  'ccExpMonth': 12,
  'ccExpYear': 2020,
  'ccCvc': '123',
  'agreeToTerms': true
};

describe('(SchemaUtils.test.js)', () => {
  it('validateSchema returns errors for missing schema items', () => {
    expect(SchemaUtils.validateSchema({}, donationSchema).length)
      .toBe(donationSchema.required.length);
  });

  it('validateSchema returns empty array for valid data', () => {
    expect(SchemaUtils.validateSchema(PAYMENT, donationSchema).length)
      .toBe(0);
  });

  it('validateSchema will fail if data is the wrong type', () => {
    const d = PAYMENT;
    d.ccCvc = 123;

    const v = SchemaUtils.validateSchema(d, donationSchema);

    expect(v.length).toBe(1);
    expect(v[0].params.expected).toBe('string');
    expect(v[0].params.type).toBe('number');
  });
});
