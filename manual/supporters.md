# Supporters

Supporters are simple records meant to store information about a potential supporter for your organization. This can take the form of a traditional contact form (name, email, etc) or something more specialized like the answers to a survery or quiz.

Supporter records have a set of common fields, and then a `tags` field which can be used to store arbitraty `JSON` data.

Creating a supporter record does not require authentication.

## Create a supporter record

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.supporters.create({<supporter object>})
    .then(successHandler)
    .catch(errorHandler));
```

Parameter               | Required | Type      | Description
------------------------|----------|-----------|------------
email                   |          | string    | The email address.
givenName               |          | string    | The given (first) name of the Supporter.
familyName              |          | string    | The family (last) name of the Supporter.
address1                |          | string    | The first line of the street address.
address2                |          | string    | The second line of the street address.
city                    |          | string    | The city of the address.
state                   |          | string    | The state of the address.
country                 |          | string    | The country of the address.
postalCode              |          | string    | The 5-digit zip code.
phone                   |          | string    | The phone number.
source                  |          | string    | The source of the record, for analytics purposes (e.g. "2016 winter petition").
tags                    |          | JSON      | A JSON object for storing any arbitrary  parameters.

##### Additional notes on parameters

* `tags` is arbitrary JSON--you can use it to submit whatever additional data you feel is necessary to associate with a Supporter. As long as the data submitted is a valid JSON object, it will be stored as a serialized string of JSON.
* The platform sends each supporter submitted a welcome email. If you want to control which email template they are sent, you must submit the email template name as a root level attribute of tags, named ``email_template``. For instance, to send the spanish language version of the basic welcome mailing, you would specify ``"email_template":"signup_main-es"``
* The total _serialized_ length of the tags object may not be longer than 8192 characters. Serialization to the database is done without any additional whitespace being added. If you submit an oversized `tags` object, the request will fail.
* To avoid triggering a welcome email, you send `"send_email": 0` in the `tags`.

**Response**

```json
{
  "modifiedDate": "2016-04-26T22:21:06.345712Z",
  "uuid": "296bb513-c41b-4778-901b-b6bb9024a904",
  "familyName": "Jacobson",
  "address1": "123 Elm Street",
  "address2": "Apartment 3",
  "tags": {
    "dictKey": {
      "dictScalarKey": "dictScalarVal",
      "dictDictKey": {
        "dictDictKey2": "dictDictVal2",
        "dictDictKey1": "dictDictVal1"
      },
      "dictListKey": [
        "dictListVal1",
        "dictListVal2"
      ]
    },
    "email_template": "signup_main",
    "listKey": [
      "listVal1",
      "listVal2"
    ],
    "scalarKey": "scalarVal",
  },
  "phone": "(123)-456-7890",
  "state": "MA",
  "city": "Great Barrington",
  "givenName": "Jacob",
  "createdDate": "2016-04-26T22:21:06.345689Z",
  "postalCode": "01230",
  "country": "United States",
  "email": "email@email.com",
  "source": "appeal"
}
```
