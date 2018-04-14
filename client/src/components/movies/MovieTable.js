import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import TagsTipped from "./TagsTipped";

// TODO How can I add delete support when this table is on the UserDetails page?
const MovieTable = props => (
  <Table celled compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ProdCode</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Genre</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Tags</Table.HeaderCell>
        {props.showCreatedBy && <Table.HeaderCell>Created By</Table.HeaderCell>}
        {(props.showDelete || props.showEdit) && <Table.HeaderCell>Options</Table.HeaderCell>}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.movies.map(row => (
        <Table.Row key={row.id}>
          <Table.Cell>{row.prodCode}</Table.Cell>
          <Table.Cell>{row.title}</Table.Cell>
          <Table.Cell>{row.genre.code} ({row.genre.description})</Table.Cell>
          <Table.Cell>{row.rating.rating}</Table.Cell>
          <Table.Cell>{row.tags.length ?
            <TagsTipped tags={row.tags} /> :
            <i>(No Tags)</i>
          }</Table.Cell>
          {props.showCreatedBy &&
            <Table.Cell>
              <Link to={`/user/${row.createdBy.id}`}>
                {row.createdBy.name}
              </Link>
            </Table.Cell>
          }
          {(props.showDelete || props.showEdit) &&
            <Table.Cell>
              {props.showEdit &&
                <Link to={`/movie/edit/${row.id}`}>
                  <Button compact color="yellow">Edit</Button>
                </Link>}
              {props.showDelete &&
              <Button onClick={e => props.onDelete(e, row.id)} compact color="red">
                Delete
              </Button>}
            </Table.Cell>
          }
        </Table.Row>
      ))}
    </Table.Body>
    {/* TODO Add pagination */}
  </Table>
);

MovieTable.propTypes = {
  movies: PropTypes.array.isRequired,
  showCreatedBy: PropTypes.bool,
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  showEdit: PropTypes.bool,
};

export default MovieTable;
