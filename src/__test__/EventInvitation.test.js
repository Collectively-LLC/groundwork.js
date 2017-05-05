/*eslint-disable max-len, one-var */

import * as constants from "./constants.test";
import Dictionary from "../Dictionary";
import Event from "../Event";
import Http from "../Http";
import invitationSchema from "../schema/eventInvitation";

import cloneDeep from "lodash/cloneDeep";

const INVITATIONS_200 =
  '{"meta":{"count":2,"params":{"page":1,"perPage":10},"total":2,"totalPages":1},"results":[{"email":"test@example.com","eventId":"3cd5fc23-b4e7-4469-aefe-e54493c7e123","familyName":"Doe","givenName":"John","id":"dd380647-4630-4146-a5c9-7b533dbedf5e","status":"pending"},{"email":"test2@example.com","eventId":"3cd5fc23-b4e7-4469-aefe-e54493c7e123","familyName":"Smith","givenName":"Jane","id":"abc80647-4630-4146-a5c9-7b533dbedf5e","status":"declined"}]}';
const INVITATION =
  '[{"email":"test@example.com","familyName":"Doe","givenName":"John"}]';
const INVITATION_200 =
  '[{"email":"test@example.com","eventId":"3cd5fc23-b4e7-4469-aefe-e54493c7e123","familyName":"Doe","givenName":"John","id":"dd380647-4630-4146-a5c9-7b533dbedf5e","status":"pending"}]';

const EVENT_ID = "3d3df534-bb16-4d98-8290-f26a97b6ce95";
const INVITATION_ID = "dd380647-4630-4146-a5c9-7b533dbedf5e";

const INVALID_PARAMS = [undefined, {}, false, []];

const I = x => x;
const { parse } = JSON;
const parseResponse = x => jasmine.objectContaining(parse(x));

describe("(EventInvitation.test.js)", () => {
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
    const payloads = [[INVITATION, invitationSchema, "email"]];

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
        delete invalid[0][requiredProp];
        const [v, p] = event.validatePayload(invalid, schema);
        p.catch(I);
        expect(v).toBe(false);
        expect(p).toEqual(jasmine.any(Promise));
      });
    });
  });

  describe("listInvitations", () => {
    it("whitelists params", () => {
      spyOn(event.http, "get");

      const opts = {
        status: "pending",
        page: 1,
        perPage: 20
      };

      const params = {
        params: {
          status: opts.status,
          page: opts.page,
          perPage: opts.perPage
        }
      };

      const url = `events/events/${EVENT_ID}/invitations`;

      event.listInvitations(EVENT_ID, opts);
      expect(event.http.get).toHaveBeenCalledWith(
        url,
        jasmine.objectContaining(params)
      );
    });

    it("returns an object containing an array of Invitations", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(INVITATIONS_200);

      const r = event
        .listInvitations(EVENT_ID)
        .then(i => response = i)
        .catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(INVITATIONS_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("fetchInvitation", () => {
    it("is a function", () => {
      expect(typeof event.fetchInvitation).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.fetchInvitation(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.fetchInvitation(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns an invitation on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(INVITATION_200);

      const r = event
        .fetchInvitation(EVENT_ID, INVITATION_ID)
        .then(i => response = i)
        .catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(INVITATION_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("createInvitation", () => {
    it("is a function", () => {
      expect(typeof event.createInvitation).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.createInvitation(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns a rejected Promise for invalid invitations", () => {
      const e1 = {};
      const e2 = parse(INVITATION);
      delete e2[0].email;
      const reqs = [undefined, e1, e2];

      reqs.forEach(r => {
        const rq = event.createInvitation(EVENT_ID, r);
        rq.then(I).catch(err => {
          const { data: { error } } = err;
          expect(error.valid).toEqual(false);
          expect(error.fields.length).toBeGreaterThan(0);
        });
      });
    });

    it("returns an invitation on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(INVITATION_200);

      const p = parse(INVITATION);

      const r = event
        .createInvitation(EVENT_ID, p)
        .then(i => response = i)
        .catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response.data).toEqual(parseResponse(INVITATION_200));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("updateInvitationStatus", () => {
    it("is a function", () => {
      expect(typeof event.updateInvitationStatus).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(s => {
        const r1 = event.updateInvitationStatus(s);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.updateInvitationStatus(EVENT_ID, INVITATION_ID, s);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns a rejected promise for invalid status updates", done => {
      ["foo", "bar"].forEach(s => {
        const r = event.updateInvitationStatus(EVENT_ID, INVITATION_ID, s);
        expect(r).toEqual(jasmine.any(Promise));
        r.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns an updated invitation on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = parse(INVITATION_200);

      const status = "declined";

      const r = event
        .updateInvitationStatus(EVENT_ID, INVITATION_ID, status)
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

  describe("delInvitation", () => {
    it("is a function", () => {
      expect(typeof event.delInvitation).toBe("function");
    });

    it("returns a rejected Promise for invalid params", done => {
      INVALID_PARAMS.forEach(i => {
        const r1 = event.delInvitation(i);
        expect(r1).toEqual(jasmine.any(Promise));
        r1.catch(e => expect(e.status).toEqual(400));

        const r2 = event.delInvitation(EVENT_ID, i);
        expect(r2).toEqual(jasmine.any(Promise));
        r2.catch(e => expect(e.status).toEqual(400));
      });
      setTimeout(done);
    });

    it("returns 204 on success", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_204);

      const r = event
        .delInvitation(EVENT_ID, INVITATION_ID)
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
