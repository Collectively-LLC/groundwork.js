# Event Category

A Category object is a sub-object of an Event. It describes a block of time within an Event, such as a shift.

**Jump to:**
- [Event Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events.md)
- [Invitation Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-invitation.md)
- [Message Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-message.md)
- [Ticket Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-ticket.md)

## List all Categories on an Event

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.listCategories(<event id>, {<options object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Option fields**

Parameter             | Required | Description
----------------------|----------|---------
page                  |          | Integer indicating which page of results should be returned
perPage               |          | Integer indicating how many results should be returned per request
startsBefore          |          | ISO-8601 formatted String given in local time without a timezone designator. Only events occurring before the given timestamp will be returned
startsAfter           |          | ISO-8601 formatted String given in local time without a timezone designator. Only events occurring after the given timestamp will be returned


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
      "description": "Reserved for our most active supporters",
      "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
      "id": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
      "initiativeId": "my_organization.my_initiative",
      "quantityRemaining": 5,
      "quantityTotal": 10,
      "timeEndUtc": "2016-09-26T20:00:00Z",
      "timeStartUtc": "2016-09-26T18:00:00Z",
      "timeZoneId": "America/New_York",
      "title": "VIP"
    },
    {
      "createdUtc": "2015-06-20T16:11:44Z",
      "description": "Standard ticket",
      "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
      "id": "c8cb77ec-9f4d-4214-bd96-b38585b44084",
      "initiativeId": "my_organization.my_initiative",
      "quantityRemaining": 15,
      "quantityTotal": 20,
      "timeEndUtc": "2016-09-26T20:00:00Z",
      "timeStartUtc": "2016-09-26T19:00:00Z",
      "timeZoneId": "America/New_York",
      "title": "Admit One"
    }
  ]
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.








## Create a Category

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.createCategory(<event id>, {<category object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Category fields**

Parameter               | Required | Description
------------------------|----------|---------
description             |          | String of the Category description
quantityTotal           |  ✓       | Integer of the total Tickets for the Category
timeEnd                 |  ✓       | ISO-8601 formatted String of the end time of the Category, given in local time, without a timezone designator. The value passed must not be later than the end time of the Event
timeStart               |  ✓       | ISO-8601 formatted String of the start time of the Category, given in local time, without a timezone designator. The value passed must not be earlier than the end time of the Event
title                   |          | String with a maximum length of 256 characters

**Request**

```json
{
  "description": "Reserved for our most active supporters",
  "quantityTotal": 10,
  "timeEnd": "2016-09-26T15:00:00",
  "timeStart": "2016-09-26T13:00:00",
  "title": "VIP"
}
```

**Response**

```json
{
  "createdUtc": "2015-06-20T16:11:44Z",
  "description": "Reserved for our most active supporters",
  "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "id": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
  "initiativeId": "my_organization.my_initiative",
  "quantityRemaining": 10,
  "quantityTotal": 10,
  "timeEndUtc": "2016-09-26T20:00:00Z",
  "timeStartUtc": "2016-09-26T18:00:00Z",
  "timeZoneId": "America/New_York",
  "title": "VIP"
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.









## Delete a specific Category, by id

**NOTE:** If there are Ticket objects associated with that Category, the request will fail.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.delCategory(<event id>, <category id>)
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








## Fetch a specific Category, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.fetchCategory(<event id>, <category id>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
  "createdUtc": "2015-06-20T16:11:44Z",
  "description": "Reserved for our most active supporters",
  "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "id": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
  "initiativeId": "my_organization.my_initiative",
  "quantityRemaining": 5,
  "quantityTotal": 10,
  "timeEndUtc": "2016-09-26T20:00:00Z",
  "timeStartUtc": "2016-09-26T18:00:00Z",
  "timeZoneId": "America/New_York",
  "title": "VIP"
}
```








## Update an existing Category, by id

**Note:** only the fields that are passed will be updated.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.updateCategory(<event id>, <category id>, {<category object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Category fields**

Parameter               | Required | Description
------------------------|----------|---------
description             |          | String of the Category description
quantityTotal           |          | Integer of the total Tickets for the Category
timeEnd                 |          | ISO-8601 formatted String of the end time of the Category, given in local time, without a timezone designator. The value passed must not be later than the end time of the Event
timeStart               |          | ISO-8601 formatted String of the start time of the Category, given in local time, without a timezone designator. The value passed must not be earlier than the end time of the Event
title                   |          | String with a maximum length of 256 characters


**Request**
```json
{
  "description": "Allocated for our most active supporters"
}
```

**Response**
```json
{
  "createdUtc": "2015-06-20T16:11:44Z",
  "description": "Allocated for our most active supporters",
  "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "id": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
  "initiativeId": "my_organization.my_initiative",
  "quantityRemaining": 5,
  "quantityTotal": 10,
  "timeEndUtc": "2016-09-26T20:00:00Z",
  "timeStartUtc": "2016-09-26T18:00:00Z",
  "timeZoneId": "America/New_York",
  "title": "VIP"
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.








## Replace an existing Category, by id

**Note:** All fields are updated. If an optional field is not provided, it will be overwritten as blank unless otherwise noted.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.replaceCategory(<event id>, <category id>, {<category object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Category fields**

Parameter               | Required | Description
------------------------|----------|---------
description             |          | String of the Category description
quantityTotal           |  ✓       | Integer of the total Tickets for the Category
timeEnd                 |  ✓       | ISO-8601 formatted String of the end time of the Category, given in local time, without a timezone designator. The value passed must not be later than the end time of the Event
timeStart               |  ✓       | ISO-8601 formatted String of the start time of the Category, given in local time, without a timezone designator. The value passed must not be earlier than the end time of the Event
title                   |          | String with a maximum length of 256 characters


**Request**
```json
{
  "description": "Reserved for our most active supporters",
  "quantityTotal": 10,
  "timeEnd": "2016-09-26T15:00:00",
  "timeStart": "2016-09-26T13:00:00",
  "title": "MVP"
}
```

**Response**
```json
{
  "createdUtc": "2015-06-20T16:11:44Z",
  "description": "Reserved for our most active supporters",
  "eventId": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "id": "d1365abf-5f70-4cb4-949e-a9f2222dcf84",
  "initiativeId": "my_organization.my_initiative",
  "quantityRemaining": 10,
  "quantityTotal": 10,
  "timeEndUtc": "2016-09-26T20:00:00Z",
  "timeStartUtc": "2016-09-26T18:00:00Z",
  "timeZoneId": "America/New_York",
  "title": "MVP"
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.
