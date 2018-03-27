import React from "react";
import PropTypes from "prop-types";
import { Segment, Form, List, Label } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";

const TagSection = ({ tagSectionTitle, tags, onTagChange }) => {
  return (
    <div>
      <Segment>
        <Label attached="top left">{tagSectionTitle} Tags</Label>
        <Form>
          <List>
            {tags.map((tag) => (
              <List.Item key={tag.tag}>
                <Form.Checkbox
                  label={`${tag.tag} - ${tag.name}`}
                  onChange={(event, data) => (onTagChange((data["data-tag"] || "unknown"), data.checked))}
                  data-tag={tag.tag}
                  data-tip={tag.description}
                />
              </List.Item>
            ))}
          </List>
        </Form>
      </Segment>
      <ReactTooltip delayShow={300}/>
    </div>
  );
};

TagSection.propTypes = {
  tagSectionTitle: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  onTagChange: PropTypes.func.isRequired,
};

export default TagSection;
