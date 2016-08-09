/*eslint-disable quote-props */

export default Object.freeze({
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'id': '/',
  'type': 'object',
  'properties': {
    'gwid': {
      'id': 'gwid',
      'type': 'string'
    },
    'emailTemplate': {
      'id': 'emailTemplate',
      'type': 'string'
    },
    'raiser': {
      'id': 'raiser',
      'type': 'string'
    },
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
    'familyName': {
      'id': 'familyName',
      'type': 'string'
    },
    'address1': {
      'id': 'address1',
      'type': 'string'
    },
    'address2': {
      'id': 'address2',
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
    'passport': {
      'id': 'passport',
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
    'tags': {
      'id': 'tags',
      'type': 'object'
    },
    'agreeToTerms': {
      'id': 'agreeToTerms',
      'type': 'boolean'
    },
    'source': {
      'id': 'source',
      'type': 'string'
    },
    'submittingUrl': {
      'id': 'submittingUrl',
      'type': 'string'
    },
    'paymentMethod': {
      'id': 'paymentMethod',
      'type': 'string'
    }
  },
  'required': [
    'address1',
    'agreeToTerms',
    'amount',
    'ccCvc',
    'ccExpMonth',
    'ccExpYear',
    'ccNum',
    'city',
    'email',
    'employer',
    'familyName',
    'givenName',
    'occupation',
    'phone',
    'state',
    'zip'
  ]
});
