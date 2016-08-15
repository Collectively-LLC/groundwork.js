/*eslint-disable quote-props */

export default Object.freeze({
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'id': '/',
  'type': 'object',
  'properties': {
    'amount': {
      'id': 'amount',
      'type': 'integer'
    },
    'currency': {
      'id': 'currency',
      'type': 'string'
    },
    'givenName': {
      'id': 'givenName',
      'type': 'string'
    },
    'gwid': {
      'id': 'gwid',
      'type': 'string'
    },
    'familyName': {
      'id': 'familyName',
      'type': 'string'
    },
    'address1': {
      'id': 'address1',
      'type': 'string'
    },
    'city': {
      'id': 'city',
      'type': 'string'
    },
    'state': {
      'id': 'state',
      'type': 'string'
    },
    'zip': {
      'id': 'zip',
      'type': 'string'
    },
    'country': {
      'id': 'country',
      'type': 'string'
    },
    'email': {
      'id': 'email',
      'type': 'string'
    },
    'phone': {
      'id': 'phone',
      'type': 'string'
    },
    'employer': {
      'id': 'employer',
      'type': 'string'
    },
    'occupation': {
      'id': 'occupation',
      'type': 'string'
    },
    'ccNum': {
      'id': 'ccNum',
      'type': 'string'
    },
    'ccExpMonth': {
      'id': 'ccExpMonth',
      'type': 'integer'
    },
    'ccExpYear': {
      'id': 'ccExpYear',
      'type': 'integer'
    },
    'ccCvc': {
      'id': 'ccCvc',
      'type': 'string'
    },
    'agreeToTerms': {
      'id': 'agreeToTerms',
      'type': 'boolean'
    }
  },
  'required': [
    'address1',
    'agreeToTerms',
    'ccCvc',
    'ccExpMonth',
    'ccExpYear',
    'ccNum',
    'city',
    'country',
    'email',
    'employer',
    'familyName',
    'givenName',
    'gwid',
    'occupation',
    'phone',
    'state',
    'zip'
  ]
});
