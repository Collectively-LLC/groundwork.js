/*eslint-disable max-len, one-var */

import * as constants from "./constants.test";
import Dictionary from "../Dictionary";
import Http from "../Http";
import Profile from "../Profile";
import schema from "../schema/profile";
import { urlJoin } from "../utils";

import cloneDeep from "lodash/cloneDeep";

const I = x => x;

const PROFILE_200 =
  '{"profile":{"gwid":"d4241ac9-520a-4b39-bc67-2369ebc67ea7","email":"roy.batty@tyrell.com","isStaff":false,"isActive":true,"isConfirmed":false,"confirmedAt":null,"dateJoined":"2016-02-09T14:51:32.981458Z","dateModified":"2016-02-09T14:51:32.981917Z","dateOfBirth":null,"givenName":"Roy","familyName":"Batty","honorificPrefix":"","honorificSuffix":"","gender":null,"genderIdentity":"","partyIdentification":null,"employer":"","occupation":"","phoneNumber":"","address1":"","address2":"","locality":"","state":"","zipCode":"","socialaccounts":[],"facebooktoken":null,"source":"direct","authMethods":["password"]}}';

describe("(Profile.test.js)", () => {
  let profile = null;
  let http = null;
  const config = new Dictionary(constants.CONFIG_DEFAULT);

  beforeEach(() => {
    jasmine.Ajax.install();
    http = new Http(config);
    profile = new Profile(config, http);
  });

  afterEach(() => {
    profile = null;
    http = null;
    jasmine.Ajax.uninstall();
  });

  describe("fetch", () => {
    it("is a function", () => {
      expect(typeof profile.fetch).toBe("function");
    });

    it("requests a URL with a gwid", () => {
      const gwid = "N6MAA10816";
      const url = urlJoin("the-claw", "profiles", gwid);

      spyOn(profile.http, "get");
      profile.fetch(gwid);

      expect(profile.http.get).toHaveBeenCalledWith(url);
    });

    it("requests a URL without a gwid", () => {
      const url = urlJoin("the-claw", "profiles", "");

      spyOn(profile.http, "get");
      profile.fetch();

      expect(profile.http.get).toHaveBeenCalledWith(url);
    });
  });

  describe("create", () => {
    it("is a function", () => {
      expect(typeof profile.create).toBe("function");
    });

    it("returns a rejected Promise for invalid profiles", () => {
      const p1 = {};
      const p2 = {
        email: "roy.batty@tyrell.com",
        familyName: "Batty",
        givenName: "Roy",
        phoneNumber: "555.555.5555"
      };
      const p3 = cloneDeep(p2);
      p3.inceptDate = "tuesaday";

      const reqs = [undefined, p1, p2, p3];

      reqs.forEach(r => {
        const rq = profile.create(r);
        rq.then(I).catch(err => {
          const { data: { error } } = err;
          expect(error.valid).toEqual(false);
          expect(error.fields.length).toBeGreaterThan(0);
        });
      });
    });

    it("returns a valid Profile on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = JSON.parse(PROFILE_200);

      const profileSchema = cloneDeep(schema);
      profileSchema.required = schema.required.filter(i => i !== "password");

      const p = {
        email: "roy.batty@tyrell.com",
        familyName: "Batty",
        givenName: "Roy",
        password: "Nexus-6"
      };

      const r = profile.create(p).then(i => response = i).catch(I);
      expect(r).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          const [valid] = profile.validateProfile(
            response.data.profile,
            profileSchema
          );
          expect(valid).toEqual(true);
          done();
        }, 0);
      }, 0);
    });
  });

  describe("update", () => {
    it("is a function", () => {
      expect(typeof profile.update).toBe("function");
    });

    it("returns an updated Profile on 200", done => {
      let request, response;

      const server = cloneDeep(constants.RESPONSE_200);
      server.responseText = JSON.parse(PROFILE_200);

      const profileSchema = cloneDeep(schema);
      profileSchema.required = schema.required.filter(i => i !== "password");

      const p1 = {
        familyName: "Kowalski",
        givenName: "Leon"
      };

      const r1 = profile.update(p1).then(i => response = i).catch(I);
      expect(r1).toEqual(jasmine.any(Promise));

      setTimeout(() => {
        request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(server);
        setTimeout(() => {
          const { data } = response;
          const updated = {
            ...data.profile,
            ...p1
          };

          const [valid] = profile.validateProfile(updated, profileSchema);
          expect(valid).toEqual(true);
          done();
        }, 0);
      }, 0);
    });
  });

  describe("requestResetToken", () => {
    it("is a function", () => {
      expect(typeof profile.requestResetToken).toBe("function");
    });

    it("makes a POST to the reset endpont with an email", () => {
      const email = "roy.batty@tyrell.com";
      const url = urlJoin("the-claw", "password_resets", "");

      spyOn(profile.http, "post");
      profile.requestResetToken(email);

      expect(profile.http.post).toHaveBeenCalledWith(url, { email });
    });
  });

  describe("resetPassword", () => {
    it("is a function", () => {
      expect(typeof profile.resetPassword).toBe("function");
    });

    it("makes a PUT to the reset endpont with a password and token", () => {
      const token = "N6FAB61216";
      const password = "hannibalChew";
      const url = urlJoin("the-claw", "password_resets", token);

      spyOn(profile.http, "put");
      profile.resetPassword(token, password);

      expect(profile.http.put).toHaveBeenCalledWith(url, { token, password });
    });
  });
});
