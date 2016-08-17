import CreditCard from 'credit-card';
import currencyFormatter from 'currency-formatter';
import numeral from 'numeral';

import Dictionary from './Dictionary';
import SchemaUtils from './SchemaUtils';
import { isEmpty, has, urlJoin } from './utils';
import * as constants from './constants';

import {
  cloneDeep,
  forEach,
  merge
} from 'lodash';

/** @type {String} - API endpoint for resource */
const NAMESPACE = 'payments';

/** @type {Object} - used to map validation errors to fields */
const CC_MAP = Object.freeze({
  validCardNumber: 'ccNum',
  validExpiryMonth: 'ccExpMonth',
  validExpiryYear: 'ccExpYear',
  validCvv: 'ccCvc',
  isExpired: 'expiration'
});

export default class Payment {
  /**
   * @param {Dictionary} [config] - configuration dictionary
   * @param {Http} http
   */
  constructor(config, http) {
    /** @type {Dictionary} */
    this.config = (config && config instanceof Dictionary) ?
      config : new Dictionary();

    // Resource must have an Http instance
    if (!http) {
      throw new Error('Payment requires Http');
    }

    /** @type {Http} */
    this.http = http;

    /** @type {String} */
    this.namespace = NAMESPACE;

    /** @type {SchemaUtils} */
    this.schemaUtils = SchemaUtils;
  }

  /**
   * If a specific function argument is missing then send back a tuple with a
   * rejected Promise containing an error message.
   *
   * @param {*} arg - value to check
   * @param {String} name - name of argument being checked
   * @return {Array}
   */
  validateArg(arg, name = '') {
    let out = [true];

    if (arg === null || arg === undefined || arg === false) {
      const response = this.http.generateErrorResponse({
        valid: false,
        fields: [name],
        msg: [`Missing Argument: ${name}`]
      });
      out = [false, Promise.reject(response)];
    }

    return out;
  }

  /**
   * Return a validation object with Booleans for each item of the card
   *
   * @param {Object} [payment] - payment object
   * @return {Object}
   */
  validateCreditCard(payment = {}) {
    const { ccNum, ccExpMonth, ccExpYear, ccCvc } = payment;
    const card = {
      cardType: CreditCard.determineCardType(ccNum),
      number: ccNum,
      expiryMonth: String(ccExpMonth),
      expiryYear: String(ccExpYear),
      cvv: String(ccCvc)
    };
    return CreditCard.validate(card);
  }

  /**
   * If no ID is present, then send back a tuple with a rejected Promise with an
   * error message
   *
   * @param {String} id
   * @return {Array}
   */
  validateId(id = '') {
    let out = [true];

    if (id.length === 0) {
      const response = this.http.generateErrorResponse({
        valid: false,
        fields: ['id'],
        msg: ['Missing ID']
      });
      out = [false, Promise.reject(response)];
    }
    return out;
  }

  /**
   * If code is not a valid country code for currencies then return an updated
   * errors object we can give back to the user
   *
   * @param {String} code
   * @param {Object} errors
   * @return {Object}
   */
  validateCurrencyCode(code, errors) {
    const errs = cloneDeep(errors);
    const upCode = String(code).toUpperCase();
    const codeCheck = currencyFormatter.findCurrency(upCode);

    if (!codeCheck || codeCheck.code !== upCode) {
      errs.msg.push('currency is not a valid ISO-4217 country code');
      errs.fields.push('currency');
    }

    return errs;
  }

  /**
   * If no interval is present, or its not set to 'weekly' or 'monthly'
   * then send back a tuple with a rejected Promise with an error message
   *
   * @param {String} interval
   * @return {Array}
   */
  validateInterval(interval) {
    let out = [true];

    // Slightly complex check is complex
    const test = (t) => {
      if (!t) { return false; }
      if (t === 'weekly' || t === 'monthly') { return false; }
      return true;
    };

    if (test(interval)) {
      const response = this.http.generateErrorResponse({
        valid: false,
        fields: ['interval'],
        msg: ['Interval must be weekly or monthly']
      });
      out = [false, Promise.reject(response)];
    }
    return out;
  }

  /**
   * Validate the payment against the schema. If it fails then return a tuple
   * with a rejected Promise containing an error message
   *
   * @param {Object} payment
   * @param {Object} schema
   * @return {Array}
   */
  validateSchema(payment, schema) {
    let out = [true];

    const valid = this.schemaUtils.validateSchema(this.attachIdentity(payment),
                                                schema);
    if (valid.length > 0) {
      const ret = this.http.generateErrorObject();
      valid.forEach((err) => {
        ret.msg.push(err.message);
        ret.fields.push(this.schemaUtils.extractFieldByError(err));
      });
      out = [false, Promise.reject(this.http.generateErrorResponse(ret))];
    }
    return out;
  }

  /**
   * Generate a standardized validation message for payment object. The
   * payment object should already have its types coerced before being
   * passed into this function.
   *
   * @param {Object} payment
   * @param {Object} [schema]
   * @return {Object}
   */
  validatePayment(payment, schema) {
    let ret = this.http.generateErrorObject();
    const _schema = schema || this.schema;
    const validSchema = this.schemaUtils.validateSchema(payment, _schema);

    // Bail out on empty form
    if (!payment || isEmpty(payment)) {
      ret.msg = ['Required fields missing'];
      ret.fields = this.schema.required;
      return ret;
    }

    // Loop through schema errors and build up
    if (validSchema.length > 0) {
      validSchema.forEach((err) => {
        ret.msg.push(err.message);
        ret.fields.push(this.schemaUtils.extractFieldByError(err));
      });
    }

    // Check the CC
    ret = this.validateCCPayment(payment, ret);

    // Check currency code if it exists
    if (has(payment, 'currency')) {
      ret = this.validateCurrencyCode(payment.currency, ret);
    }

    if (ret.fields.length === 0) {
      ret.valid = true;
    }
    return ret;
  }

  /**
   * Build up validation errors related to Credit Cards
   *
   * @access private
   * @param {Object} payment
   * @param {Object} errors - http error object
   * @return {Object}
   */
  validateCCPayment(payment, errors) {
    const ret = cloneDeep(errors);
    const validCard = this.validateCreditCard(payment);
    delete validCard.customValidation; // Un-used

    forEach(validCard, (val, key) => {
      if (!val && key !== 'isExpired') {
        const field = CC_MAP[key];
        ret.msg.push(`${ field } is invalid`);
        ret.fields.push(field);
      }
    });

    if (validCard.isExpired) {
      ret.msg.push('Credit card expired');
      ret.fields.push(CC_MAP.isExpired);
    }

    return ret;
  }

  /**
   * Remove all currency symbols and punctuation from amount (except for
   * decimal)
   *
   * @example
   * removeCurrencyFormatting('$1,123.33'); // => '1123.33'
   *
   * @param {String} [amount] - currency amount
   * @return {String}
   */
  removeCurrencyFormatting(amount = '') {
    let _amount = amount;
    if (typeof _amount !== 'string') {
      _amount = String(_amount);
    }
    return numeral(_amount).format('0.00');
  }

  /**
   * Remove any currency formatting and return as an Integer. This is
   * specifically for dealing with non-divisible currencies such as Yen
   * which cannot be divided into 'cents'. Also, this will round up
   * (see example)
   *
   * @example
   * toIndivisible('-¥12,300') // => 12300
   * toIndivisible('-¥12,300.55') // => 12301
   *
   * @param {String} [amount]
   * @return {Number}
   */
  toIndivisible(amount = '') {
    return Math.abs(Number(this.removeCurrencyFormatting(amount)).toFixed(0));
  }

  /**
   * Convert a currency amount into a 'cents' value
   *
   * !! Note: expects amount to be an amount divisible by 100, such as dollars
   * or euros. If using a non-divisible amount such as Yen then do not use
   * this function and use toIndivisible
   *
   * @example
   * toCents('$12.04') // => 1204
   * toCents(1000) // => 100000
   *
   * @param {String} amount - string representation of value
   * @return {Number}
   */
  toCents(amount = '') {
    const amt = this.removeCurrencyFormatting(amount);
    const abs = Math.abs(Number(amt).toFixed(2));
    return (abs <= 0) ? Number(String(abs).replace(/\D/g, '')) : abs * 100;
  }

  /**
   * Format the amount from API in cents  based on the ISO-4217 country
   * code provided
   *
   * @param {Number} [cents] - amount from API in cents
   * @param {String} code
   * @return {String}
   */
  formatCurrency(cents = 0, code) {
    const { decimalDigits } = currencyFormatter.findCurrency(code);
    const amount = Number(cents) / Math.pow(10, decimalDigits);
    return currencyFormatter.format(amount, { code });
  }

  /**
   * If a GWID is present then attach to the request. This is immutable,
   * a new object is returned (we don't mutate the original payment)
   *
   * @param {Object} [payment]
   * @return {Object}
   */
  attachIdentity(payment = {}) {
    const fields = {};
    const auth = this.config.get(constants.CONFIG_AUTH);
    if (has(auth, 'gwid')) {
      fields.gwid = auth.gwid;
    }
    return merge({}, payment, fields);
  }

  /**
   * Interface to Http::get
   *
   * @access private
   * @param {String} url
   * @param {Object} params
   * @return {Promise}
   */
  fetchCollection(url = '', params = {}) {
    return this.http.get(url, { params });
  }

  /**
   * GET the health status of the Donations service. Passing in features: true
   * will get the status of the service AND its available features
   *
   * @param {Object} opts
   * @param {Boolean} [opts.features] - get features status
   * @return {Proimise}
   */
  health(opts = {}) {
    const { features } = opts;
    const urlBase = urlJoin(this.namespace, 'health');
    const url = (features) ? urlJoin(urlBase, 'features') : urlBase;
    return this.http.get(url);
  }
}
