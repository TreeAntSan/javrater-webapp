import React from "react";
import { mount } from "enzyme";

import { Segment, Dimmer, Form } from "semantic-ui-react";
import Basics from "../Basics";

import utils from "../../utils";

import mockGenres from "../../__mocks__/genre_all";
import mockRatings from "../../__mocks__/rating_all";

describe("Basics", () => {
  const onChange = jest.fn();
  let wrapper;

  const values = {
    title: "Mock Title",
    code: "Mock-Code",
    genre: mockGenres.response[0].code,
    rating: 0,
    tagsOnly: false,
  };

  const ratingOptions = utils.ratingOptionFormatter(mockRatings);
  const genreOptions = utils.genreOptionFormatter(mockGenres);

  beforeAll(() => {
    wrapper = mount(
      <Basics
        onChange={onChange}
        values={values}
        ratingOptions={[]}
        genreOptions={[]}
      />
    );
  });

  it("should have the `Segment` element", () => {
    expect(wrapper.find(Segment)).toHaveLength(1);
  });

  it("should have the `Dimmer` element", () => {
    expect(wrapper.find(Dimmer)).toHaveLength(1);
  });

  describe("receives `ratingOptions` and `genreOptions`", () => {
    beforeAll(() => {
      wrapper.setProps({ ratingOptions, genreOptions });
    });

    it("should have the `Form` element", () => {
      expect(wrapper.find(Form)).toHaveLength(1);
    });
  });

});