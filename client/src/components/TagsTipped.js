import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import ReactJoin from "react-join";

const TagsTipped = ({ tags }) => (
  <ReactJoin>
    {tags.map(tag => (
      <span key={tag.id}>
        <span data-tip data-for={tag.id}>{tag.tag}</span>
        <ReactTooltip id={tag.id} delayShow={50}>
          <p>{tag.category}: {tag.name}<br/>{tag.description}</p>
        </ReactTooltip>
      </span>
    ))}
  </ReactJoin>
);

TagsTipped.propTypes = {
  tags: PropTypes.object.isRequired,
};

export default TagsTipped;
