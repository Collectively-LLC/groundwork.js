/*eslint-disable quote-props */

export default {
  "description": "Used to hold supporter identity and marketing attribution information",
  "properties": {
    "address2": {
      "type": [
        "string",
        "null"
      ]
    },
    "addressPostalCode": {
      "type": [
        "string",
        "null"
      ]
    },
    "phone": {
      "type": [
        "string",
        "null"
      ]
    },
    "socialHandle": {
      "type": [
        "string",
        "null"
      ]
    },
    "utmMedium": {
      "type": [
        "string",
        "null"
      ]
    },
    "addressCountry": {
      "type": [
        "string",
        "null"
      ]
    },
    "comments": {
      "type": [
        "string",
        "null"
      ]
    },
    "utmCampaign": {
      "type": [
        "string",
        "null"
      ]
    },
    "utmContent": {
      "type": [
        "string",
        "null"
      ]
    },
    "externalId": {
      "type": [
        "string",
        "null"
      ]
    },
    "addressCity": {
      "type": [
        "string",
        "null"
      ]
    },
    "emailTemplate": {
      "type": [
        "string",
        "null"
      ]
    },
    "utmSource": {
      "type": [
        "string",
        "null"
      ]
    },
    "addressCounty": {
      "type": [
        "string",
        "null"
      ]
    },
    "givenName": {
      "type": [
        "string",
        "null"
      ]
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "metadata": {
      "type": [
        "object",
        "null"
      ]
    },
    "familyName": {
      "type": [
        "string",
        "null"
      ]
    },
    "address1": {
      "type": [
        "string",
        "null"
      ]
    },
    "utmTerm": {
      "type": [
        "string",
        "null"
      ]
    },
    "addressStateProvince": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Supporters schema",
  "type": "object",
  "hiddenFields": [
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmContent",
    "utmTerm",
    "emailTemplate",
    "externalId",
    "metadata"
  ],
  "required": [
    "email"
  ]
}