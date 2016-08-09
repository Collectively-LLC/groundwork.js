# groundwork.js

[![Build Status](https://travis-ci.org/thegroundwork/groundwork.js.svg?branch=develop)](https://travis-ci.org/thegroundwork/groundwork.js)

A JavaScript (browser) library facilitating interaction with [The Groundwork Platform](https://timshel.com/thegroundwork/).

Learn more about [our platform APIs](https://developer.thegroundwork.com/api/).

## Learn about it

1. [Overview](https://github.com/thegroundwork/groundwork.js/blob/master/manual/overview.md)
1. [Configure](https://github.com/thegroundwork/groundwork.js/blob/master/manual/configure.md)
1. [Profiles](https://github.com/thegroundwork/groundwork.js/blob/master/manual/profiles.md)
1. [Authentication](https://github.com/thegroundwork/groundwork.js/blob/master/manual/authenticate.md)
1. [Donations](https://github.com/thegroundwork/groundwork.js/blob/master/manual/donations.md)
1. [Subscriptions](https://github.com/thegroundwork/groundwork.js/blob/master/manual/subscriptions.md)
1. [Supporters](https://github.com/thegroundwork/groundwork.js/blob/master/manual/supporters.md)
1. [Events](https://github.com/thegroundwork/groundwork.js/blob/master/manual/events.md)

## Get it

### CDN Versions

**Production** (minified)

```
https://cdn.thegroundwork.com/groundworkjs/1.2.0/groundwork.min.js
```

**Development** (additional logging)

```
https://cdn.thegroundwork.com/groundworkjs/1.2.0/groundwork.js
```

### Stand-alone

Check out the repository and build a stand-alone distributable:

```shell
$ npm install
$ npm run dist
```

The compiled files will be in the `/dist` folder.

## Documentation and Examples

You can read the API documentation for the client itself [here](https://cdn.thegroundwork.com/groundworkjs/doc/).

There are some examples of the client itself [here](https://cdn.thegroundwork.com/groundworkjs/examples/).

## Usage

```javascript
import Groundwork from 'groundwork.js';

// Create a new Groundwork client using your client id
const gw = new Groundwork({
  'apiKey': 'abc123'
});

// Collect user information from a form
const signUpData = {
  email: form.emailAddress,
  givenName: form.firstName,
  familyName: form.lastName,
  phone: form.phone,
  postalCode: form.postalCode,
  source: "form_frontpage_campaignXYZ"
};

const handleSuccess = (res) => { /* Handle successful signup */}
const handleErrors = (err) => { /* Handle error during signup */}

// Create a new supporter using the collected data and handle success or error states
gw.supporter.create(signUpData)
  .then(handleSuccess)
  .catch(handleErrors);
```
## Browser requirements

A+ Grade browsers

## Prerequisites

Before working with the library source, you'll need to install some required packages:

```shell
npm install
```

## Build

To build a standalone library file and documentation:

```shell
npm run dist
```

This will create a minified and non-minified file in `dist` and updated documentation will be in `doc`. Note: when making a release (see below) the `dist` files are built and pushed up for you.

## Documentation

Documentation is generated using [ESDoc](https://esdoc.org/):

```shell
npm run docs
```

## Development

This library is written in [ES2015](http://www.ecma-international.org/ecma-262/6.0/) and compiled to [ES5](http://www.ecma-international.org/ecma-262/5.1/) via [Babel](https://babeljs.io). Tests are written with Jasmine and run with Karma.

This project uses [GitHub Flow](https://guides.github.com/introduction/flow/index.html) ([longer explanation](http://scottchacon.com/2011/08/31/github-flow.html)) as a deployment model. Please make feature branches from `develop` and then PR them for review.

**Setup your environment:**

You need [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

```shell
npm install
```

**Run the development environment and build examples:**

```shell
npm start
```

A compiled `groundwork.js` is served from [localhost:3000](http://localhost:3000) and examples can be found at [localhost:3000](http://localhost:3000/examples).

**Run the examples:**

```shell
npm run examples
```

This will rewrite the files in `/examples` to use the current locally compiled version of `groundwork.js` instead of the CDN version. Useful for testing your work in an HTML page. The files are served from [localhost:3000](http://localhost:3000)

**Run the tests:**

```shell
npm test # run tests once and then exit
npm run test:watch # starts a watcher that runs automated tests in multiple browsers
```

There are an additional set of integration tests which hit the live Dev API. These should only be run if:

1. You have access to the dev environment
1. You don't mind waiting for live requests to go through

To run them, copy the contents of `/integration_test` into `/test` and then run `npm run test-phantom`. You will get some fails from existing tests during this run.

**Make a release:**

Once you have a working release ready to go it needs to be tagged. Update the `version` property in `package.json` and commit the file. Then run the release script:

```shell
npm run release
```

This will create a tag with the version number, build the `dist` files and push them up to the repo.

---

**Groundwork.js**

Copyright &copy; 2016 - [Timshel](http://timshel.com/) / [The Groundwork](https://thegroundwork.com/), all rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

---

[![The Groundwork](https://dl.dropbox.com/s/jmioatgjnlfu30b/gw_80.png)](http://thegroundwork.com/)
[![JavaScript](https://dl.dropbox.com/s/ooqnkb56ecn2fbx/js_80.png)](https://www.javascript.com/)
