# Event Ticket

A Ticket object represents participation in a Category.

**Jump to:**
- [Event Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events.md)
- [Category Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-category.md)
- [Invitation Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-invitation.md)
- [Message Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-message.md)


## List all Tickets on a Category

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.listTickets(<event id>, <category id>, {<options object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Option fields**

Parameter             | Required | Description
----------------------|----------|---------
isRedeemed            |          | Boolean representing whether the ticket has been redeemed. Only tickets with the given redemption status will be returned
page                  |          | Integer indicating which page of results should be returned
perPage               |          | Integer indicating how many results should be returned per request
purchaserGwid         |          | GWID String of the user who purchased the tickets. Only tickets with the given purchaser will be returned


**Response**

```json
{
  "meta": {
    "count": 2,
    "params": {
      "page": 1,
      "perPage": 10
    },
    "total": 2,
    "totalPages": 1
  },
  "results": [
    {
      "attendeeGwid": "752bfe79-fc8b-48e9-8f7f-67cdd1c7a67c",
      "attendeeProfile": {
        "email": "johndoe@thegroundwork.com",
        "familyName": "Doe",
        "givenName": "Jane"
      },
      "categoryId": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
      "createdUtc": "2015-06-20T16:11:44Z",
      "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
      "id": "84e1e2c4-8ac9-4f38-9bd8-b1abfb8dc3d4",
      "initiativeId": "my_organization.my_initiative",
      "invitationId": "",
      "purchaserGwid": "752bfe79-fc8b-48e9-8f7f-67cdd1c7a67c",
      "purchaserProfile": {
        "email": "matt@thegroundwork.com",
        "familyName": "Hodges",
        "givenName": "Matt"
      },
      "redeemedUtc": "2016-08-22T12:00:00Z"
    },
    {
      "attendeeGwid": "",
      "attendeeProfile": null,
      "categoryId": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
      "createdUtc": "2015-06-20T16:11:44Z",
      "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
      "id": "36a91d28-dfaf-42c3-91ea-89806254ae35",
      "initiativeId": "my_organization.my_initiative",
      "invitationId": "",
      "purchaserGwid": "f3fed15c-7007-4f39-82d8-930db0c3c0ea",
      "purchaserProfile": {
        "email": "johndoe@thegroundwork.com",
        "familyName": "Doe",
        "givenName": "John"
      },
      "redeemedUtc": ""
    }
  ]
}
```







## Create a Ticket

**Notes**
When creating a ticket, you may choose one of four approaches to specify the attendee and/or purchaser:
 1. **Set `attendeeGwid` and `purchaserGwid` to the same value.** Choose this approach when the purchaser's `Gwid` is known, for example because the purchaser has authenticated to The Groundwork, and the purchaser is obtaining a ticket for themself.
 2. **Set `purchaserGwid` and leave `attendeeGwid` empty.**  Choose this approach when when the purchaser's `Gwid` is known and the purchaser is obtaining a ticket for a guest with no known `Gwid`.  Note that the `attendeeGwid` may be set later, for example when the guest registers at the door when attending an event.
 3. **Set `attendeeGwid` and `purchaserGwid` to  different values.**  Choose this approach when `attendeeGwid` and `purchaserGwid` are both known, but are different.  This is most likely a rare case.
 4. **Set `email` only.**  Choose this approach when the purchaser's `Gwid` is not known.  The system will attempt to match the `email` sent to the `email` on existing profiles, then respond acccordingly:
    - If the `email` sent matches the `email` on an existing shadow profile (a shadow profile is a profile with no `password` set), the system will return the shadow profile's `Gwid` as both `attendeeGwid` and `purchaserGwid`.
    - If the `email` sent matches the `email` on an existing profile and the user has not authenticated, the system will return an HTTP `403`
    - If the `email` sent does not match the `email` on any profiles, the system will create a new shadow profile and return its `Gwid` as both `attendeeGwid` and `purchaserGwid`

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.createTicket(<event id>, <category id>, {<ticket object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Ticket fields**

Parameter               | Required | Description
------------------------|----------|---------
attendeeGwid            |          | String UUID of the person who will be attending the Event with this ticket. It may or may not be the same gwid as the purchaserGwid
email                   |          | String email address of the person who will be purchasing this ticket. This must be passed if the purchaser's gwid is not known. It must not be passed otherwise
invitationId            |          | String UUID of the Invitation ID to associate with this ticket. If provided, the specified Invitation will update its status to _accepted_
purchaserGwid           |          | String UUID of the person who will be purchasing this ticket. It may or may not be the same gwid as the attendeeGwid. This is not necessary if the purchasing user is authenticated
redeemedUtc             |          | UTC ISO-8601 formatted String of the datetime at which the ticket was redeemed, formatted in UTC (any non-UTC datetimes will be converted to UTC)

**Request**

```json
{
  "attendeeGwid": "9465a252-3319-4471-a908-8e1333692bff",
  "invitationId": "dd380647-4630-4146-a5c9-7b533dbedf5e"
}
```

**Response**

```json
{
  "attendeeGwid": "9465a252-3319-4471-a908-8e1333692bff",
  "attendeeProfile": {
    "email": "janedoe@thegroundwork.com",
    "familyName": "Doe",
    "givenName": "Jane"
  },
  "categoryId": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
  "createdUtc": "2015-06-20T16:11:44Z",
  "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "id": "36a91d28-dfaf-42c3-91ea-89806254ae35",
  "initiativeId": "my_organization.my_initiative",
  "invitationId": "dd380647-4630-4146-a5c9-7b533dbedf5e",
  "purchaserGwid": "f3fed15c-7007-4f39-82d8-930db0c3c0ea",
  "purchaserProfile": {
    "email": "johndoe@thegroundwork.com",
    "familyName": "Doe",
    "givenName": "John"
  },
  "redeemedUtc": ""
}

```




## Delete a specific Ticket, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.delTicket(<event id>, <category id>, <ticket id>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**
```json
{
  "status": 204,
  "statusText": "No Content"
}
```








## Fetch a specific Ticket, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.fetchTicket(<event id>, <category id>, <ticket id>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
  "attendeeGwid": "9465a252-3319-4471-a908-8e1333692bff",
  "attendeeProfile": {
    "email": "janedoe@thegroundwork.com",
    "familyName": "Doe",
    "givenName": "Jane"
  },
  "categoryId": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
  "createdUtc": "2015-06-20T16:11:44Z",
  "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "id": "36a91d28-dfaf-42c3-91ea-89806254ae35",
  "initiativeId": "my_organization.my_initiative",
  "invitationId": "",
  "purchaserGwid": "f3fed15c-7007-4f39-82d8-930db0c3c0ea",
  "purchaserProfile": {
    "email": "johndoe@thegroundwork.com",
    "familyName": "Doe",
    "givenName": "John"
  },
  "redeemedUtc": ""
}
```








## Update an existing Ticket, by id

**Note:** only the fields that are passed will be updated.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.updateTicket(<event id>, <category id>, <ticket id>, {<ticket object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Ticket fields**

Parameter               | Required | Description
------------------------|----------|---------
attendeeGwid            |          | String UUID of the person who will be attending the Event with this ticket. It may or may not be the same gwid as the purchaserGwid
invitationId            |          | String UUID of the Invitation ID to associate with this ticket. If provided, the specified Invitation will update its status to _accepted_
redeemedUtc             |          | UTC ISO-8601 formatted String of the datetime at which the ticket was redeemed, formatted in UTC (any non-UTC datetimes will be converted to UTC)


**Request**
```json
{
  "redeemdUtc": "2016-08-22T12:00:00Z"
}
```

**Response**
```json
{
  "attendeeGwid": "9465a252-3319-4471-a908-8e1333692bff",
  "attendeeProfile": {
    "email": "janedoe@thegroundwork.com",
    "familyName": "Doe",
    "givenName": "Jane"
  },
  "categoryId": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
  "createdUtc": "2015-06-20T16:11:44Z",
  "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "id": "36a91d28-dfaf-42c3-91ea-89806254ae35",
  "initiativeId": "my_organization.my_initiative",
  "invitationId": "",
  "purchaserGwid": "f3fed15c-7007-4f39-82d8-930db0c3c0ea",
  "purchaserProfile": {
    "email": "johndoe@thegroundwork.com",
    "familyName": "Doe",
    "givenName": "John"
  },
  "redeemedUtc": "2016-08-22T12:00:00Z"
}
```








## Replace an existing Ticket, by id

**Note:** All fields are updated. If an optional field is not provided, it will be overwritten as blank unless otherwise noted.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.replaceTicket(<event id>, <category id>, <ticket id>, {<ticket object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Ticket fields**

Parameter               | Required | Description
------------------------|----------|---------
attendeeGwid            |          | String UUID of the person who will be attending the Event with this ticket. It may or may not be the same gwid as the purchaserGwid
invitationId            |          | String UUID of the Invitation ID to associate with this ticket. If provided, the specified Invitation will update its status to _accepted_
redeemedUtc             |          | UTC ISO-8601 formatted String of the datetime at which the ticket was redeemed, formatted in UTC (any non-UTC datetimes will be converted to UTC)

**Request**
```json
{
  "attendeeGwid": "9465a252-3319-4471-a908-8e1333692bff",
  "redeemedUtc": "2016-08-22T13:00:00Z"
}
```

**Response**
```json
{
  "attendeeGwid": "9465a252-3319-4471-a908-8e1333692bff",
  "attendeeProfile": {
    "email": "janedoe@thegroundwork.com",
    "familyName": "Doe",
    "givenName": "Jane"
  },
  "categoryId": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
  "createdUtc": "2015-06-20T16:11:44Z",
  "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "id": "36a91d28-dfaf-42c3-91ea-89806254ae35",
  "initiativeId": "my_organization.my_initiative",
  "invitationId": "",
  "purchaserGwid": "f3fed15c-7007-4f39-82d8-930db0c3c0ea",
  "purchaserProfile": {
    "email": "johndoe@thegroundwork.com",
    "familyName": "Doe",
    "givenName": "John"
  },
  "redeemedUtc": "2016-08-22T13:00:00Z"
}
```
