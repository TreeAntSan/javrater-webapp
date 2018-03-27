import React from "react";
import PropTypes from "prop-types";
import { Segment, Form, List, Label } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";

const TagSection = ({ tagSectionTitle, tagOptions, onTagChange, tagValues }) => {
  return (
    <div>
      <Segment>
        <Label attached="top left">{tagSectionTitle} Tags</Label>
        <Form>
          <List>
            {tagOptions.map((tagOption) => (
              <List.Item key={tagOption.tag}>
                <Form.Checkbox
                  label={`${tagOption.tag} - ${tagOption.name}`}
                  checked={tagValues[tagOption.tag] || false}
                  onChange={(event, data) => (onTagChange((data["data-tag"] || "unknown"), data.checked))}
                  data-tag={tagOption.tag}
                  data-tip={tagOption.description}
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
  tagOptions: PropTypes.array.isRequired,
  onTagChange: PropTypes.func.isRequired,
  tagValues: PropTypes.object.isRequired,
};

export default TagSection;
