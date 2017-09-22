/*eslint-disable max-len, one-var */

import * as constants from "./constants.test";
import Dictionary from "../Dictionary";
import Event from "../Event";
import Http from "../Http";
import messageSchema from "../schema/eventMessage";

import cloneDeep from "lodash/cloneDeep";

const MESSAGES_200 =
  '{"meta":{"count":2,"params":{"page":1,"perPage":10},"total":2,"totalPages":1},"results":[{"email":"","eventId":"c84c8a10-fc0d-4bbc-beb5-86d921974998","gwid":"ba5defe9-4a38-4782-abf6-70e81823a53f","id":"82f29c96-bd9d-4e03-9c7d-e58c6e8bc50f","message":"Im excited to see you at my event!","subject":"Cant wait to see you!","template":"my_template","title":"1 More Day!"},{"email":"example@example.com","eventId":"c84c8a10-fc0d-4bbc-beb5-86d921974998","gwid":"","id":"b7269c74-773e-4070-a179-038158dd83ec","message":"Im excited to see you at my event!","subject":"Cant wait to see you!","template":"my_template","title":"1 More Day!"}]}';
const MESSAGE =
  '{"message":"Im excited to see you at my event!","recipientTypes":["attendees_redeemed","attendees_not_redeemed","invitees_pending","invitees_declined"],"subject":"Cant wait to see you!","template":"my_template","title":"1 More Day!"}';
const MESSAGE_200 =
  '{"email":"","eventId":"c84c8a10-fc0d-4bbc-beb5-86d921974998","gwid":"ba5defe9-4a38-4782-abf6-70e81823a53f","id":"82f29c96-bd9d-4e03-9c7d-e58c6e8bc50f","message":"Im excited to see you at my event!","subject":"Cant wait to see you!","template":"my_template","title":"1 More Day!"}';

const EVENT_ID = "3d3df534-bb16-4d98-8290-f26a97b6ce95";
const MESSAGE_ID = "4d4df544-bb16-4d98-8290-f26a97b6ce95";

const INVALID_PARAMS = [undefined, {}, false, []];

const I = x => x;
const { parse } = JSON;
const parseResponse = x => jasmine.objectContaining(parse(x));

describe("(EventMessage.test.js)", () => {
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

  describe("validatePayload", () => {
    const payloads = [[MESSAGE, messageSchema, "recipientTypes"]];

    it("is a function", () => {
      expect(typeof event.validatePayload).toBe("function");
    });

    it("returns true for valid payloads", () => {
      payloads.forEach(s => {
        const [payload, schema] = s;
        const [v] = event.validatePayload(parse(payload), schema);
        expect(v).toBe(true);
      });
    });

    it("returns a rejected Promise for invalid payloads", () => {
      payloads.forEach(s => {
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

  describe("listMessages", () => {
    it("is a function", () => {
      expect(typeof event.listMessages).toBe("function");
    });

    it("whitelists params", () => {
      spyOn(event.http, "get");

      const opts = {
        heyThere: "how are you",
        page: 0,
        perPage: 10
      };

      const params = {
        params: {
          page: opts.page,
          perPage: opts.perPage
        }
      };

      const url = `events/events/${EVENT_ID}/messages`;

      event.listMessages(EVENT_ID, opts);
      expect(event.http.get).toHaveBeenCalledWith(
        url,
        jasmine.objectContaining(params)
      );
    });

    it("returns an object containing an array of Events", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(MESSAGES_200);

      const r = event.listMessages(EVENT_ID).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(MESSAGES_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("fetchMessage", () => {
    it("is a function", () => {
      expect(typeof event.fetchMessage).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.fetchMessage(EVENT_ID, i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.fetchMessage(EVENT_ID, MESSAGE_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns a message on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(MESSAGE_200);

      const r = event
        .fetchMessage(EVENT_ID, MESSAGE_ID)
        .then(i => response = i)
        .catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(MESSAGE_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("createMessage", () => {
    it("is a function", () => {
      expect(typeof event.createMessage).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.createMessage(EVENT_ID, i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns a rejected Promise for invalid messages", () => {
      const e1 = {};
      const e2 = parse(MESSAGE);
      delete e2.template;

      const reqs = [undefined, e1, e2];

      reqs.forEach(r => {
        const rq = event.createMessage(EVENT_ID, r);
        rq.then(I).catch(err => {
          const { data: { error } } = err;
          expect(error.valid).toEqual(false);
          expect(error.fields.length).toBeGreaterThan(0);
        });
      });
    });

    it("returns a message on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(MESSAGE_200);

      const p = parse(MESSAGE);

      const r = event
        .createMessage(EVENT_ID, p)
        .then(i => response = i)
        .catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(MESSAGE_200));
          done();
        }, 0);
      }, 0);
    });
  });
});
