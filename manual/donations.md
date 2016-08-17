# Donations

## A note about currencies

The **amount** of a donation is stored as an integer representing the value in **cents**. For example, to send a donation of USD $10.00 you would send in the **amount** as `1000`, which is `10.00 * 100`. The same would apply for other currencies that are divisible: EUR € 12.50 would be stored as `1250`, or `12.50 * 100`.

For currencies which are **not** divisible, such as Japanese Yen (JPY) you would send in the exact amount: JPY 1240¥ would be stored as `1240`.

We provide helper methods to help you with these conversions:

#### `removeCurrencyFormatting`

```javascript
gw.donations.removeCurrencyFormatting('$1,123.33'); // '1123.33'
```

#### `toCents`

**Note**: Do not use this on indivisble currencies like Japanese Yen.

```javascript
gw.donations.toCents('$1,000'); // '100000'
gw.donations.toCents('$1,123.33'); // '112333'
```

#### `toIndivisible`

**Note:** Only use this on currencies which cannot be divided into smaller units, such as Japanese Yen.

```javascript
gw.donations.toIndivisible('¥12,300'); // '12300'
gw.donations.toIndivisible('¥12,300.55'); // '12301'
```

#### `formatCurrency`

Correctly format an integer as a string using the [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.

```javascript
gw.donations.formatCurrency('1230', 'JPY'); // '¥1,230'
gw.donations.formatCurrency('123055', 'USD'); // '$1,230.55'
```

#### Currency handling

The platform can accept donations in different currencies. In your request payloads there is an optional `currency` field which accepts a valid [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217) currency code. This defaults to `USD` if not sent.


## Create a new donation

**Summary**: You can [`create`](https://cdn.thegroundwork.com/groundworkjs/doc/class/src/Donation.js~Donation.html#instance-method-create) a Donation using **groundwork.js**. This request does _not_ need to be authenticated. Once you've created an instance of groundwork.js with your `apiKey` you can pass a Donation object (using the fields below) to `create`.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.donations.create({<donation object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Donation fields**

Parameter               | Required | Type      | Description
------------------------|----------|-----------|------------
gwid                    |          | string    | The `gwid` of the user making the Donation. 
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
email                   | &#10004; | string    | The user's email address. An email receipt of the Donation will be sent here if successful and `sendEmail` is "true".
phone                   |          | string    | The user's phone number.
employer                | &#10004; | string    | The user's employer.
occupation              | &#10004; | string    | The user's occupation.
ccNum                   | &#10004; | string    | The credit card number for the Donation, as a string and with no separators.
ccExpMonth              | &#10004; | integer   | The month of the credit card expiration date, as a 2-digit number (e.g. March = 03).
ccExpyear               | &#10004; | integer   | The year of the credit card expiration date, as a 4-digit number.
ccCvc                   | &#10004; | string    | The [CVC](https://en.wikipedia.org/wiki/Card_security_code) for the credit card.
paymentMethod           |          | string    | The payment method. If `paymentMethod` is included, it must be "card". It will default to "card" if left out of the request.
tags                    |          | JSON      | A JSON object for storing any additional parameters for the Donation (e.g. additional survey responses).
agreeToTerms            | &#10004; | boolean   | A boolean indicating whether or not the user agreed to the legal terms around donating.
source                  |          | string    | The source of the Donation, for analytics purposes (e.g. "home page donate form").
submittingUrl           |          | string    | The URL of the page submitting the Donation.
emailTemplate           |          | string    | The name of the email template used to generate the email receipt.
sendEmail               |          | boolean   | A boolean indicating whether an email should be sent upon successful Donation.  If not provided, the default value is "true".

## Get a list of donations

**Summary**: When making the request, you **must** supply one (and only one) of the four filtering criteria (`gwid`, `subscription`, `quickCard`, or `email`).

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.donations.list({<options>})
    .then(successHandler)
    .catch(errorHandler));
```

**Optional fields**

Parameter     | Required | Type    | Description
--------------|----------|---------|------------
gwid          |          | string  | Return Donations from the user with the corresponding `gwid`.
subscription  |          | string  | Return Donations with the corresponding Subscription id.
quickCard     |          | string  | Return Donations with the corresponding QuickCard id.
email         |          | string  | Return Donations with the corresponding email address.
page          |          | integer | A metadata parameter for specifying a page of results to return, with a default of 1.
perPage       |          | integer | A metadata parameter for specifying number of results per page, with a default of 10 and a maximum of 50.

**Response**

```json
{
  "meta": {
    "count": 2,
    "totalPages": 7,
    "params": {
      "perPage": 2,
      "page": 1,
      "email": "example@email.com"
    }
  },
  "donations": [
    {
      "currency": "USD",
      "id": "5595e20a90014f8db2783d354f55880e",
      "occupation": "test",
      "city": "New York",
      "quickCard": "",
      "zip": "10010",
      "processorPaymentData": {
        "chargeId": "ch_181iihGqCW8jAjllhvxj9rcC",
        "cardId": "card_181iihGqCW8jAjll7pxLp81A"
      },
      "employer": "acme",
      "state": "NY",
      "paymentMethod": "card",
      "email": "example@email.com",
      "tags": {
        "event_id": "4665"
      },
      "deleted": null,
      "address1": "123 Elm Street",
      "address2": "4th floor",
      "familyName": "Jameson",
      "phone": "2125555555",
      "subscription": "",
      "created": 1461010304,
      "country": "US",
      "gwid": "f238fafe-7f0f-454c-910b-9bedbc86d06b",
      "amount": 800,
      "givenName": "James",
      "processor": "stripeinc"
    },
    {
      "currency": "USD",
      "id": "f71b66caf0c74e08a8de6e8caec046a5",
      "occupation": "test",
      "city": "New York",
      "quickCard": "",
      "zip": "10010",
      "processorPaymentData": {
        "chargeId": "ch_181igyGqCW8jAjllzJ1zHQq9",
        "cardId": "card_181igyGqCW8jAjlle5prlCUa"
      },
      "employer": "acme",
      "state": "NY",
      "paymentMethod": "card",
      "email": "example@email.com",
      "tags": {
        "event_id": "4665"
      },
      "deleted": null,
      "address1": "123 Elm Street",
      "address2": "4th floor",
      "familyName": "Jameson",
      "phone": "2125555555",
      "subscription": "",
      "created": 1461010196,
      "country": "US",
      "gwid": "",
      "amount": 800,
      "givenName": "James",
      "processor": "stripeinc"
    }
  ]
}
```

## Fetch a donation

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.donations.fetch({<donation id>})
    .then(successHandler)
    .catch(errorHandler));
```

**Response**


```json
{
  "donation": {
    "currency": "USD",
    "id": "5595e20a90014f8db2783d354f55880e",
    "occupation": "test",
    "city": "New York",
    "quickCard": "",
    "zip": "10010",
    "processorPaymentData": {
      "chargeId": "ch_181iihGqCW8jAjllhvxj9rcC",
      "cardId": "card_181iihGqCW8jAjll7pxLp81A"
    },
    "employer": "acme",
    "state": "NY",
    "paymentMethod": "card",
    "email": "example@email.com",
    "tags": {
      "event_id": "4665"
    },
    "deleted": null,
    "address1": "123 Elm Street",
    "address2": "4th floor",
    "familyName": "Jameson",
    "phone": "2125555555",
    "subscription": "",
    "created": 1461010304,
    "country": "US",
    "gwid": "f238fafe-7f0f-454c-910b-9bedbc86d06b",
    "amount": 800,
    "givenName": "James",
    "processor": "stripeinc"
  }
}
```
