/*eslint-disable max-len, one-var */

import * as constants from './constants.test';
import Dictionary from '../Dictionary';
import Event from '../Event';
import Http from '../Http';
import eventSchema from '../schema/event';

import cloneDeep from 'lodash/cloneDeep';

const EVENTS_200 = '{"meta":{"count":2,"params":{"page":1,"perPage":10},"total":2,"totalPages":1},"results":[{"address1":"641 Walnut St.","address2":"","addressCity":"Cincinnati","addressCountry":"USA","addressCounty":"","addressDistrict":"","addressLatitude":39.103652,"addressLongitude":-84.512228,"addressPostalCode":"45202","addressStateOrProvince":"Ohio","description":"Come watch the Democratic and Republican nominees debate!","id":"5bc753e4-a94e-4463-a8e9-83de9c6819df","locationName":"The Righteous Room","timeEndUtc":"2016-09-26T20:00:00Z","timeStartUtc":"2016-09-26T17:00:00Z","timeZoneId":"America/New_York","title":"Debate Watch Party at The Righteous Room"},{"address1":"500 Main St.","address2":"","addressCity":"Cincinnati","addressCountry":"USA","addressCounty":"","addressDistrict":"","addressLatitude":39.23652,"addressLongitude":-84.012228,"addressPostalCode":"45202","addressStateOrProvince":"Ohio","description":"Come have coffee with some of the people that support us!","id":"480c307a-41bf-429c-a5d6-95aa4034d862","locationName":"","timeEndUtc":"2016-09-29T14:00:00Z","timeStartUtc":"2016-09-29T12:00:00Z","timeZoneId":"America/New_York","title":"Coffee with Donors"}]}';
const EVENT = '{"address1":"641 Walnut St.","addressCity":"Cincinnati","addressCountry":"USA","addressPostalCode":"45202","addressStateOrProvince":"Ohio","description":"Come watch the Democratic and Republican candidates debate!","locationName":"The Righteous Room","timeEnd":"2016-09-26T15:00:00","timeStart":"2016-09-26T12:00:00","title":"Debate Watch Party at The Righteous Room"}';
const EVENT_200 = '{"address1":"641 Walnut St.","address2":"","addressCity":"Cincinnati","addressCountry":"USA","addressCounty":"","addressDistrict":"","addressLatitude":39.103652,"addressLongitude":-84.512228,"addressPostalCode":"45202","addressStateOrProvince":"Ohio","description":"Come watch the Democratic and Republican candidates debate!","id":"5bc753e4-a94e-4463-a8e9-83de9c6819df","locationName":"The Righteous Room","timeEndUtc":"2016-09-26T20:00:00Z","timeStartUtc":"2016-09-26T17:00:00Z","timeZoneId":"America/New_York","title":"Debate Watch Party at The Righteous Room"}';
const EVENT_ID = '3d3df534-bb16-4d98-8290-f26a97b6ce95';

const INVALID_PARAMS = [undefined, {}, false, []];

const I = x => x;
const { parse } = JSON;
const parseResponse = x => jasmine.objectContaining(parse(x));

describe('(Event.test.js)', () => {
  let event = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    event = new Event(config, http);
  });

  afterEach(() => {
    event = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  describe('validatePayload', () => {
    const payloads = [
      [EVENT, eventSchema, 'address1']
    ];

    it('returns true for valid payloads', () => {
      payloads.forEach((s) => {
        const [payload, schema] = s;
        const [v] = event.validatePayload(parse(payload), schema);
        expect(v).toBe(true);
      });
    });

    it('returns a rejected Promise for invalid payloads', () => {
      payloads.forEach((s) => {
        const [payload, schema, requiredProp] = s;
        const invalid = cloneDeep(parse(payload));
        delete invalid[requiredProp];
        const [v, p] = event.validatePayload(invalid, schema);
        p.catch(I);
        expect(v).toBe(false);
        expect(p).toEqual(jasmine.any(Promise));
      });
    });
  });

  describe('validateId', () => {
    it('returns a rejected Promise if value is not a string or falsy', () => {
      const xs = [null, undefined, false];
      xs.forEach((x) => {
        const [, p] = event.validateId(x, 'arg');
        p.then(I).catch(I);
        expect(p).toEqual(jasmine.any(Promise));
      });
    });
  });

  describe('list', () => {
    it('is a function', () => {
      expect(typeof event.list).toBe('function');
    });

    it('whitelists params', () => {
      spyOn(event.http, 'get');

      const opts = {
        heyThere: 'how are you',
        hostGwid: '222-222',
        page: 0,
        perPage: 10
      };

      const params = {
        params: {
          hostGwid: opts.hostGwid,
          page: opts.page,
          perPage: opts.perPage
        }
      };

      event.list(opts);
      expect(event.http.get)
        .toHaveBeenCalledWith('events/events', jasmine.objectContaining(params));
    });

    it('returns an object containing an array of all events', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(EVENTS_200);

      const r = event.list().then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(EVENTS_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe('fetch', () => {
    it('is a function', () => {
      expect(typeof event.fetch).toBe('function');
    });

    it('GET an Event with an eventId', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(EVENT_200);

      const r = event.fetch(EVENT_ID).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(EVENT_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe('create', () => {
    it('is a function', () => {
      expect(typeof event.create).toBe('function');
    });

    it('returns a rejected Promise for invalid events', () => {
      const e1 = {};
      const e2 = parse(EVENT);
      delete e2.address1;

      const reqs = [undefined, e1, e2];

      reqs.forEach((r) => {
        const rq = event.create(r);
        rq.then(I).catch((err) => {
          const { data: { error } } = err;
          expect(error.valid).toEqual(false);
          expect(error.fields.length).toBeGreaterThan(0);
        });
      });
    });

    it('returns an Event on 200', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(EVENT_200);

      const p = parse(EVENT);

      const r = event.create(p).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(EVENT_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe('update', () => {
    it('is a function', () => {
      expect(typeof event.update).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      INVALID_PARAMS.forEach((p) => {
        const r = event.update(p);
        expect(r).toEqual(jasmine.any(Promise));
        r.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it('returns an updated Event on 200', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(EVENT_200);

      const p = {
        description: 'hey now'
      };

      const r = event.update(EVENT_ID, p).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(jasmine.any(Object));
          done();
        }, 0);
      }, 0);
    });
  });

  describe('replace', () => {
    it('is a function', () => {
      expect(typeof event.replace).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      INVALID_PARAMS.forEach((p) => {
        const r = event.replace(p);
        expect(r).toEqual(jasmine.any(Promise));
        r.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it('returns a rejected Promise for invalid events', () => {
      const e1 = {};
      const e2 = parse(EVENT);
      delete e2.address1;

      const reqs = [undefined, e1, e2];

      reqs.forEach((r) => {
        const rq = event.replace(r);
        rq.then(I).catch((err) => {
          const { data: { error } } = err;
          expect(error.valid).toEqual(false);
          expect(error.fields.length).toBeGreaterThan(0);
        });
      });
    });

    it('returns a replaced Event on 200', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(EVENT_200);

      const p = {
        ...parse(EVENT),
        description: 'hey now'
      };

      const r = event.replace(EVENT_ID, p).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(jasmine.any(Object));
          done();
        }, 0);
      }, 0);
    });
  });

  describe('del', () => {
    it('is a function', () => {
      expect(typeof event.del).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      INVALID_PARAMS.forEach((p) => {
        const r = event.del(p);
        expect(r).toEqual(jasmine.any(Promise));
        r.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it('returns a Promise with a 204 status code on success', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_204);

      const r = event.del(EVENT_ID).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.status).toEqual(server.status);
          done();
        }, 0);
      }, 0);
    });
  });

  describe('listAllTickets', () => {
    it('is a function', () => {
      expect(typeof event.listAllTickets).toBe('function');
    });

    it('whitelists params', () => {
      spyOn(event.http, 'get');

      const opts = {
        bad: 'params',
        shouldBe: 'stripped',
        isRedeemed: true,
        page: 0,
        perPage: 10,
        startsBefore: new Date().toISOString(),
        startsAfter: new Date().toISOString()
      };

      const params = {
        params: {
          isRedeemed: opts.isRedeemed,
          page: opts.page,
          perPage: opts.perPage,
          startsBefore: opts.startsBefore,
          startsAfter: opts.startsAfter
        }
      };

      const url = `events/tickets`;

      event.listAllTickets(opts);
      expect(event.http.get)
        .toHaveBeenCalledWith(url, jasmine.objectContaining(params));
    });

    it('returns an object containing an array of all category tickets across all events', (done) => {
      const TICKETS_200 = '{"meta":{"count":2,"params":{"page":1,"perPage":10},"total":2,"totalPages":1},"results":[{"attendeeGwid":"752bfe79-fc8b-48e9-8f7f-67cdd1c7a67c","categoryId":"d1365abf-5f70-4cb4-949e-a9f2222dcf84","eventId":"5bc753e4-a94e-4463-a8e9-83de9c6819df","id":"84e1e2c4-8ac9-4f38-9bd8-b1abfb8dc3d4","purchaserGwid":"752bfe79-fc8b-48e9-8f7f-67cdd1c7a67c","redeemedUtc":"2016-08-22T12:00:00Z"},{"attendeeGwid":"","categoryId":"d1365abf-5f70-4cb4-949e-a9f2222dcf84","eventId":"5bc753e4-a94e-4463-a8e9-83de9c6819df","id":"36a91d28-dfaf-42c3-91ea-89806254ae35","purchaserGwid":"f3fed15c-7007-4f39-82d8-930db0c3c0ea","redeemedUtc":""}]}';

      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(TICKETS_200);

      const r = event.listAllTickets()
        .then(i => response = i)
        .catch(I);

      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(TICKETS_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe('unsubscribe', () => {
    it('is a function', () => {
      expect(typeof event.unsubscribe).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      const INVALID = [
        [undefined, undefined],
        [undefined, 1],
        [1, undefined],
        [[], []],
        [{}, 'hi'],
        ['hi', []],
        [[], 'hi'],
        ['foo@', 'bar'],
        ['@foo.com', 'bar']
      ];

      INVALID.forEach(([email, id]) => {
        const r = event.unsubscribe(email, id);
        expect(r).toEqual(jasmine.any(Promise));
        r.catch(e => expect(e.status).toEqual(400));
      });

      setTimeout(done);
    });

    it('only allows `invitationId` OR `messageId` to be passed', (done) => {
      const r = event.unsubscribe('dd@dd.com', {
        invitationId: 'foo',
        messageId: 'bar'
      });
      expect(r).toEqual(jasmine.any(Promise));
      r.catch(e => {
        expect(e.status).toEqual(400);
        done();
      });
    });

    it('returns a Promise with a 204 status code on success', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_204);
      server.responseText = {
        email: 'test@example.com',
        id: '187c0a41-0550-4832-a09e-302531093b56'
      };

      const r = event.unsubscribe('test@example.com', {
        messageId: 'dd380647-4630-4146-a5c9-7b533dbedf5e'
      })
        .then(i => response = i)
        .catch(I);

      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.statusText).toEqual(server.statusText);
          done();
        }, 0);
      }, 0);
    });
  });
});
