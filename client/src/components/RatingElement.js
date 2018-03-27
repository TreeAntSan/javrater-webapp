import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'semantic-ui-react';

class RatingElement extends Component {
  state = {
    rating: this.props.initRating || 0,
    maxRating: this.props.initMaxRating,
  };

  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating });

  render () {
    return (
      <div>
        <Rating
          clearable
          rating={this.state.rating}
          maxRating={this.state.maxRating}
          onRate={this.handleRate}
        />
        {this.state.rating}: {this.props.ratingDescriptions[this.state.rating].description}
      </div>
    );
  }
}

RatingElement.propTypes = {
  initRating: PropTypes.number,
  initMaxRating: PropTypes.number.isRequired,
  ratingDescriptions: PropTypes.array.isRequired,
};

export default RatingElement;