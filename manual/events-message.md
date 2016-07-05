# Event Message

Send a Message to a subset of people associated with an Event id. A Message represents a record of email communication.

**Jump to:**
- [Event Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events.md)
- [Category Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-category.md)
- [Invitation Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-invitation.md)
- [Ticket Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-ticket.md)


## List all Messages on an Event

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.listMessages(<event id>, {<options object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Option fields**

Parameter             | Required | Description
----------------------|----------|---------
page                  |          | Integer indicating which page of results should be returned
perPage               |          | Integer indicating how many results should be returned per request


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
      "email": "",
      "eventId": "c84c8a10-fc0d-4bbc-beb5-86d921974998",
      "gwid": "ba5defe9-4a38-4782-abf6-70e81823a53f",
      "id": "82f29c96-bd9d-4e03-9c7d-e58c6e8bc50f",
      "initiativeId": "my_organization.my_initiative",
      "message": "I'm excited to see you at my event!",
      "subject": "Can't wait to see you!",
      "template": "my_template",
      "title": "1 More Day!"
    },
    {
      "createdUtc": "2015-06-20T16:11:44Z",
      "email": "example@example.com",
      "eventId": "c84c8a10-fc0d-4bbc-beb5-86d921974998",
      "gwid": "",
      "id": "b7269c74-773e-4070-a179-038158dd83ec",
      "initiativeId": "my_organization.my_initiative",
      "message": "I'm excited to see you at my event!",
      "subject": "Can't wait to see you!",
      "template": "my_template",
      "title": "1 More Day!"
    }
  ]
}
```




## Create Message

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.createMessage(<event id>, {<message object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Message fields**

Parameter               | Required | Description
------------------------|----------|---------
message                 |          | String message body that will be included in the email
recipientClasses        | ✓        | Array of String classes of who should will receive this message. The array must contain one or more of: `attendees_redeemed`, `attendees_not_redeemed`, `invitees_pending`, `invitees_declined`
subject                 |          | String subject that will be included in the email
template                | ✓        | String email template name to use when sending the message email. If the specified template is not found, `generic_template` will be used
title                   |          | String title that will be included in the email

**Request**

```json
{
  "message": "I'm excited to see you at my event!",
  "recipientClasses": [
    "attendees_redeemed",
    "attendees_not_redeemed",
    "invitees_pending",
    "invitees_declined"
  ],
  "subject": "Can't wait to see you!",
  "template": "my_template",
  "title": "1 More Day!"
}
```

**Response**

```json
[
  {
    "createdUtc": "2015-06-20T16:11:44Z",
    "email": "",
    "eventId": "c84c8a10-fc0d-4bbc-beb5-86d921974998",
    "gwid": "ba5defe9-4a38-4782-abf6-70e81823a53f",
    "id": "82f29c96-bd9d-4e03-9c7d-e58c6e8bc50f",
    "initiativeId": "my_organization.my_initiative",
    "message": "I'm excited to see you at my event!",
    "subject": "Can't wait to see you!",
    "template": "my_template",
    "title": "1 More Day!"
  },
  {
    "createdUtc": "2015-06-20T16:11:44Z",
    "email": "example@example.com",
    "eventId": "c84c8a10-fc0d-4bbc-beb5-86d921974998",
    "gwid": "",
    "id": "b7269c74-773e-4070-a179-038158dd83ec",
    "initiativeId": "my_organization.my_initiative",
    "message": "I'm excited to see you at my event!",
    "subject": "Can't wait to see you!",
    "template": "my_template",
    "title": "1 More Day!"
  }
]
```




## Delete a specific Message, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.delMessage(<event id>, <message id>)
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




## Fetch a specific Message, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.fetchMessage(<event id>, <message id>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
  "createdUtc": "2015-06-20T16:11:44Z",
  "email": "",
  "eventId": "c84c8a10-fc0d-4bbc-beb5-86d921974998",
  "gwid": "ba5defe9-4a38-4782-abf6-70e81823a53f",
  "id": "82f29c96-bd9d-4e03-9c7d-e58c6e8bc50f",
  "initiativeId": "my_organization.my_initiative",
  "message": "I'm excited to see you at my event!",
  "subject": "Can't wait to see you!",
  "template": "my_template",
  "title": "1 More Day!"
}
```
