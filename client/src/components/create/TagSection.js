import React from "react";
import PropTypes from "prop-types";
import { Segment, Form, List, Label, Dimmer, Loader } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";

const TagSection = ({ tagData, onTagChange, tagValues }) => (
  <Segment>
    {tagData !== undefined && tagValues !== undefined
      ?
      <div>
        <Label attached="top left">{tagData.category} Tags</Label>
        <Form>
          <List>
            {tagData.tags.map(tagOption => (
              <List.Item key={tagOption.tag}>
                <Form.Checkbox
                  label={`${tagOption.tag} - ${tagOption.name}`}
                  checked={(tagValues[tagOption.tag] && tagValues[tagOption.tag].checked) || false}
                  onChange={(event, data) => (onTagChange((data["data-tag"] || "unknown"), data.checked))}
                  data-tag={tagOption.tag}
                  data-tip={tagOption.description}
                />
              </List.Item>
            ))}
          </List>
        </Form>
        <ReactTooltip delayShow={300}/>
      </div>
      :
      <Dimmer inverted active>
        <Loader size="mini"/>
      </Dimmer>
    }
  </Segment>
);

TagSection.propTypes = {
  tagData: PropTypes.object,
  onTagChange: PropTypes.func.isRequired,
  tagValues: PropTypes.object,
};

export default TagSection;