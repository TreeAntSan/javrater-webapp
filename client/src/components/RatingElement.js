import React from "react";
import PropTypes from "prop-types";
import { Rating } from "semantic-ui-react";

const RatingElement = ({ maxRating, ratingOptions, onRate, rating }) => (
  <div>
    <Rating
      clearable
      rating={rating}
      maxRating={maxRating}
      onRate={(event, { rating }) => onRate({ rating, ratingid: ratingOptions[rating].id })}
    />
    {rating}: {(ratingOptions[rating] &&
                            ratingOptions[rating].description) || "ERROR"}
  </div>
);

RatingElement.propTypes = {
  maxRating: PropTypes.number.isRequired,
  ratingOptions: PropTypes.array.isRequired,
  onRate: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
};

export default RatingElement;
