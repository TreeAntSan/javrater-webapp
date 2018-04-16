import React from "react";
import PropTypes from "prop-types";
import { Segment, Form, List, Label, Dimmer, Loader } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";

const TagSection = props => (
  <Segment>
    {props.tagData !== undefined && props.tagValues !== undefined
      ?
      <div>
        <Label attached="top left">{props.tagData.category} Tags</Label>
        <Form>
          <List>
            {props.tagData.tags.map(tagOption => (
              <List.Item key={tagOption.tag}>
                <Form.Checkbox
                  label={`${tagOption.tag} - ${tagOption.name}`}
                  checked={(props.tagValues[tagOption.tag] &&
                    props.tagValues[tagOption.tag].checked) || false}
                  onChange={(event, data) =>
                    (props.onTagChange((data["data-tag"] || "unknown"), data.checked))}
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
