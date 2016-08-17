/*eslint-disable quote-props, quotes */

export default Object.freeze({
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "message": {
      "type": "string",
      "id": "message"
    },
    "recipientTypes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "id": "recipientTypes"
    },
    "subject": {
      "type": "string",
      "id": "subject"
    },
    "template": {
      "type": "string",
      "id": "template"
    },
    "title": {
      "type": "string",
      "id": "title"
    }
  },
  "id": "/",
  "required": [
    "recipientTypes",
    "template"
  ]
});
