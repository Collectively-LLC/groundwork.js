/* global describe, expect, it, jasmine, beforeEach, afterEach, setTimeout */

import * as constants from "./constants.test";
import Collection from "../Collection";
import Dictionary from "../Dictionary";
import Http from "../Http";

import { cloneDeep, assign } from "lodash";

const RESPONSE_COLLECTIONS = {
  meta: {
    count: 10,
    total: 10,
    params: {
      perPage: 10,
      page: 1
    },
    totalPages: 1
  },
  results: [
    {
      created: "2016-08-03T13:13:01.093330Z",
      modified: "2016-08-03T13:13:01.093386Z",
      name: "angel"
    },
    {
      created: "2016-08-01T13:13:01.093330Z",
      modified: "2016-08-01T13:13:01.093386Z",
      name: "risingson"
    }
  ]
};

const RESPONSE_SCHEMAS = {
  results: [
    {
      id: "ae24509d-91c8-49e1-b252-1558e2d71e4a",
      created: "2016-10-27T17:52:00.308036Z",
      schema: {}
    }
  ],
  meta: {
    params: {
      page: 1,
      perPage: 10
    },
    count: 1,
    total: 1,
    totalPages: 1
  }
};

describe("(Collection.test.js)", () => {
  let collection = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    collection = new Collection(config, http);
  });

  afterEach(() => {
    collection = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  describe("#listCollections", () => {
    it("returns a promise", done => {
      let req, resp;

      const p = collection.listCollections().then(r => resp = r);
      expect(p).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        req = jasmine.Ajax.requests.mostRecent();
        done();
      }, 0);
    });

    // Data in, data out
    it("returns a list of collections on 200", done => {
      let req, resp;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = JSON.stringify(RESPONSE_COLLECTIONS);

      const p = collection.listCollections().then(r => resp = r);

      setTimeout(() => {
        req = jasmine.Ajax.requests.mostRecent();
        req.respondWith(server);
        setTimeout(() => {
          expect(resp.data).toEqual(
            jasmine.objectContaining(RESPONSE_COLLECTIONS)
          );
          done();
        }, 0);
      }, 0);
    });
  });

  describe("#listSchemas", () => {
    it("returns a rejected Promise if collection is undefined", done => {
      const p = collection.listSchemas();
      const r = cloneDeep(constants.RESPONSE_GENERIC);

      r.status = 400;
      r.statusText = "Invalid Data";
      r.data = {
        error: jasmine.objectContaining({
          valid: false,
          fields: jasmine.any(Array),
          msg: jasmine.any(Array)
        })
      };

      expect(p).toEqual(jasmine.any(Promise));
      p.catch(err => {
        expect(err).toEqual(jasmine.objectContaining(r));
        done();
      });
    });

    it("returns a list of schemas on 200", done => {
      let req, resp;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = JSON.stringify(RESPONSE_SCHEMAS);

      const p = collection.listSchemas("risingson").then(r => resp = r);

      setTimeout(() => {
        req = jasmine.Ajax.requests.mostRecent();
        req.respondWith(server);
        const { url } = req;
        expect(url).toEqual("/collections/risingson/schemas");
        setTimeout(() => {
          expect(resp.data).toEqual(jasmine.objectContaining(RESPONSE_SCHEMAS));
          done();
        }, 0);
      }, 0);
    });
  });

  describe("#createRecord", () => {
    it("returns rejected Promise if collection, schemaId or data are undefined", done => {
      const p = collection.createRecord();
      const r = cloneDeep(constants.RESPONSE_GENERIC);

      r.status = 400;
      r.statusText = "Invalid Data";
      r.data = {
        error: jasmine.objectContaining({
          valid: false,
          fields: jasmine.any(Array),
          msg: jasmine.any(Array)
        })
      };

      expect(p).toEqual(jasmine.any(Promise));
      p.catch(err => {
        expect(err).toEqual(jasmine.objectContaining(r));
        done();
      });
    });

    it("builds a payload for the API", done => {
      let req, resp, err;
      const id = "e479334f-b1ef-4403-8d36-63a72da1ca07";
      const d = { track: "Angel" };
      const p = collection
        .createRecord("mezzanine", id, d)
        .then(r => resp = r)
        .catch(e => err = e);

      setTimeout(() => {
        req = jasmine.Ajax.requests.mostRecent();
        req.respondWith(constants.RESPONSE_GENERIC);
        const { schemaId, data } = JSON.parse(req.params);
        const { url } = req;
        expect(schemaId).toEqual(id);
        expect(data).toEqual(d);
        expect(url).toEqual("/collections/mezzanine/records");
        done();
      }, 0);
    });
  });
});
