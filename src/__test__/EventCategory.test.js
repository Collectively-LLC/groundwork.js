/*eslint-disable max-len, one-var */

import * as constants from "./constants.test";
import Dictionary from "../Dictionary";
import Event from "../Event";
import Http from "../Http";
import categorySchema from "../schema/eventCategory";

import cloneDeep from "lodash/cloneDeep";

const CATEGORIES_200 =
  '{"meta":{"count":2,"params":{"page":1,"perPage":10},"total":2,"totalPages":1},"results":[{"description":"Reserved for our most active supporters","eventId":"5bc753e4-a94e-4463-a8e9-83de9c6819df","id":"d1365abf-5f70-4cb4-949e-a9f2222dcf84","quantityRemaining":5,"quantityTotal":10,"timeEndUtc":"2016-09-26T20:00:00Z","timeStartUtc":"2016-09-26T18:00:00Z","timeZoneId":"America/New_York","title":"VIP"},{"description":"Standard ticket","eventId":"5bc753e4-a94e-4463-a8e9-83de9c6819df","id":"c8cb77ec-9f4d-4214-bd96-b38585b44084","quantityRemaining":15,"quantityTotal":20,"timeEndUtc":"2016-09-26T20:00:00Z","timeStartUtc":"2016-09-26T19:00:00Z","timeZoneId":"America/New_York","title":"Admit One"}]}';
const CATEGORY =
  '{"description":"Reserved for our most active supporters","quantityTotal":10,"timeEnd":"2016-09-26T15:00:00","timeStart":"2016-09-26T13:00:00","title":"VIP"}';
const CATEGORY_200 =
  '{"description":"Reserved for our most active supporters","eventId":"5bc753e4-a94e-4463-a8e9-83de9c6819df","id":"d1365abf-5f70-4cb4-949e-a9f2222dcf84","quantityRemaining":10,"quantityTotal":10,"timeEndUtc":"2016-09-26T20:00:00Z","timeStartUtc":"2016-09-26T18:00:00Z","timeZoneId":"America/New_York","title":"VIP"}';

const EVENT_ID = "3d3df534-bb16-4d98-8290-f26a97b6ce95";
const CATEGORY_ID = "4d4df544-bb16-4d98-8290-f26a97b6ce95";

const INVALID_PARAMS = [undefined, {}, false, []];

const I = x => x;
const { parse } = JSON;
const parseResponse = x => jasmine.objectContaining(parse(x));

describe("(EventCategory.test.js)", () => {
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
    const payloads = [[CATEGORY, categorySchema, "quantityTotal"]];

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

  describe("listCategories", () => {
    it("is a function", () => {
      expect(typeof event.listCategories).toBe("function");
    });

    it("whitelists params", () => {
      spyOn(event.http, "get");

      const opts = {
        heyThere: "how are you",
        hostGwid: "222-222",
        page: 0,
        perPage: 10
      };

      const params = {
        params: {
          page: opts.page,
          perPage: opts.perPage
        }
      };

      const url = `events/events/${EVENT_ID}/categories`;

      event.listCategories(EVENT_ID, opts);
      expect(event.http.get).toHaveBeenCalledWith(
        url,
        jasmine.objectContaining(params)
      );
    });

    it("returns an object containing an array of Categories", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(CATEGORIES_200);

      const r = event.listCategories(EVENT_ID).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(CATEGORIES_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("fetchCategory", () => {
    it("is a function", () => {
      expect(typeof event.fetchCategory).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.fetchCategory(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.fetchCategory(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns a category on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(CATEGORY_200);

      const r = event
        .fetchCategory(EVENT_ID, CATEGORY_ID)
        .then(i => response = i)
        .catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(CATEGORY_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("createCategory", () => {
    it("is a function", () => {
      expect(typeof event.createCategory).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.createCategory(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns a rejected Promise for invalid categories", () => {
      const e1 = {};
      const e2 = parse(CATEGORY);
      delete e2.quantityTotal;

      const reqs = [undefined, e1, e2];

      reqs.forEach(r => {
        const rq = event.createCategory(r);
        rq.then(I).catch(err => {
          const { data: { error } } = err;
          expect(error.valid).toEqual(false);
          expect(error.fields.length).toBeGreaterThan(0);
        });
      });
    });

    it("returns a category on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(CATEGORY_200);

      const p = parse(CATEGORY);

      const r = event
        .createCategory(EVENT_ID, p)
        .then(i => response = i)
        .catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(CATEGORY_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("updateCategory", () => {
    it("is a function", () => {
      expect(typeof event.updateCategory).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.updateCategory(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.updateCategory(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns an updated category on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(CATEGORY_200);

      const p = {
        description: "hey now"
      };

      const r = event
        .updateCategory(EVENT_ID, CATEGORY_ID, p)
        .then(i => response = i)
        .catch(I);
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

  describe("replaceCategory", () => {
    it("is a function", () => {
      expect(typeof event.replaceCategory).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.replaceCategory(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.replaceCategory(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns a replaced category on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(CATEGORY_200);

      const p = {
        ...parse(CATEGORY),
        description: "hey now"
      };

      const r = event
        .replaceCategory(EVENT_ID, CATEGORY_ID, p)
        .then(i => response = i)
        .catch(I);
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

  describe("delCategory", () => {
    it("is a function", () => {
      expect(typeof event.delCategory).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.delCategory(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.delCategory(CATEGORY_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns 204 on success", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_204);

      const r = event
        .delCategory(EVENT_ID, CATEGORY_ID)
        .then(i => response = i)
        .catch(I);
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
