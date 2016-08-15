/*eslint-disable quote-props, quotes */

export default Object.freeze({
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "address1": {
      "id": "address1",
      "type": "string"
    },
    "address2": {
      "id": "address2",
      "type": "string"
    },
    "addressCity": {
      "id": "addressCity",
      "type": "string"
    },
    "addressCountry": {
      "id": "addressCountry",
      "type": "string"
    },
    "addressCounty": {
      "id": "addressCounty",
      "type": "string"
    },
    "addressDistrict": {
      "id": "addressDistrict",
      "type": "string"
    },
    "addressPostalCode": {
      "id": "addressPostalCode",
      "type": "string"
    },
    "addressStateOrProvince": {
      "id": "addressStateOrProvince",
      "type": "string"
    },
    "description": {
      "id": "description",
      "type": "string"
    },
    "locationName": {
      "id": "locationName",
      "type": "string"
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
    "address1",
    "addressCity",
    "addressCountry",
    "addressPostalCode",
    "description",
    "timeEnd",
    "timeStart",
    "title"
  ]
});
