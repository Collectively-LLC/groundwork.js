/*eslint-disable quote-props, quotes */

export default Object.freeze({
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "description": {
      "id": "description",
      "type": "string"
    },
    "quantityTotal": {
      "id": "quantityTotal",
      "type": "integer"
    },
    "timeEnd": {
      "id": "timeEnd",
      "type": "string"
    },
    "timeStart": {
      "id": "timeStart",
      "type": "string"
    },
    "title": {
      "id": "title",
      "type": "string"
    }
  },
  "required": [
    "quantityTotal",
    "timeEnd",
    "timeStart"
  ]
});
