import React from "react";
import { mount } from "enzyme";

import CreateMovie from "../MovieEditor";
import client from "../../../client";

jest.mock("../../client");

describe("CreateMovie", () => {
  let wrapper;

  beforeEach(() => {
    Object.keys(client).forEach((mock) => client[mock].mockClear());
    // wrapper = shallow( // Shallow will get angry when setState is used
    wrapper = mount(  // Mount shouldn't... but it still does. wtf?
      <CreateMovie />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should have the `CreateMovie` element", () => {
    expect(wrapper.find(CreateMovie)).toBeTruthy();
  });

  describe("then calls the APIs", () => {
    it("should have called getGenres", () => {
      expect(client.getGenres).toHaveBeenCalledTimes(1);
    });

    it("should have called getRatings", () => {
      expect(client.getRatings).toHaveBeenCalledTimes(1);
    });

    it("should have called getTags", () => {
      expect(client.getTags).toHaveBeenCalledTimes(1);
    });

    describe("then the APIs return data", () => {
      beforeAll(()=> {
        // I'm leaving this commented out code. This is an effective replacement
        // for __mocks__/client.js, returning whatever you want.
        // client.getGenres.mockImplementation((cb) => {
        //   return cb({foo: "bar"});
        // });
      });

      it("should have tagOptions", () => {
        expect(wrapper.state().tagOptions.length).toBe(11);
      });
    });
  });
});