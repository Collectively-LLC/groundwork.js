# Authentication

Once a user has created a [profile](https://github.com/thegroundwork/groundwork.js/manual/profiles.md) they can authenticate with the platform. This is necessary to complete actions like updating their profile, updating a subscription and more.

## Authenticate with an email and password

**groundwork.js** will handle a successful response and store the correct tokens for future requests.

**Example**

```javascript
let gw = new Groundwork({
  apiKey: '<API_KEY>'
});

gw.auth.fetchUsingPassword(<email>, <password>)
    .then(successHandler)
    .catch(errorHandler));
```

**Response**

```json
{
  "accessToken": "1.an-access-token",
  "tokenType": "Bearer",
  "expiresIn": null,
  "gwid": "000000-0000-0000-..."
}
```
