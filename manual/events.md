**Jump to:**
- [Category Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-category.md)
- [Invitation Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-invitation.md)
- [Message Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-message.md)
- [Ticket Docs](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events-ticket.md)

# Overview

A Groundwork Event is a representation of a real-word event occurring at a defined place during a defined time window, and is attended by those who have obtained tickets to that Event.  The Groundwork allows organization administrators, or authenticated users, to create and manage events, invitations, ticketing, ticket redemption, and event-related messaging.

## Invitation and ticketing

An authenticated user, or an administrator, can create an Event, and may optionally send Invitation emails for that Event, via The Groundwork. Invitees may then accept or decline the Invitation, resulting in the creation of an associated Ticket if the Invitation is accepted. In addition to accepted Invitations, Tickets may be created directly through the API (e.g. a web page with Event details and public ticket purchasing). Each Ticket is associated with a Category, which describes the tier of the Ticket, typically for a certain time range or price.

An individual who obtains a Ticket is considered its purchaser. The person for whom a Ticket is obtained is considered the attendee, and may or may not be the same person as its purchaser. Tickets are only created once obtained, and thus always have a Category and attendee associated with them. The Groundwork Events currently supports a free Ticket model.

## Ticket redemption

On the day of the Event, ticketholders "check in" and their Ticket is considered redeemed.  Walk-up attendees can also obtain Tickets and redeem them at the Event.

## Messaging

Two types of user-generated email messages are supported: Invitations and generic Messages. Invitations are sent to an arbitrary set of email addresses (invitees) and a Ticket may reference an Invitation (when an invitee accepts an Invitation). Generic Messages may be sent to defined subsets of invitees or ticketholders and serve as informational messages only. Each message references an email template stored in an organization's email template repository.

The system also automatically sends a confirmation email to the purchaser for each ticket purchased.

## Permissions

Events can be created by an organization's administrators, or authenticated users. Event details can be viewed by anyone, without user authentication, but they may only be edited and deleted by the user that created them, or by an administrator.

It is not necessary for invitees or attendees to authenticate to The Groundwork in order to receive Invitations or obtain Tickets, though the recommended flow is to authenticate users whenever possible.


# Events

Event objects represent the Event itself, including location information and details about the Event. Each Event must have one host and belong to one Initiative.

## List all Events

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.list({<options object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Option fields**

Parameter     | Required | Type          | Description
--------------|----------|---------------|------------
hostGwid      |          | array/string  | Return Events hosted by a user with a matching `gwid`. You may also pass multiple hostGwid's in an array to include multiple hosts in your request
isDeleted     |          | string        | Return Events that have been deleted.
latitude      |          | float         | A latitudinal coordinate. Required for geographic queries.
longitude     |          | float         | A longitudinal coordinate. Required for geographic queries.
page          |          | integer       | A metadata parameter for specifying a page of results to return.
perPage       |          | integer       | A metadata parameter for specifying number of results per page.
radius        |          | float         | Return Events within radius, in kilometers, centered around `latitude` and `longitude`. Required for geographic queries.
search        |          | string        | Return Events by title.
startsBefore  |          | string        | Return Events before this time. Formatted in [ISO-8601](https://www.w3.org/TR/NOTE-datetime), in local time without timezone designator.
startsAfter   |          | string        | Return Events after this time. Formatted in [ISO-8601](https://www.w3.org/TR/NOTE-datetime), in local time without timezone designator.


**NOTE**: A query string with geographic params must include `latitude`, `longitude`, and `radius`.


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
      "address1": "641 Walnut St.",
      "address2": "",
      "addressCity": "Cincinnati",
      "addressCountry": "USA",
      "addressCounty": "",
      "addressDistrict": "",
      "addressLatitude": 39.103652,
      "addressLongitude": -84.512228,
      "addressPostalCode": "45202",
      "addressStateOrProvince": "Ohio",
      "createdUtc": "2015-06-20T16:11:44Z",
      "description": "Come out to our winter fundraiser!",
      "hostGwid": "9ba6e2cb-c3b2-4aca-8953-9ec58115badb",
      "id": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
      "initiativeId": "my_organization.my_initiative",
      "locationName": "The Righteous Room",
      "timeEndUtc": "2016-09-26T20:00:00Z",
      "timeStartUtc": "2016-09-26T17:00:00Z",
      "timeZoneId": "America/New_York",
      "title": "Winter Fundraiser 2015"
    },
    {
      "address1": "500 Main St.",
      "address2": "",
      "addressCity": "Cincinnati",
      "addressCountry": "USA",
      "addressCounty": "",
      "addressDistrict": "",
      "addressLatitude": 39.23652,
      "addressLongitude": -84.012228,
      "addressPostalCode": "45202",
      "addressStateOrProvince": "Ohio",
      "createdUtc": "2015-06-20T16:11:44Z",
      "description": "Come have coffee with some of the people that help with our programs!",
      "hostGwid": "9ba6e2cb-c3b2-4aca-8953-9ec58115badb",
      "id": "480c307a-41bf-429c-a5d6-95aa4034d862",
      "initiativeId": "my_organization.my_initiative",
      "locationName": "",
      "timeEndUtc": "2016-09-29T14:00:00Z",
      "timeStartUtc": "2016-09-29T12:00:00Z",
      "timeZoneId": "America/New_York",
      "title": "Coffee with Volunteers"
    }
  ]
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.


## Create an Event

The provided address will be geocoded to discover timezone information. If the geocode fails, the request will fail and the Event will not be created.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.create({<event object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Event fields**

Parameter               | Required | Type      | Max Length |Description
------------------------|----------|-----------|------------|------------
address1                | &#10004; | string    | 128        | The first address line of the Event location.
address2                |          | string    | 128        | The second address line of the Event location.
addressCity             | &#10004; | string    | 128        | The city of the Event location.
addressCountry          | &#10004; | string    | 3          | The ISO-3166-1 Alpha 3 formatted country of the Event.
addressCounty           |          | string    | 128        | The county of the Event location.
addressDistrict         |          | string    | 128        | The district of the Event location.
addressPostalCode       | &#10004; | string    | 32         | The postal code of the Event location.
addressStateOrProvince  |          | string    | 128        | The state or province of the Event location.
description             | &#10004; | string    |            | An arbitrary string describing the Event.
hostGwid                | &#10004; | string    |            | The `gwid` of the user hosting the Event. This field is required if the request comes from an admin (i.e. uses a client credential grant). Otherwise, it is the `gwid` of the user creating the Event.
locationName            |          | string    | 256        | The name of the location.
timeEnd                 | &#10004; | string    |            | The end time of the Event, in the timezone of the Event location. Formatted in ISO-8601, without a timezone designator.
timeStart               | &#10004; | string    |            | The start time of the Event, in the timezone of the Event location. Formatted in ISO-8601, without a timezone designator.
title                   | &#10004; | string    | 256        | The title of the Event.

**NOTE**: The provided address will be geocoded. If the geocode fails, the request will `400` with the response `No geocoding results`, and the Event will not be created. Addresses are not normalized when geocoding, and Events will assign latitude and longitude based on the best-guess of the intended address.
This means that, without validating the address on the front-end, you may see some unexpected results. For example, if you provide an `addressStateOrProvince` in Illinois but an `addressPostalCode` in Ohio, the calculated latitude and longitude could be in either of those states, depending on the values provided in other address fields. Events will not modify the provided address values based on the calculated geocode coordinates, so it is possible to have a best-guess geocoded location that does not match one or more of the address fields.
For this reason, and for an optimal user experience, it is highly recommended that you implement front-end data validation for address selection. Consider using [Google Maps API](https://developers.google.com/maps/documentation/javascript/) for place lookup, and auto-suggesting places as a means of validating all address parameters.


**Request**

```json
{
  "address1": "641 Walnut St.",
  "addressCity": "Cincinnati",
  "addressCountry": "USA",
  "addressPostalCode": "45202",
  "addressStateOrProvince": "Ohio",
  "description": "Come out to our winter fundraiser!",
  "locationName": "The Righteous Room",
  "timeEnd": "2016-09-26T15:00:00",
  "timeStart": "2016-09-26T12:00:00",
  "title": "Winter Fundraiser 2015"
}
```

**Response**


```json
{
  "address1": "641 Walnut St.",
  "address2": "",
  "addressCity": "Cincinnati",
  "addressCountry": "USA",
  "addressCounty": "",
  "addressDistrict": "",
  "addressLatitude": 39.103652,
  "addressLongitude": -84.512228,
  "addressPostalCode": "45202",
  "addressStateOrProvince": "Ohio",
  "createdUtc": "2015-06-20T16:11:44Z",
  "description": "Come watch the Democratic and Republican candidates debate!",
  "hostGwid": "03d6b6c1-bf15-4401-a850-a0e6dd2be6de",
  "id": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "initiativeId": "my_organization.my_initiative",
  "locationName": "The Righteous Room",
  "timeEndUtc": "2016-09-26T20:00:00Z",
  "timeStartUtc": "2016-09-26T17:00:00Z",
  "timeZoneId": "America/New_York",
  "title": "Debate Watch Party at The Righteous Room"
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.



## Delete a specific Event, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.del(<event id>)
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







## Fetch a specific Event, by id

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.fetch(<event id>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
  "address1": "641 Walnut St.",
  "address2": "",
  "addressCity": "Cincinnati",
  "addressCountry": "USA",
  "addressCounty": "",
  "addressDistrict": "",
  "addressLatitude": 39.103652,
  "addressLongitude": -84.512228,
  "addressPostalCode": "45202",
  "addressStateOrProvince": "Ohio",
  "createdUtc": "2015-06-20T16:11:44Z",
  "description": "Come watch the Democratic and Republican nominees debate!",
  "id": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "initiativeId": "my_organization.my_initiative",
  "hostGwid": "03d6b6c1-bf15-4401-a850-a0e6dd2be6de",
  "locationName": "The Righteous Room",
  "timeEndUtc": "2016-09-26T20:00:00Z",
  "timeStartUtc": "2016-09-26T17:00:00Z",
  "timeZoneId": "America/New_York",
  "title": "Debate Watch Party at The Righteous Room"
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.




## Update an existing Event, by id

**Note:** only the fields that are passed will be updated.

If the address field is modified in full or in part, it will be re-geocoded to update timezone information. If the geocode fails, the request will fail and the Event will not be modified.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.update(<event id>, {<event object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Event fields**


Parameter               | Required | Type      | Max Length | Description
------------------------|----------|-----------|------------|------------
address1                |          | string    | 128        | The first address line of the Event location.
address2                |          | string    | 128        | The second address line of the Event location.
addressCity             |          | string    | 128        | The city of the Event location.
addressCountry          |          | string    | 3          | The ISO-3166-1 Alpha 3 formatted country of the Event.
addressCounty           |          | string    | 128        | The county of the Event location.
addressDistrict         |          | string    | 128        | The district of the Event location.
addressPostalCode       |          | string    | 32         | The postal code of the Event location.
addressStateOrProvince  |          | string    | 128        | The state or province of the Event location.
description             |          | string    |            | An arbitrary string describing the Event.
hostGwid                |          | string    |            | The `gwid` of the user hosting the Event. This field is required if the request comes from an admin (i.e. uses a client credential grant). Otherwise, it is the `gwid` of the user creating the Event.
locationName            |          | string    | 256        | The name of the location.
timeEnd                 |          | string    |            | The end time of the Event, in the timezone of the Event location. Formatted in ISO-8601, without a timezone designator.
timeStart               |          | string    |            | The start time of the Event, in the timezone of the Event location. Formatted in ISO-8601, without a timezone designator.
title                   |          | string    | 256        | The title of the Event.

**Request**
```json
{
  "description": "Come out to our winter fundraiser!"
}
```

**Response**
```json
{
  "address1": "642 Walnut St.",
  "address2": "",
  "addressCity": "Cincinnati",
  "addressCountry": "USA",
  "addressCounty": "",
  "addressDistrict": "",
  "addressLatitude": 39.103652,
  "addressLongitude": -84.512228,
  "addressPostalCode": "45202",
  "addressStateOrProvince": "Ohio",
  "createdUtc": "2015-06-20T16:11:44Z",
  "description": "Come watch the Democratic and Republican candidates debate!",
  "hostGwid": "03d6b6c1-bf15-4401-a850-a0e6dd2be6de",
  "id": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "initiativeId": "my_organization.my_initiative",
  "locationName": "The Righteous Room",
  "timeEndUtc": "2016-09-26T20:00:00Z",
  "timeStartUtc": "2016-09-26T17:00:00Z",
  "timeZoneId": "America/New_York",
  "title": "Debate Watch Party at The Righteous Room"
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.





## Replace an existing Event, by id

**Note:** All fields are updated. If an optional field is not provided, it will be overwritten as blank unless otherwise noted.

If the address field is modified in full or in part, it will be re-geocoded to update timezone information. If the geocode fails, the request will fail and the Event will not be modified.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.replace(<event id>, {<event object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Event fields**
Parameter               | Required | Type      | Max Length | Description
------------------------|----------|-----------|------------|------------
address1                | &#10004; | string    | 128        | The first address line of the Event location.
address2                |          | string    | 128        | The second address line of the Event location.
addressCity             | &#10004; | string    | 128        | The city of the Event location.
addressCountry          | &#10004; | string    | 3          | The ISO-3166-1 Alpha 3 formatted country of the Event.
addressCounty           |          | string    | 128        | The county of the Event location.
addressDistrict         |          | string    | 128        | The district of the Event location.
addressPostalCode       | &#10004; | string    | 32         | The postal code of the Event location.
addressStateOrProvince  |          | string    | 128        | The state or province of the Event location.
description             | &#10004; | string    |            | An arbitrary string describing the Event.
hostGwid                | &#10004; | string    |            | The `gwid` of the user hosting the Event. This field is required if the request comes from an admin (i.e. uses a client credential grant). Otherwise, it is the `gwid` of the user creating the Event.
locationName            |          | string    | 256        | The name of the location.
timeEnd                 | &#10004; | string    |            | The end time of the Event, in the timezone of the Event location. Formatted in ISO-8601, without a timezone designator.
timeStart               | &#10004; | string    |            | The start time of the Event, in the timezone of the Event location. Formatted in ISO-8601, without a timezone designator.
title                   | &#10004; | string    | 256        | The title of the Event.


**Request**
```json
{
  "address1": "642 Walnut St.",
  "addressCity": "Cincinnati",
  "addressCountry": "USA",
  "addressPostalCode": "45202",
  "addressStateOrProvince": "Ohio",
  "description": "Come learn about childhood development in Nicaragua!",
  "locationName": "The Righteous Room",
  "timeEnd": "2016-09-26T15:00:00",
  "timeStart": "2016-09-26T12:00:00",
  "title": "Development talk at The Righteous Room"
}
```

**Response**
```json
{
  "address1": "642 Walnut St.",
  "address2": "",
  "addressCity": "Cincinnati",
  "addressCountry": "USA",
  "addressCounty": "",
  "addressDistrict": "",
  "addressLatitude": 39.103652,
  "addressLongitude": -84.512228,
  "addressPostalCode": "45202",
  "addressStateOrProvince": "Ohio",
  "createdUtc": "2015-06-20T16:11:44Z",
  "description": "Come watch the Democratic and Republican candidates debate!",
  "hostGwid": "03d6b6c1-bf15-4401-a850-a0e6dd2be6de",
  "id": "5bc753e4-a94e-4463-a8e9-83de9c6819df",
  "initiativeId": "my_organization.my_initiative",
  "locationName": "The Righteous Room",
  "timeEndUtc": "2016-09-26T20:00:00Z",
  "timeStartUtc": "2016-09-26T17:00:00Z",
  "timeZoneId": "America/New_York",
  "title": "Debate Watch Party at The Righteous Room"
}
```

**NOTE**: `timeStartUtc` and `timeEndUtc` is calculated at call-time and is derived from the discovered `timeZoneId`, based on address information, and the naive datetime `timeStart / timeEnd` provided upon creation.







## Get a list of all Tickets across the system

When called by an authenticated user, it will return all
Tickets that have that user as that `purchaserGwid`. When called by an Admin, it will
return all tickets. Both responses are filterable with the optional query parameters.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.auth.fetchUsingPassword(<email>, <password>)

gw.events.listAllTickets({<options object>})
    .then(successHandler)
    .catch(errorHandler));
```

**Option fields**


Parameter      | Required | Type    | Description
---------------|----------|---------|------------
isRedeemed     |          | Boolean | Whether or not a Ticket has been redeemed.
purchaserGwid  |          | string  | The `gwid` of the user who purchased a Ticket.
page           |          | integer | A metadata parameter for specifying a page of results to return.
perPage        |          | integer | A metadata parameter for specifying number of results per page.
startsBefore   |          | string  | Return Events before this time. Formatted in [ISO-8601](https://www.w3.org/TR/NOTE-datetime), in local time without timezone designator.
startsAfter    |          | string  | Return Events after this time. Formatted in [ISO-8601](https://www.w3.org/TR/NOTE-datetime), in local time without timezone designator.


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
      "attendeeGwid": "",
      "attendeeProfile": null,
      "categoryId": "846d92e5-ffd3-43b5-84de-a3d5d7e250ac",
      "createdUtc": "2015-06-20T16:11:44Z",
      "eventId": "cfdf4bfe-971a-46c9-9696-678a85e1dbfe",
      "id": "b4b0ee1c-95da-4e93-abfc-91d67093ad33",
      "initiativeId": "my_organization.my_initiative",
      "invitationId": "",
      "purchaserGwid": "524a1efb-b390-476d-b5a4-a0867d8db916",
      "purchaserProfile": {
        "email": "johndoe@thegroundwork.com",
        "familyName": "Doe",
        "givenName": "John"
      },
      "redeemedUtc": ""
    },
    {
      "attendeeGwid": "",
      "attendeeProfile": null,
      "categoryId": "846d92e5-ffd3-43b5-84de-a3d5d7e250ac",
      "createdUtc": "2015-06-20T16:11:44Z",
      "eventId": "cfdf4bfe-971a-46c9-9696-678a85e1dbfe",
      "id": "74e9976b-0e6b-4dfe-9e92-57b2267268f4",
      "initiativeId": "my_organization.my_initiative",
      "invitationId": "",
      "purchaserGwid": "524a1efb-b390-476d-b5a4-a0867d8db916",
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








## Unsubscribe an email address from all communication from a specific Event host

**NOTE**: Unsubscribing from a host will prevent that email address from receiving *any* future emails from that host, regardless of the Event it is in reference to. This enables opting-out of abusive or spamming hosts. It should be clearly indicated in the UI that the user is unsubscribing from all correspondence from this host, so that they do not incidentally opt-out of future messages.


**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.events.unsubscribe(<email>, <invitationId>)
    .then(successHandler)
    .catch(errorHandler));
```

**Option fields**

Parameter               | Required | Type      | Description
------------------------|----------|-----------|------------
email                   | &#10004; | string    | The email address of the user that wants to unsubscribe.
invitationId            |          | string    | The unique identifier of the Invitation that triggered the unsubscribe request.
messageId               |          | string    | UUID String unique identifier of the Message that triggered the unsubscribe request.

**NOTE**: Event though both invitationId and messageId are listed as optional, one and only one must be present in your request.

**Response**

```json
{
  "createdUtc": "2015-06-20T16:11:44Z",
  "email": "test@example.com",
  "id": "187c0a41-0550-4832-a09e-302531093b56",
  "initiativeId": "my_organization.my_initiative"
}
```
