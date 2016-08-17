# Profiles

Profiles are **user accounts** created within The Groundwork platform. They are used to [authenticate](https://github.com/thegroundwork/groundwork.js/manual/authenticate.md) with the platform and manage [donations](https://github.com/thegroundwork/groundwork.js/manual/donations.md) and [subscriptions](https://github.com/thegroundwork/groundwork.js/manual/subscriptions.md). Every **profile** is assigned a **gwid** (Groundwork ID) which acts as a unique identifier across the platform.

## Create a new profile

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.profiles.create({<profile object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Profile fields**


Parameter               | Required | Type      | Description
------------------------|----------|-----------|------------
gwid                    |          | string    | The `gwid` of the user.
email                   | &#10004; | string    | The user's email address.
password                |          | string    | The user's Profile password. See [password requirements](#password-requirements).
givenName               |          | string    | The given (first) name of the user.
familyName              |          | string    | The family (last) name of the user.
honorificPrefix         |          | string    | An honorific prefix like "Dr", "Ms", etc.
honorificSuffix         |          | string    | An honorific suffix like "Jr.", "Ph.D", etc.
dateOfBirth             |          | string    | The birth date of when the user was born. Formatted as YYYY-MM-DD.
gender                  |          | integer   | An integer indicating the user's gender. See the [gender](#gender-choices) section for values.
genderIdentity          |          | string    | A string representing the user's gender identity, in case they don't identify with `gender` options.
address1                |          | string    | The first line of the user's street address.
address2                |          | string    | The second line of the user's street address.
locality                |          | string    | The city of the user's address.
state                   |          | string    | The 2-letter US state code of the user's address.
zipCode                 |          | string    | The 5-digit zip code of the user's address.
phoneNumber             |          | string    | The user's phone number.
employer                |          | string    | The user's employer.
occupation              |          | string    | The user's occupation.
isActive                |          | boolean   | Designates whether or not the user should be considered active. The default is true. Set `isActive` to false instead of deleting accounts.

#### Password Requirements

Password must:
- be at least 8 characters long
- be less than 100 characters long
- contain an uppercase character
- contain a lowercase character
- contain a numeric character

#### Gender Choices

Gender must be a small integer
- 0 for "Male"
- 1 for "Female"
- 2 for "Other"
- 3 for "Choose not to identify"

**Response**

```json
{
  "profile": {
    "gwid": "61b9fa74-d7d4-493a-8032-c38d901049d0",
    "email": "email@email.com",
    "isActive": true,
    "isConfirmed": false,
    "confirmedAt": "2016-04-22T01:43:13.582178Z",
    "dateJoined": "2016-04-22T01:45:46.527320Z",
    "dateModified": "2016-04-22T01:45:46.527788Z",
    "dateOfBirth": null,
    "givenName": "",
    "familyName": "",
    "honorificPrefix": "",
    "honorificSuffix": "",
    "gender": 0,
    "genderIdentity": "",
    "employer": "Timshel",
    "occupation": "",
    "phoneNumber": "",
    "address1": "",
    "address2": "",
    "locality": "",
    "state": "",
    "zipCode": "12345",
    "socialaccounts": [],
    "authMethods": []
  }
}
```

## Fetch a new profile

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.profiles.fetch(<gwid>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
  "profile": {
    "gwid": "61b9fa74-d7d4-493a-8032-c38d901049d0",
    "email": "email@email.com",
    "isActive": true,
    "isConfirmed": false,
    "confirmedAt": "2016-04-22T01:43:13.582178Z",
    "dateJoined": "2016-04-22T01:45:46.527320Z",
    "dateModified": "2016-04-22T01:45:46.527788Z",
    "dateOfBirth": null,
    "givenName": "",
    "familyName": "",
    "honorificPrefix": "",
    "honorificSuffix": "",
    "gender": 0,
    "genderIdentity": "",
    "employer": "Timshel",
    "occupation": "",
    "phoneNumber": "",
    "address1": "",
    "address2": "",
    "locality": "",
    "state": "",
    "zipCode": "12345",
    "socialaccounts": [],
    "authMethods": []
  }
}
```

## Update an existing profile

You can update one or more fields within a specific profile by `gwid`. The profile object should contain only the fields you wish to update.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.profiles.update(<gwid>, {<profile object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Profile fields**

Parameter               | Required | Type      | Description
------------------------|----------|-----------|------------
gwid                    |          | string    | The [`gwid`](#link-to-gwid-glossary) of the user.
email                   | &#10004; | string    | The user's email address.
password                |          | string    | The user's Profile password. See [password requirements](#password-requirements).
givenName               |          | string    | The given (first) name of the user.
familyName              |          | string    | The family (last) name of the user.
honorificPrefix         |          | string    | An honorific prefix like "Dr", "Ms", etc.
honorificSuffix         |          | string    | An honorific suffix like "Jr.", "Ph.D", etc.
dateOfBirth             |          | string    | The birth date of when the user was born. Formatted as YYYY-MM-DD.
gender                  |          | integer   | An integer indicating the user's gender. See the [gender](#gender-parameter-options) section for values.
genderIdentity          |          | string    | A string representing the user's gender identity, in case they don't identify with `gender` options.
address1                |          | string    | The first line of the user's street address.
address2                |          | string    | The second line of the user's street address.
locality                |          | string    | The city of the user's address.
state                   |          | string    | The 2-letter US state code of the user's address.
zipCode                 |          | string    | The 5-digit zip code of the user's address.
phoneNumber             |          | string    | The user's phone number.
employer                |          | string    | The user's employer.
occupation              |          | string    | The user's occupation.
isActive                |          | boolean   | Designates whether or not the user should be considered active. The default is true. Set `isActive` to false instead of deleting accounts.

**Response**

```json
{
  "profile": {
    "gwid": "61b9fa74-d7d4-493a-8032-c38d901049d0",
    "email": "email@email.com",
    "isActive": true,
    "isConfirmed": false,
    "confirmedAt": "2016-04-22T01:43:13.582178Z",
    "dateJoined": "2016-04-22T01:45:46.527320Z",
    "dateModified": "2016-04-22T01:45:46.527788Z",
    "dateOfBirth": null,
    "givenName": "",
    "familyName": "",
    "honorificPrefix": "",
    "honorificSuffix": "",
    "gender": 0,
    "genderIdentity": "",
    "employer": "Timshel",
    "occupation": "",
    "phoneNumber": "",
    "address1": "",
    "address2": "",
    "locality": "",
    "state": "",
    "zipCode": "12345",
    "socialaccounts": [],
    "authMethods": []
  }
}
```

## Request a password reset

The Groundwork platform uses a standard token-based password reset flow. When a token is requested for a specific email, a token is sent to that email address allowing the recipient to setup a new password for their account.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.profiles.requestResetToken(<email>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
    "passwordReset": true
}
```

## Reset password with token

Once a user has received their token they can reset their password with the following request.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.profiles.resetPassword(<token>, <new password>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
  "profile": {
    "gwid": "61b9fa74-d7d4-493a-8032-c38d901049d0",
    "email": "email@email.com",
    "isActive": true,
    "isConfirmed": false,
    "confirmedAt": "2016-04-22T01:43:13.582178Z",
    "dateJoined": "2016-04-22T01:45:46.527320Z",
    "dateModified": "2016-04-22T01:45:46.527788Z",
    "dateOfBirth": null,
    "givenName": "",
    "familyName": "",
    "honorificPrefix": "",
    "honorificSuffix": "",
    "gender": 0,
    "genderIdentity": "",
    "employer": "Timshel",
    "occupation": "",
    "phoneNumber": "",
    "address1": "",
    "address2": "",
    "locality": "",
    "state": "",
    "zipCode": "12345",
    "socialaccounts": [],
    "authMethods": []
  }
}
```
