# Configure

## API Keys

Before trying to configure **groundwork.js** you will need an API Key from the [Admin](https://admin.thegroundwork.com) application.

Select the Organization and click **Manage** from the top nav. Copy the API Key from the Initiative you would like to work with.

> **Tip**: When developing you can use your test organization to prevent cluttering your data with test records.

## Creating an instance

Include **groundwork.js** into your project so that you have access to the `Groundwork` class. You can create an instance of the class and pass your API Key to the constructor:

```javascript
var gw = new Groundwork({
    apiKey: '<your api key here>'
});
```

You can also set your API Key on an existing instance:

```javascript
var gw = new Groundwork();
gw.apiKey = '<your api key here>';
```

The instance can now make requests to the API. I you need to change the URL you're making calls to, you can set the `apiUrl` field:

```javascript
var gw = new Groundwork({
    apiKey: '<your api key here>',
    apiUrl: '<URL>'
});

gw.apiUrl = '<URL>';
```
