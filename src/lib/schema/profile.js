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
    'email': {
      'id': 'email',
      'type': 'string'
    },
    'isStaff': {
      'id': 'isStaff',
      'type': 'boolean'
    },
    'isActive': {
      'id': 'isActive',
      'type': 'boolean'
    },
    'dateJoined': {
      'id': 'dateJoined',
      'type': 'string',
      'format': 'date-time'
    },
    'dateModified': {
      'id': 'dateModified',
      'type': 'string',
      'format': 'date-time'
    },
    'dateOfBirth': {
      'id': 'dateOfBirth',
      'type': ['string', 'null'],
      'format': 'date-time'
    },
    'givenName': {
      'id': 'givenName',
      'type': 'string'
    },
    'familyName': {
      'id': 'familyName',
      'type': 'string'
    },
    'honorificPrefix': {
      'id': 'honorificPrefix',
      'type': 'string'
    },
    'honorificSuffix': {
      'id': 'honorificSuffix',
      'type': 'string'
    },
    'gender': {
      'id': 'gender',
      'type': ['integer', 'null'],
      'minimum': 0,
      'maximum': 4
    },
    'genderIdentity': {
      'id': 'genderIdentity',
      'type': 'string'
    },
    'partyIdentification': {
      'id': 'partyIdentification',
      'type': ['integer', 'null'],
      'minimum': 0,
      'maximum': 4
    },
    'password': {
      'id': 'password',
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
    'phoneNumber': {
      'id': 'phoneNumber',
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
    'locality': {
      'id': 'locality',
      'type': 'string'
    },
    'state': {
      'id': 'state',
      'type': 'string'
    },
    'zipCode': {
      'id': 'zipCode',
      'type': 'string'
    }
  },
  'required': [
    'email',
    'familyName',
    'givenName',
    'password'
  ]
});
