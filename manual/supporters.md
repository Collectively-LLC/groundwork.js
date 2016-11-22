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

Parameter                    | Required | Type      | Description
-----------------------------|----------|-----------|------------
address1                |          | string    | The first line of Supporter's street address.
address2                |          | string    | The second line of Supporter's street address.
addressCity             |          | string    | The city of Supporter's address.
addressCountry          |          | string    | The country of Supporter's address.
addressCounty           |          | string    | The county of Supporter's address.
addressPostalCode       |          | string    | The postal code of Supporter's address.
addressStateProvince    |          | string    | The state of Supporter's address.
comments                |          | string    | Free text entered by Supporter, e.g. on a webform.
email                   | &#10004; | string    | The Supporter's RFC-5322-compliant email address.
emailTemplate           |          | string    | Used to to specify the template (omitting the file extension, e.g. specify "welcome" to use a template file named "welcome.html") for a post-submission email. See **Note** below.
externalId              |          | string    | Used to hold a reference to another record within or outside The Groundwork.
familyName              |          | string    | The Supporter's family (last) name.
givenName               |          | string    | The Supporter's given (first) name.
metadata                |          | object    | A JSON object used to hold arbitrary additional data you would like to associate with this supporter record.
phone                   |          | string    | The Supporter's phone number.
schemaId                     |          | string    | The `id` of the Schema used to validate the Supporter record.
socialHandle            |          | string    | The Supporter's social (e.g. Twitter) handle. Used for contact information, not authentication.  See [Profiles](#facebook-authentication) for information on social media authentication.
utmCampaign             |          | string    | The specific campaign name to associate the supporter's visit, e.g. "Spring 2016 Appeal".  We recommend that you pass this parameter from a hidden form field.
utmContent              |          | string    | The content variant displayed to the supporter, generally for multivariate testing, e.g. "CTA-top".  We recommend that you pass this parameter from a hidden form field.
utmMedium               |          | string    | The medium over which the supporter's visit was driven, e.g. "email".  We recommend that you pass this parameter from a hidden form field.
utmSource               |          | string    | The source of the supporter's visit, e.g. "newsletter".  We recommend that you pass this parameter from a hidden form field and use utm_source when available.
utmTerm                 |          | string    | The user's search term, generally used for paid search.  We recommend that you pass this parameter from a hidden form field.


##### Additional notes on parameters

* If a `schemaId` is not provided Groundwork.js will make an additional request to the API to find it, which slows down the supporter request. You can use `supporters.getSupporterSchemaId` from the console to retrieve this value and either put it in a hidden form field or inject manually into the payload sent to `supporters.create`.
* When a Supporter record is created the system uses the email template specified by `emailTemplate` to send an automated email to the address specified by `email`.  Omit `emailTemplate` or submit an empty value if you do not wish to send this automated email.

##### Example request

```http
curl -X POST -H "Content-Type: application/json" -H "Authorization: Basic {client-id}" -d '{
    "schemaId": "abf3e913-29f4-4d71-9729-9c3d57b361e2",
    "data": {
        "email": "marina@galileo.edu",
        "givenName": "Marina",
        "familyName": "Gamba",
        "phone": "4155551212",
        "address1": "101 Main St",
        "address2": "Suite 600",
        "addressCity": "SF",
        "addressStateProvince": "CA",
        "addressCounty": "San Francisco",
        "addressPostalCode": "94111",
        "addressCountry": "USA",
        "socialHandle": "@marina",
        "comments": "Harder problems than this have already been solved.",
        "utmSource": "August Member Newsletter",
        "utmMedium": "email",
        "utmCampaign": "Summer 2016 - Clean the Pacific Gyre",
        "utmContent": "multivariate-b",
        "utmTerm": "Pinniped Love",
        "emailTemplate": "welcome",
        "externalId": "987654321",
        "metadata": {"beverage":"coffee"}
    }
}  ' "https://api.thegroundwork.com/collections/supporters"
```

##### Example response

```json
{
  "id": "4c9fb861-c860-4c15-8fc9-cb48d21ef66b",
  "created": "2016-09-26T17:43:02.739334Z",
  "modified": "2016-09-26T17:43:02.739377Z",
  "data": {
    "givenName": "Marina",
    "email": "marina@galileo.edu",
    "campaign": "Summer 2016 - Clean the Pacific Gyre",
    "addressPostalCode": "94111",
    "metadata": {
      "beverage": "coffee"
    },
    "addressCity": "SF",
    "familyName": "Gamba",
    "addressCounty": "San Francisco",
    "addressStateProvince": "CA",
    "externalId": "987654321",
    "address2": "Suite 600",
    "socialHandle": "@marina",
    "addressCountry": "USA",
    "utmSource": "August Member Newsletter",
    "utmMedium": "email",
    "utmCampaign": "Summer 2016 - Clean the Pacific Gyre",
    "utmContent": "multivariate-b",
    "utmTerm": "Pinniped Love",
    "comments": "Harder problems than this have already been solved.",
    "phone": "4155551212",
    "address1": "101 Main St"
  },
  "schemaId": "abf3e913-29f4-4d71-9729-9c3d57b361e2"
}
```
