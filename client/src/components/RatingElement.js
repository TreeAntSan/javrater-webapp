import React, { Component } from "react";
import PropTypes from "prop-types";
import { Rating } from "semantic-ui-react";

class RatingElement extends Component {
  render () {
    return (
      <div>
        <Rating
          clearable
          rating={this.props.rating}
          maxRating={this.props.maxRating}
          onRate={(event, { rating }) => this.props.onRate({ rating: rating })}
        />
        {this.props.rating}: {(this.props.ratingOptions[this.props.rating] &&
                                this.props.ratingOptions[this.props.rating].description) || "ERROR"}
      </div>
    );
  }
}

RatingElement.propTypes = {
  maxRating: PropTypes.number.isRequired,
  ratingOptions: PropTypes.array.isRequired,
  onRate: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
};

export default RatingElement;