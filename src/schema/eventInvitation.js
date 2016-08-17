/*eslint-disable quote-props, quotes */

export default Object.freeze({
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "array",
  "items": {
    "id": "0",
    "type": "object",
    "properties": {
      "email": {
        "id": "email",
        "type": "string"
      },
      "familyName": {
        "id": "familyName",
        "type": "string"
      },
      "givenName": {
        "id": "givenName",
        "type": "string"
      },
      "message": {
        "id": "message",
        "type": "string"
      },
      "subject": {
        "id": "subject",
        "type": "string"
      }
    },
    "required": [
      "email"
    ]
  },
  "required": [
    "0"
  ]
});
