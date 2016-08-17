# Event Invitation

An invitation is an email correspondence used to inform people of an event.

**Jump to:**
- [Event Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events.md)
- [Category Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-category.md)
- [Message Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-message.md)
- [Ticket Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-ticket.md)

## List all invitations on an Event

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.listInvitations(<event id>, {<options object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Option fields**

Parameter             | Required | Description
----------------------|----------|---------
page                  |          | Integer indicating which page of results should be returned
perPage               |          | Integer indicating how many results should be returned per request
status                |          | String of the status by which you wish to filter. It may be accepted, declined, or pending


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
        "createdUtc": "2015-06-20T16:11:44Z",
        "email": "test@example.com",
        "eventId": "3cd5fc23-b4e7-4469-aefe-e54493c7e123",
        "familyName": "Doe",
        "givenName": "John",
        "id": "dd380647-4630-4146-a5c9-7b533dbedf5e",
        "initiativeId": "my_organization.my_initiative",
        "message": "I hope you come to my event!",
        "status": "pending"
    },
    {
        "createdUtc": "2015-06-20T16:11:44Z",
        "email": "test2@example.com",
        "eventId": "3cd5fc23-b4e7-4469-aefe-e54493c7e123",
        "familyName": "Smith",
        "givenName": "Jane",
        "id": "abc80647-4630-4146-a5c9-7b533dbedf5e",
        "initiativeId": "my_organization.my_initiative",
        "message": "",
        "status": "declined"
    }
  ]
}
```








## Create a Invitation

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.createInvitation(<event id>, {<invitation object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Invitation fields**

Parameter               | Required | Description
------------------------|----------|------------
email                   |  ✓       | String of the email address of the Invitation recipient
familyName              |          | String of the family name (last name) of the Invitation recipient
givenName               |          | String of the given name (first name) of the Invitation recipient
subject                 |          | String of the subject that was attached to the Invitation

**Request**

```json
[
  {
    "email": "test@example.com",
    "familyName": "Doe",
    "givenName": "John"
  }
]
```

**Response**

```json
[
    {
        "createdUtc": "2015-06-20T16:11:44Z",
        "email": "test@example.com",
        "eventId": "3cd5fc23-b4e7-4469-aefe-e54493c7e123",
        "familyName": "Doe",
        "givenName": "John",
        "id": "dd380647-4630-4146-a5c9-7b533dbedf5e",
        "initiativeId": "my_organization.my_initiative",
        "message": "I hope you come to my event!",
        "status": "pending",
        "subject": "You're Invited!"
    }
]
```








## Delete a specific Invitation, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.delInvitation(<event id>, <invitation id>)
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








## Fetch a specific Invitation, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.fetchInvitation(<event id>, <invitation id>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
  "createdUtc": "2015-06-20T16:11:44Z",
  "email": "test@example.com",
  "eventId": "3cd5fc23-b4e7-4469-aefe-e54493c7e123",
  "familyName": "Doe",
  "givenName": "John",
  "id": "dd380647-4630-4146-a5c9-7b533dbedf5e",
  "initiativeId": "my_organization.my_initiative",
  "message": "I hope you come to my event!",
  "status": "pending",
  "subject": "You're Invited!"
}
```








## Update the status of an Invitation, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.updateInvitationStatus(<event id>, <invitation id>, <status>)
    .then(successHandler)
    .catch(errorHandler));
```

**Invitation fields**

Parameter               | Required | Description
------------------------|----------|---------
status                  |  ✓       | String of the current RSVP status of the Invitation. It may be declined, or pending. You cannot accept an Invitation via this endpoint and method. To accept an invitation, you must create a ticket via `gw.events.createTicket()`. See [Ticket Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-ticket.md) for more information.  Note also that when `status` is updated from _accepted_ to _declined_, the system deletes any tickets associated with that invitation `id`

**Request**
```json
{
  "status": "declined"
}
```

**Response**
```json
{
  "createdUtc": "2015-06-20T16:11:44Z",
  "email": "test@example.com",
  "eventId": "3cd5fc23-b4e7-4469-aefe-e54493c7e123",
  "familyName": "Doe",
  "givenName": "John",
  "id": "dd380647-4630-4146-a5c9-7b533dbedf5e",
  "initiativeId": "my_organization.my_initiative",
  "message": "I hope you come to my event!",
  "status": "declined",
  "subject": "You're Invited!"
}
```
