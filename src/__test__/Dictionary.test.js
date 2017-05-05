import Dict from "../Dictionary";

describe("(Dictionary.test.js)", () => {
  describe("Basic tests", () => {
    let d = null;

    beforeEach(() => {
      d = new Dict();
    });

    afterEach(() => {
      d = null;
    });

    it("should exist", () => {
      expect(d).not.toBeUndefined();
    });

    it("returns an object", () => {
      expect(d.data()).toEqual(jasmine.any(Object));
    });

    it("sets and gets key/vals", () => {
      const m = d.set("foo", 1);
      const g = d.get("foo");
      expect(m).toEqual(
        jasmine.objectContaining({
          foo: 1
        })
      );
      expect(g).toEqual(1);
    });

    it("can check keys", () => {
      d.set("foo", 10);
      expect(d.has("foo")).toBe(true);
      expect(d.has("bar")).toBe(false);
    });

    it("will merge values in", () => {
      d.merge({ foo: 1, bar: 2 });
      expect(d.data()).toEqual(
        jasmine.objectContaining({
          foo: 1,
          bar: 2
        })
      );
      d.merge({ quux: 3, foo: 2 });
      expect(d.data()).toEqual(
        jasmine.objectContaining({
          foo: 2,
          bar: 2,
          quux: 3
        })
      );
      const dd = new Dict({ foo: 1, bar: 2 });
      expect(dd.data()).toEqual(
        jasmine.objectContaining({
          foo: 1,
          bar: 2
        })
      );
    });

    it("will make a string representation", () => {
      d.merge({ wu: 1, tang: 2 });
      expect(d.toString()).toEqual(JSON.stringify({ wu: 1, tang: 2 }));
    });

    it("will delete keys", () => {
      d.merge({ wu: 1, tang: 2 });
      d.del("wu");
      expect(d.get("wu")).toBeUndefined();
      expect(d.get("tang")).toEqual(2);
    });

    it("will return a list of keys and values", () => {
      d.merge({ wu: 1, tang: 2, clan: 3 });
      expect(d.keys()).toEqual(jasmine.arrayContaining(["wu", "tang", "clan"]));
      d.merge({ wu: 1, tang: 2, clan: 3, nothin: undefined });
      expect(d.values()).toEqual(jasmine.arrayContaining([1, 2, 3]));
      expect(d.length()).toEqual(3);
    });
  });
});
