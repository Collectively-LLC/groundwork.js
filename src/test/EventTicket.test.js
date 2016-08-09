/*eslint-disable max-len, one-var */

import * as constants from './constants';
import Dictionary from 'lib/Dictionary';
import Event from 'lib/Event';
import Http from 'lib/Http';
import ticketSchema from 'lib/schema/eventTicket';

import cloneDeep from 'lodash/cloneDeep';

const TICKETS_200 = '{"meta":{"count":2,"params":{"page":1,"perPage":10},"total":2,"totalPages":1},"results":[{"attendeeGwid":"752bfe79-fc8b-48e9-8f7f-67cdd1c7a67c","categoryId":"d1365abf-5f70-4cb4-949e-a9f2222dcf84","eventId":"5bc753e4-a94e-4463-a8e9-83de9c6819df","id":"84e1e2c4-8ac9-4f38-9bd8-b1abfb8dc3d4","purchaserGwid":"752bfe79-fc8b-48e9-8f7f-67cdd1c7a67c","redeemedUtc":"2016-08-22T12:00:00Z"},{"attendeeGwid":"","categoryId":"d1365abf-5f70-4cb4-949e-a9f2222dcf84","eventId":"5bc753e4-a94e-4463-a8e9-83de9c6819df","id":"36a91d28-dfaf-42c3-91ea-89806254ae35","purchaserGwid":"f3fed15c-7007-4f39-82d8-930db0c3c0ea","redeemedUtc":""}]}';
const TICKET = '{"attendeeGwid": "9465a252-3319-4471-a908-8e1333692bff"}';
const TICKET_200 = '{"attendeeGwid":"9465a252-3319-4471-a908-8e1333692bff","categoryId":"d1365abf-5f70-4cb4-949e-a9f2222dcf84","eventId":"5bc753e4-a94e-4463-a8e9-83de9c6819df","id":"36a91d28-dfaf-42c3-91ea-89806254ae35","purchaserGwid":"f3fed15c-7007-4f39-82d8-930db0c3c0ea","redeemedUtc":""}';

const EVENT_ID = '3d3df534-bb16-4d98-8290-f26a97b6ce95';
const CATEGORY_ID = '4d4df544-bb16-4d98-8290-f26a97b6ce95';
const TICKET_ID = '5d5df554-bb16-4d98-8290-f26a97b6ce95';

const INVALID_PARAMS = [undefined, {}, false, []];

const I = x => x;
const { parse } = JSON;
const parseResponse = x => jasmine.objectContaining(parse(x));

describe('(EventTicket.test.js)', () => {
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
      [TICKET, ticketSchema, 'attendeeGwid']
    ];

    it('is a function', () => {
      expect(typeof event.validatePayload).toBe('function');
    });

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

  describe('listTickets', () => {
    it('is a function', () => {
      expect(typeof event.listTickets).toBe('function');
    });

    it('whitelists params', () => {
      spyOn(event.http, 'get');

      const opts = {
        heyThere: 'how are you',
        isRedeemed: true,
        page: 0,
        perPage: 10
      };

      const params = {
        params: {
          isRedeemed: opts.isRedeemed,
          page: opts.page,
          perPage: opts.perPage
        }
      };

      const url = `events/events/${EVENT_ID}/categories/${CATEGORY_ID}/tickets`;

      event.listTickets(EVENT_ID, CATEGORY_ID, opts);
      expect(event.http.get)
        .toHaveBeenCalledWith(url, jasmine.objectContaining(params));
    });

    it('returns an object containing an array of all category tickets', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(TICKETS_200);

      const r = event.listTickets(EVENT_ID, CATEGORY_ID).then(i => response = i).catch(I);
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

  describe('fetchTicket', () => {
    it('is a function', () => {
      expect(typeof event.fetchTicket).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      INVALID_PARAMS.forEach((i) => {
        const r1 = event.fetchTicket(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.fetchTicket(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));

        const r3 = event.fetchTicket(EVENT_ID, CATEGORY_ID, i);
        expect(r3).toEqual(jasmine.any(Promise));
        r3.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it('returns a ticket on 200', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(TICKET_200);

      const r = event.listTickets(EVENT_ID, CATEGORY_ID, TICKET_ID).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(TICKET_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe('createTicket', () => {
    it('is a function', () => {
      expect(typeof event.createTicket).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      INVALID_PARAMS.forEach((i) => {
        const r1 = event.createTicket(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.createTicket(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it('returns a rejected Promise for invalid tickets', () => {
      const e1 = {};
      const e2 = parse(TICKET);
      delete e2.attendeeGwid;

      const reqs = [undefined, e1, e2];

      reqs.forEach((r) => {
        const rq = event.createTicket(r);
        rq.then(I).catch((err) => {
          const { data: { error } } = err;
          expect(error.valid).toEqual(false);
          expect(error.fields.length).toBeGreaterThan(0);
        });
      });
    });

    it('returns a ticket on 200', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(TICKET_200);

      const p = parse(TICKET);

      const r = event.createTicket(EVENT_ID, CATEGORY_ID, p).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(TICKET_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe('updateTicket', () => {
    it('is a function', () => {
      expect(typeof event.updateTicket).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      INVALID_PARAMS.forEach((i) => {
        const r1 = event.updateTicket(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.updateTicket(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));

        const r3 = event.updateTicket(EVENT_ID, CATEGORY_ID, i);
        expect(r3).toEqual(jasmine.any(Promise));
        r3.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it('returns an updated ticket on 200', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(TICKET_200);

      const p = {
        attendeeGwid: '222-222-222'
      };

      const r = event.updateTicket(EVENT_ID, CATEGORY_ID, TICKET_ID, p).then(i => response = i).catch(I);
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

  describe('replaceTicket', () => {
    it('is a function', () => {
      expect(typeof event.replaceTicket).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      INVALID_PARAMS.forEach((i) => {
        const r1 = event.replaceTicket(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.replaceTicket(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));

        const r3 = event.replaceTicket(EVENT_ID, CATEGORY_ID, i);
        expect(r3).toEqual(jasmine.any(Promise));
        r3.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it('returns a replaced ticket on 200', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(TICKET_200);

      const p = {
        attendeeGwid: '222-222-222'
      };

      const r = event.replaceTicket(EVENT_ID, CATEGORY_ID, TICKET_ID, p).then(i => response = i).catch(I);
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

  describe('delTicket', () => {
    it('is a function', () => {
      expect(typeof event.delTicket).toBe('function');
    });

    it('returns a rejected Promise for invalid params', (done) => {
      INVALID_PARAMS.forEach((i) => {
        const r1 = event.delTicket(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.delTicket(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));

        const r3 = event.delTicket(EVENT_ID, CATEGORY_ID, i);
        expect(r3).toEqual(jasmine.any(Promise));
        r3.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it('returns 204 on success', (done) => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_204);

      const r = event.delTicket(EVENT_ID, CATEGORY_ID, TICKET_ID).then(i => response = i).catch(I);
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
});
