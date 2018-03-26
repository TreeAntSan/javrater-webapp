import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

class RatingElement extends Component {
  state = {
    rating: this.props.initRating,
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

export default RatingElement;