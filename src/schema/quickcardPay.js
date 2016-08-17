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
    'tags': {
      'id': 'tags',
      'type': 'object'
    },
    'submittingUrl': {
      'id': 'submittingUrl',
      'type': 'string'
    },
    'emailTemplate': {
      'id': 'emailTemplate',
      'type': 'string'
    },
    'gwid': {
      'id': 'gwid',
      'type': 'string'
    }
  },
  'required': [
    'amount',
    'gwid'
  ]
});
