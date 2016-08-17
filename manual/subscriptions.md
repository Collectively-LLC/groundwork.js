# Subscriptions

``Subscription`` objects allow users to create a recurring donation. Monthly and weekly donations are supported.Subscriptions are recurring payments.

## Create a new subscription

**Example**
```javascript
let gw = new Groundwork({
  apiKey: <API_KEY>
});

gw.subscriptions.create({<subscrioption object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Subscription fields**:

Parameter               | Required | Type      | Description
------------------------|----------|-----------|------------
gwid                    |          | string    | The `gwid` of the user making the Subscription. 
amount                  | &#10004; | integer   | The amount of the Donation, in cents (e.g. $8.00 = "800").
currency                |          | string    | The 3-letter ISO-4217 formatted currency code. Default is "USD".
givenName               | &#10004; | string    | The given (first) name of the user.
familyName              | &#10004; | string    | The family (last) name of the user.
address1                | &#10004; | string    | The first line of the user's billing street address.
address2                |          | string    | The second line of the user's billing street address.
city                    | &#10004; | string    | The city of the user's billing address.
state                   | &#10004; | string    | The state of the user's billing address.
zip                     | &#10004; | string    | The 5-digit zip code of the user's billing address.
country                 |          | string    | The country of the user's billing address.
email                   | &#10004; | string    | The user's email address. An email receipt of the Subscription will be sent here each time a Donation occurs successfully and `sendEmail` is "true".
phone                   |          | string    | The user's phone number.
employer                | &#10004; | string    | The user's employer.
occupation              | &#10004; | string    | The user's occupation.
ccNum                   | &#10004; | string    | The credit card number for the Subscription, as a string and with no separators.
ccExpMonth              | &#10004; | integer   | The month of the credit card expiration date, as a 2-digit number (e.g. March = 03).
ccExpyear               | &#10004; | integer   | The year of the credit card expiration date, as a 4-digit number.
ccCvc                   | &#10004; | string    | The [CVC](https://en.wikipedia.org/wiki/Card_security_code) for the credit card.
tags                    |          | JSON      | A JSON object for storing any additional parameters for the Subscription (e.g. additional survey responses).
agreeToTerms            | &#10004; | boolean   | A boolean indicating whether or not the user agreed to the legal terms around donating.
source                  |          | string    | The source of the Subscription, for analytics purposes (e.g. "home page donate form").
submittingUrl           |          | string    | The URL of the page submitting the donation.
emailTemplate           |          | string    | The name of the email template used to generate the email receipt.
sendEmail               |          | boolean   | A boolean indicating whether an email should be sent upon Subscription creation, notifying the user of their recurring payment.  If not provided, the default value is "true".

**Response**


```json
{
  "subscription": {
    "ccNumLast4": "4242",
    "ccExpMonth": 8,
    "currentPeriodStart": 1461017411,
    "currency": "USD",
    "id": "6fcfa88e02c84eaab6bdd6f3524f1545",
    "occupation": "test",
    "city": "Newt York",
    "zip": "10010",
    "processorPaymentData": {
      "customer": "cus_8ILFb21SewEDLh"
    },
    "employer": "acme",
    "state": "NYC",
    "currentPeriodEnd": 1463609411,
    "email": "example@email.com",
    "tags": {},
    "address1": "123 Elmston Street",
    "address2": "4",
    "familyName": "Last",
    "phone": "1235896839",
    "created": 1461017410,
    "country": "US",
    "interval": "monthly",
    "ccType": "Visa",
    "gwid": "f238fafe-7f0f-454c-910b-9bedbc86d06b",
    "amount": 800,
    "ccExpYear": 2016,
    "cancelled": null,
    "givenName": "First",
    "processor": "stripeinc"
  }
}
```

## Get a list of subscriptions

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.subscriptions.list(<options>)
    .then(successHandler)
    .catch(errorHandler)
```

**Options fields**:

Parameter     | Required | Type    | Description
--------------|----------|---------|------------
gwid          |          | string  | Return Subscriptions from the user with the corresponding `gwid`.
email         |          | string  | Return Subscriptions with the corresponding email address.
page          |          | integer | A metadata parameter for specifying a page of results to return, with a default of 1.
perPage       |          | integer | A metadata parameter for specifying number of results per page, with a default of 10 and a maximum of 50.

**Response**:

```json
{
  "meta": {
    "count": 2,
    "totalPages": 5,
    "params": {
      "perPage": 2,
      "page": 1,
      "email": "example@email.com"
    }
  },
  "subscriptions": [
    {
      "ccNumLast4": "4242",
      "ccExpMonth": 8,
      "currentPeriodStart": 1461020479,
      "currency": "USD",
      "id": "0289c8914cf94e6bb664214d60b25508",
      "occupation": "test",
      "city": "Newt York",
      "zip": "10010",
      "processorPaymentData": {
        "customer": "cus_8IM4pN5r4qR5tk"
      },
      "employer": "acme",
      "state": "NYC",
      "currentPeriodEnd": 1461625279,
      "email": "example@email.com",
      "tags": {},
      "address1": "123 Elmston Street",
      "address2": "4",
      "familyName": "Last",
      "phone": "1235896839",
      "created": 1461020478,
      "country": "US",
      "interval": "weekly",
      "ccType": "Visa",
      "gwid": "f238fafe-7f0f-454c-910b-9bedbc86d06b",
      "amount": 800,
      "ccExpYear": 2016,
      "cancelled": null,
      "givenName": "First",
      "processor": "stripeinc"
    },
    {
      "ccNumLast4": "4242",
      "ccExpMonth": 8,
      "currentPeriodStart": 1461020206,
      "currency": "USD",
      "id": "c8ecb77e767b4b81859920eace1ace04",
      "occupation": "test",
      "city": "Newt York",
      "zip": "10010",
      "processorPaymentData": {
        "customer": "cus_8IM0np6eUXG6AM"
      },
      "employer": "acme",
      "state": "NYC",
      "currentPeriodEnd": 1463612206,
      "email": "example@email.com",
      "tags": {},
      "address1": "123 Elmston Street",
      "address2": "4",
      "familyName": "Last",
      "phone": "1235896839",
      "created": 1461020205,
      "country": "US",
      "interval": "monthly",
      "ccType": "Visa",
      "gwid": "f238fafe-7f0f-454c-910b-9bedbc86d06b",
      "amount": 800,
      "ccExpYear": 2016,
      "cancelled": null,
      "givenName": "First",
      "processor": "stripeinc"
    }
  ]
}
```

## Fetch a subscription

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.subscriptions.fetch(<subscription id>)
    .then(successHandler)
    .catch(errorHandler)
```

**Response**

```json
{
  "subscription": {
    "ccNumLast4": "4242",
    "ccExpMonth": 8,
    "currentPeriodStart": 1461017411,
    "currency": "USD",
    "id": "6fcfa88e02c84eaab6bdd6f3524f1545",
    "occupation": "job",
    "city": "New York",
    "zip": "10010",
    "processorPaymentData": {
      "customer": "cus_8ILFb21SewEDLh"
    },
    "employer": "acme",
    "state": "NYC",
    "currentPeriodEnd": 1463609411,
    "email": "example@email.com",
    "tags": {},
    "address1": "123 Elmston Street",
    "address2": "4",
    "familyName": "Last",
    "phone": "1235896839",
    "created": 1461017410,
    "country": "US",
    "interval": "monthly",
    "ccType": "Visa",
    "gwid": "f238fafe-7f0f-454c-910b-9bedbc86d06b",
    "amount": 800,
    "ccExpYear": 2016,
    "cancelled": null,
    "givenName": "First",
    "processor": "stripeinc"
  }
}
```

## Delete (cancel) a subscription

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.subscriptions.del(<subscription id>)
    .then(successHandler)
    .catch(errorHandler)
```

**Response**

Note the `cancelled` field:

```json
{
  "subscription": {
    "ccNumLast4": "4242",
    "ccExpMonth": 8,
    "currentPeriodStart": 1460059147,
    "currency": "USD",
    "id": "35c280c41d994abcbffa2787a3d04e2e",
    "occupation": "test",
    "city": "Newt York",
    "zip": "10010",
    "processorPaymentData": {
      "customer": "cus_8EBeEYP2zLly1T"
    },
    "employer": "acme",
    "state": "NYC",
    "currentPeriodEnd": 1462651147,
    "email": "example@email.com",
    "tags": {},
    "address1": "123 Elmston Street",
    "address2": "4",
    "familyName": "Last",
    "phone": "1235896839",
    "created": 1460059146,
    "country": "US",
    "interval": "monthly",
    "ccType": "Visa",
    "gwid": "f238fafe-7f0f-454c-910b-9bedbc86d06b",
    "amount": 12490385930283,
    "ccExpYear": 2016,
    "cancelled": 1440721294,
    "givenName": "First",
    "processor": "stripeinc"
  }
}
```

## Change the amount of a subscription

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.subscriptions.updateAmount(<subscription id>, <new amount>)
    .then(successHandler)
    .catch(errorHandler)
```

**Response**

```json
{
    "subscription": {
        "address1": "123 Main St",
        "address2": "",
        "amount": 200,
        "cancelled": null,
        "ccExpMonth": 12,
        "ccExpYear": 2020,
        "ccNumLast4": "4242",
        "ccType": "Visa",
        "city": "New York City",
        "country": "US",
        "created": 1440719921,
        "currentPeriodEnd": 1443398322,
        "currentPeriodStart": 1440719922,
        "email": "example@email.com",
        "employer": "Acme",
        "familyName": "Jameson",
        "givenName": "James",
        "gwid": "",
        "id": "c3f5904a4073482f92d7701dcd0211e6",
        "interval": "monthly",
        "occupation": "Designer",
        "phone": "2125555555",
        "processor": "stripeinc",
        "processorPaymentData": {
            "customer": "cus_6sKwBd2aWd5JPZ"
        },
        "raiser": null,
        "state": "NY",
        "tags": {},
        "zip": "11201"
    }
}
```
