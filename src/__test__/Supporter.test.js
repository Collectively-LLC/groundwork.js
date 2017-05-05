/*global describe, it, expect, beforeEach, afterEach, jasmine, setTimeout, spyOn*/
/*eslint-disable quote-props, one-var, max-len */

import * as constants from "./constants.test";
import Dictionary from "../Dictionary";
import Http from "../Http";
import Supporter from "../Supporter";
import { cloneDeep } from "lodash";

const RECORD_RESPONSE = {
  id: "d70c4d39-0b04-41c1-bf14-d8d13ea8a750",
  created: "2016-04-11T04:57:22.133025Z",
  modified: "2016-04-11T04:57:22.133096Z",
  data: {
    email: "foo@bar.com",
    utmSource: "gwclient-js"
  },
  schemaId: "c857bee8-be61-40bb-ac80-1446b634622f"
};

const SCHEMA_RESPONSE = {
  results: [
    {
      id: "e479334f-b1ef-4403-8d36-63a72da1ca07",
      created: "2016-11-16T00:17:08.688468Z"
    }
  ]
};

const I = x => x;

describe("(Supporter.test.js)", () => {
  let supporter = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    supporter = new Supporter(config, http);
  });

  afterEach(() => {
    supporter = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  describe("#validateForm", () => {
    it("returns a rejected Promise for missing required field", done => {
      const [state, p] = supporter.validateForm({});
      p.catch(err => {
        const { data: { error: { valid, fields, msg } } } = err;
        expect(valid).toEqual(false);
        expect(fields).toEqual(["email"]);
        expect(msg).toMatch(/email/);
        done();
      });
    });

    it("returns a rejected Promise for non-schema fields", done => {
      const [state, p] = supporter.validateForm({
        wutang: "clan",
        email: "rza@shaolin.org"
      });

      p.catch(err => {
        const { data: { error: { valid, fields, msg } } } = err;
        expect(valid).toEqual(false);
        expect(fields).toEqual(["/additionalProperties"]);
        expect(msg).toMatch(/Additional properties/);
        done();
      });
    });

    it("returns true in array for valid forms", () => {
      const [state] = supporter.validateForm({ email: "rza@shaolin.org" });
      expect(state).toEqual(true);
    });
  });

  describe("#getSchemaIdFromResponse", () => {
    it("returns undefined if given garbage", () => {
      expect(supporter.getSchemaIdFromResponse()).toEqual(undefined);
      expect(supporter.getSchemaIdFromResponse([])).toEqual(undefined);
      expect(supporter.getSchemaIdFromResponse({ foo: 1 })).toEqual(undefined);
      expect(supporter.getSchemaIdFromResponse({ data: {} })).toEqual(
        undefined
      );
    });

    it("returns id if its present", () => {
      const x = {
        data: {
          results: [
            {
              id: "12abc"
            },
            {
              id: "13def"
            }
          ]
        }
      };

      expect(supporter.getSchemaIdFromResponse(x)).toEqual("12abc");
    });
  });

  describe("#getCreateRecord", () => {
    it("returns a function", () => {
      const f = supporter.getCreateRecord();
      expect(f).toEqual(jasmine.any(Function));
    });

    it("returned function returns a Promise", done => {
      const p = supporter.getCreateRecord()();
      expect(p).toEqual(jasmine.any(Promise));
      done();
    });

    it("returned function rejects with an error if no id", done => {
      const p = supporter.getCreateRecord()();
      p.catch(e => {
        expect(e).toEqual(jasmine.any(Error));
        expect(e.message).toEqual("No schemaId returned from collections");
        done();
      });
    });

    it("returned function calls createRecord", done => {
      spyOn(supporter, "createRecord");
      const p = supporter.getCreateRecord({ hello: 1 })(12);
      expect(supporter.createRecord).toHaveBeenCalledWith("supporters", 12, {
        hello: 1
      });
      done();
    });
  });

  describe("#getSupporterSchemaId", () => {
    it("returns a Promise", done => {
      const p = supporter.getSupporterSchemaId();
      expect(p).toEqual(jasmine.any(Promise));
      done();
    });

    it("returns errors from server", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_400);
      const p = supporter.getSupporterSchemaId();

      p.catch(err => response = err);

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          const { status, statusText, data } = response;
          expect(status).toEqual(400);
          expect(statusText).toEqual("Bad Request");
          expect(data).toEqual(constants.RESPONSE_400.responseText);
          done();
        }, 0);
      }, 0);
    });

    it("its final then should be undefined if there are no schemas", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_201);
      server.responseText = JSON.stringify({});

      const p = supporter.getSupporterSchemaId().then(r => response = r);

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          expect(response).toEqual(undefined);
          done();
        }, 0);
      }, 0);
    });

    it("its final then should be an id", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_201);
      server.responseText = JSON.stringify(SCHEMA_RESPONSE);

      const p = supporter.getSupporterSchemaId().then(r => response = r);

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          const { results } = SCHEMA_RESPONSE;
          const [result] = results;
          expect(response).toEqual(result.id);
          done();
        }, 0);
      }, 0);
    });
  });

  describe("#create", () => {
    it("has a create method", () => {
      expect(typeof supporter.create).toBe("function");
    });

    it("create returns a rejected Promise for invalid forms", done => {
      const data = {
        error: jasmine.objectContaining({
          valid: false,
          fields: jasmine.arrayContaining(["email"]),
          msg: jasmine.arrayContaining(["Missing required property: email"])
        })
      };

      const p = supporter.create({ schemaId: 12, externalId: 1 });
      expect(p).toEqual(jasmine.any(Promise));
      p.catch(err => {
        expect(err.data).toEqual(jasmine.objectContaining(data));
        done();
      });
    });

    it("create with schemaId response with 201 on success", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_201);
      server.responseText = JSON.stringify(RECORD_RESPONSE);

      const p = supporter
        .create({
          schemaId: 12,
          email: "foo@bar.com",
          utmSource: "gwclient-js"
        })
        .then(r => {
          response = r;
        })
        .catch(I);

      // Returns a Promise
      expect(p).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          const { data: { data } } = response;
          expect(data.email).toEqual("foo@bar.com");
          expect(data.utmSource).toEqual("gwclient-js");
          done();
        }, 0);
      }, 0);
    });

    it("create with no schemaId response with 201 on success", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_201);
      server.responseText = JSON.stringify(SCHEMA_RESPONSE);

      const p = supporter
        .create({
          email: "foo@bar.com",
          utmSource: "gwclient-js"
        })
        .then(r => response = r)
        .catch(I);

      // Returns a Promise
      expect(p).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);

        setTimeout(() => {
          const server = cloneDeep(constants.RESPONSE_201);
          server.responseText = JSON.stringify(RECORD_RESPONSE);
          request = jasmine.Ajax.requests.mostRecent();
          request.respondWith(server);
          setTimeout(() => {
            const { data: { data } } = response;
            expect(data.email).toEqual("foo@bar.com");
            expect(data.utmSource).toEqual("gwclient-js");
            done();
          }, 0);
        }, 0);
      });
    });
  });
});
